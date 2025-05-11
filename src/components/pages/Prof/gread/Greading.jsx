"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ProfessorGrading() {
  const [courseId, setCourseId] = useState("");
  const [batch, setBatch] = useState("");
  const [semester, setSemester] = useState("");
  const [fromReg, setFromReg] = useState(1000);
  const [toReg, setToReg] = useState(1003);
  const [students, setStudents] = useState([]);

  const generateTable = () => {
    if (toReg < fromReg) {
      toast.error("Invalid registration number range");
      return;
    }

    const studentData = Array.from({ length: toReg - fromReg + 1 }, (_, i) => {
      const regNo = `${fromReg + i}`;
      return { regNo, classTest: "", midSem: "", endSem: "", grade: "" };
    });

    setStudents(studentData);
  };

  const handleChange = (index, field, value) => {
    setStudents((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const handleSubmit = () => {
    const gradeData = {
      courseId,
      batch,
      semester,
      students,
    };

    console.log("Grades submitted:", gradeData);
    toast.success("Grades updated successfully!");
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Grading System - Professor Panel</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="courseId">Course ID</Label>
          <Input id="courseId" value={courseId} onChange={(e) => setCourseId(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="batch">Batch</Label>
          <Input id="batch" value={batch} onChange={(e) => setBatch(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="semester">Semester</Label>
          <Input id="semester" value={semester} onChange={(e) => setSemester(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="from">Reg No From</Label>
          <Input
            type="number"
            id="from"
            value={fromReg}
            onChange={(e) => setFromReg(Number(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="to">Reg No To</Label>
          <Input
            type="number"
            id="to"
            value={toReg}
            onChange={(e) => setToReg(Number(e.target.value))}
          />
        </div>
        <div className="flex items-end">
          <Button onClick={generateTable}>Generate Table</Button>
        </div>
      </div>

      {students.length > 0 && (
        <div className="overflow-auto">
          <table className="w-full border mt-6 text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Reg No</th>
                <th className="border px-4 py-2">Class Test</th>
                <th className="border px-4 py-2">Mid Sem</th>
                <th className="border px-4 py-2">End Sem</th>
                <th className="border px-4 py-2">Grade</th>
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
                      onChange={(e) => handleChange(idx, "classTest", e.target.value)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <Input
                      type="number"
                      value={student.midSem}
                      onChange={(e) => handleChange(idx, "midSem", e.target.value)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <Input
                      type="number"
                      value={student.endSem}
                      onChange={(e) => handleChange(idx, "endSem", e.target.value)}
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <Input
                      type="text"
                      value={student.grade}
                      onChange={(e) => handleChange(idx, "grade", e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button className="mt-4" onClick={handleSubmit}>
            Update Grades
          </Button>
        </div>
      )}
    </div>
  );
}
