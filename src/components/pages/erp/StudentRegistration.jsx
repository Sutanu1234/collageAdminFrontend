"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function StudentERPRegistration() {
  const [student, setStudent] = useState(null);
  const [selectedOptionals, setSelectedOptionals] = useState([]);
  const [coreSubjects, setCoreSubjects] = useState([]);
  const [optionalSubjects, setOptionalSubjects] = useState([]);

  useEffect(() => {
    const studentData = localStorage.getItem("user");
    if (studentData) {
      const parsed = JSON.parse(studentData);
      setStudent(parsed);

      const dummyCore = [
        { id: "C101", name: "Maths", credits: 4 },
        { id: "C102", name: "Physics", credits: 4 },
        { id: "C103", name: "Programming", credits: 3 },
      ];
      setCoreSubjects(dummyCore);

      const dummyOptional = [
        { id: "O201", name: "AI & ML", credits: 3 },
        { id: "O202", name: "Blockchain", credits: 3 },
        { id: "O203", name: "AR/VR", credits: 2 },
      ];
      setOptionalSubjects(dummyOptional);
    } else {
      toast.error("Student data not found");
    }
  }, []);

  const handleOptionalChange = (subjectId) => {
    setSelectedOptionals((prev) => {
      if (prev.includes(subjectId)) {
        return prev.filter((id) => id !== subjectId);
      } else if (prev.length < 2) {
        return [...prev, subjectId];
      } else {
        toast.error("You can select at most 2 optional subjects.");
        return prev;
      }
    });
  };

  const handleSubmit = () => {
    const selectedCore = coreSubjects.map((subj) => subj.id);
    const allSelected = [...selectedCore, ...selectedOptionals];
    toast.success(`Registered for courses: ${allSelected.join(", ")}`);
  };

  if (!student) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Course Registration - Semester {student.semester}
      </h1>

      {/* Core Subjects Table */}
      <h2 className="text-xl font-semibold mb-2">Core Subjects</h2>
      <Table className="mb-8">
        <TableHeader>
          <TableRow>
            <TableHead>Subject ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Credits</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coreSubjects.map((subject) => (
            <TableRow key={subject.id}>
              <TableCell>{subject.id}</TableCell>
              <TableCell>{subject.name}</TableCell>
              <TableCell>{subject.credits}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Optional Subjects Table */}
      {student.semester >= 5 && (
        <>
          <h2 className="text-xl font-semibold mb-2">
            Optional Subjects (Select up to 2)
          </h2>
          <Table className="mb-6">
            <TableHeader>
              <TableRow>
                <TableHead>Select</TableHead>
                <TableHead>Subject ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Credits</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {optionalSubjects.map((subj) => (
                <TableRow key={subj.id}>
                  <TableCell>
                    <Checkbox
                      id={subj.id}
                      checked={selectedOptionals.includes(subj.id)}
                      onCheckedChange={() => handleOptionalChange(subj.id)}
                    />
                  </TableCell>
                  <TableCell>{subj.id}</TableCell>
                  <TableCell>{subj.name}</TableCell>
                  <TableCell>{subj.credits}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}

      <Button onClick={handleSubmit}>Register</Button>
    </div>
  );
}
