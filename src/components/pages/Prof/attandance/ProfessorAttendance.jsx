"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ProfessorAttendance() {
  const [courseId, setCourseId] = useState("");
  const [batch, setBatch] = useState("");
  const [semester, setSemester] = useState("");
  const [date, setDate] = useState("");
  const [fromReg, setFromReg] = useState(1000);
  const [toReg, setToReg] = useState(1005);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  const generateStudents = () => {
    if (toReg < fromReg) {
      toast.error("To Reg No must be greater than From Reg No");
      return;
    }

    const studentList = Array.from({ length: toReg - fromReg + 1 }, (_, i) => {
      const regNo = `${fromReg + i}`;
      return { regNo };
    });
    setStudents(studentList);

    // Initialize attendance state
    const initial = {};
    studentList.forEach((s) => (initial[s.regNo] = false));
    setAttendance(initial);
  };

  const handleCheckboxChange = (regNo) => {
    setAttendance((prev) => ({
      ...prev,
      [regNo]: !prev[regNo],
    }));
  };

  const handleSubmit = () => {
    const presentStudents = Object.entries(attendance)
      .filter(([_, isPresent]) => isPresent)
      .map(([regNo]) => regNo);
    const absentStudents = Object.entries(attendance)
      .filter(([_, isPresent]) => !isPresent)
      .map(([regNo]) => regNo);

    console.log({
      courseId,
      batch,
      semester,
      date,
      present: presentStudents,
      absent: absentStudents,
    });

    toast.success("Attendance updated successfully!");
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Attendance Panel (Professor)</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <Label htmlFor="date">Date</Label>
          <Input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
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
          <Button onClick={generateStudents}>Generate Student List</Button>
        </div>
      </div>

      {students.length > 0 && (
        <>
          <h2 className="text-xl font-semibold">Mark Attendance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {students.map((student) => (
              <div key={student.regNo} className="flex items-center gap-2">
                <Checkbox
                  id={student.regNo}
                  checked={attendance[student.regNo]}
                  onCheckedChange={() => handleCheckboxChange(student.regNo)}
                />
                <Label htmlFor={student.regNo}>{student.regNo}</Label>
              </div>
            ))}
          </div>
          <Button className="mt-4" onClick={handleSubmit}>
            Update Attendance
          </Button>
        </>
      )}
    </div>
  );
}
