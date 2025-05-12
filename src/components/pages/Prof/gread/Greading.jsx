"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ProfessorGrading() {
  const [courseId, setCourseId] = useState("");
  const [semester, setSemester] = useState("");
  const [students, setStudents] = useState([]);
  const [profId, setProfId] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("college-user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setProfId(parsedUser.prof_id);
    }
  }, []);

  const generateTable = async () => {
    if (!courseId || !semester) {
      toast.error("Please enter both Course ID and Semester.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/admin/getStudent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subjectID: courseId,
          semester: Number(semester),
          prof_id: profId,
        }),
      });

      if (!res.ok) throw new Error("Failed to fetch students");
      const studentData = await res.json();
      const regNos = studentData.students;

      if (!regNos.length) {
        toast.error("No students found.");
        return;
      }

      const gradesRes = await fetch("http://localhost:5000/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject_id: courseId }),
      });

      const gradesJson = await gradesRes.json();
      const gradeMap = new Map(
        (gradesJson.grades || []).map((g) => [g.reg_no, g])
      );

      const studentList = regNos.map((regNo) => {
        const g = gradeMap.get(regNo);
        return {
          regNo,
          classTest: g?.classtest_marks ?? "",
          midSem: g?.midsem_marks ?? "",
          endSem: g?.endsem_marks ?? "",
          grade: g?.grade ?? "",
        };
      });

      setStudents(studentList);
      toast.success("Table loaded.");
    } catch (error) {
      console.error(error);
      toast.error("Error loading student data.");
    }
  };

  const handleChange = (index, field, value) => {
    setStudents((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const handleSave = async (index) => {
    const student = students[index];
    try {
      const res = await fetch("http://localhost:5000/api/assign-grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject_id: courseId,
          prof_id: profId,
          semester: Number(semester),
          reg_no: student.regNo,
          classtest_marks: Number(student.classTest || 0),
          midsem_marks: Number(student.midSem || 0),
          endsem_marks: Number(student.endSem || 0),
          grade: student.grade,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to save grade");
      }

      toast.success(`Grade saved for ${student.regNo}`);
    } catch (err) {
      console.error(err);
      toast.error(`Failed to save grade for ${student.regNo}`);
    }
  };

  const handleUpdate = async (index) => {
    const student = students[index];
    try {
      const res = await fetch("http://localhost:5000/api/updateResult", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject_id: courseId,
          prof_id: profId,
          semester: Number(semester),
          reg_no: student.regNo,
          classtest_marks: Number(student.classTest || 0),
          midsem_marks: Number(student.midSem || 0),
          endsem_marks: Number(student.endSem || 0),
          grade: student.grade,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to update grade");
      }

      toast.success(`Grade updated for ${student.regNo}`);
    } catch (err) {
      console.error(err);
      toast.error(`Failed to update grade for ${student.regNo}`);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Professor Grading Panel</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="courseId">Course ID</Label>
          <Input
            id="courseId"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="semester">Semester</Label>
          <Input
            id="semester"
            type="number"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          />
        </div>
        <div className="flex items-end">
          <Button onClick={generateTable}>Generate Table</Button>
        </div>
      </div>

      {students.length > 0 && (
        <div className="overflow-auto mt-6">
          <table className="w-full border text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Reg No</th>
                <th className="border px-4 py-2">Class Test</th>
                <th className="border px-4 py-2">Mid Sem</th>
                <th className="border px-4 py-2">End Sem</th>
                <th className="border px-4 py-2">Grade</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, idx) => (
                <tr key={student.regNo}>
                  <td className="border px-4 py-2">{student.regNo}</td>
                  <td className="border px-4 py-2">
                    <Input
                      type="number"
                      value={student.classTest}
                      onChange={(e) =>
                        handleChange(idx, "classTest", e.target.value)
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <Input
                      type="number"
                      value={student.midSem}
                      onChange={(e) =>
                        handleChange(idx, "midSem", e.target.value)
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <Input
                      type="number"
                      value={student.endSem}
                      onChange={(e) =>
                        handleChange(idx, "endSem", e.target.value)
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <Input
                      type="text"
                      value={student.grade}
                      onChange={(e) =>
                        handleChange(idx, "grade", e.target.value)
                      }
                    />
                  </td>
                  <td className="border px-4 py-2 space-x-2">
                    <Button size="sm" onClick={() => handleSave(idx)}>
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleUpdate(idx)}
                    >
                      Update
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
