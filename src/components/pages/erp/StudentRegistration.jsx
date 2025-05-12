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
  const [regNo, setRegNo] = useState("");
  const [semester, setSemester] = useState(null);

  const [coreSubjects, setCoreSubjects] = useState([]);
  const [optionalSubjects, setOptionalSubjects] = useState([]);
  const [selectedOptionals, setSelectedOptionals] = useState([]);
  const [backlogSubjects, setBacklogSubjects] = useState([]);
  const [backlogSubjectDetails, setBacklogSubjectDetails] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false);
  const [allCoreSubjects, setAllCoreSubjects] = useState([]);

  // Hardcoded electives
  const hardcodedOptionalSubjects = [
    { subject_id: "CSC801", name: "Graph Theory", professor_id: "PROF011" },
    { subject_id: "ECE802", name: "Communication III", professor_id: "PROF012" },
    { subject_id: "CSC803", name: "NLM", professor_id: "PROF013" },
    { subject_id: "EEE804", name: "Digital Architecture", professor_id: "PROF013" },
  ];

  useEffect(() => {
    const fetchAll = async () => {
      const user = JSON.parse(localStorage.getItem("college-user"));
      if (!user) return toast.error("Student data not found");

      setStudent(user);
      setRegNo(user.reg_no);

      try {
        const res1 = await fetch(`http://localhost:5000/api/admin/studentCourses/${user.reg_no}`);
        const data1 = await res1.json();
        const currentSem = data1.maxSemester;
        setSemester(currentSem);
        const res = await fetch(`http://localhost:5000/api/erp/${user.reg_no}/${currentSem}`);
        const data = await res.json();
        if (data.status === 200) {
          setIsRegistered(true);
          return; // Skip the rest of the registration logic if already registered
        }
        const res2 = await fetch(`http://localhost:5000/api/admin/studentCourses/${user.reg_no}/${currentSem}`);
        const data2 = await res2.json();
        setCoreSubjects(data2.courses);

        // Using hardcoded electives instead of fetching from the backend
        setOptionalSubjects(hardcodedOptionalSubjects);

        const res3 = await fetch("http://localhost:5000/api/admin/backlog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reg_no: user.reg_no, semester: currentSem }),
        });
        const data3 = await res3.json();
        if (data3.subject_ids) {
          setBacklogSubjects(data3.subject_ids);
          const backlogDetails = await fetchBacklogSubjectDetails(data3.subject_ids);
          setBacklogSubjectDetails(backlogDetails);
        }
      } catch (err) {
        // toast.error("Failed to fetch registration data");
        console.log(err)
      }
    };

    fetchAll();
  }, []);

  // Merge core and backlog subjects for display
  useEffect(() => {
    const merged = [
      ...coreSubjects,
      ...backlogSubjectDetails.filter(
        (b) => !coreSubjects.find((c) => c.subject_id === b.subject_id)
      ),
    ];
    setAllCoreSubjects(merged);
  }, [coreSubjects, backlogSubjectDetails]);

  // const fetchBacklogSubjectDetails = async (ids) => {
  //   try {
  //     const res = await fetch("http://localhost:5000/api/admin/subjectsByIds", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ subject_ids: ids }),
  //     });
  //     const data = await res.json();
  //     return data.subjects || [];
  //   } catch (err) {
  //     toast.error("Failed to fetch backlog subject details");
  //     return [];
  //   }
  // };

  const handleOptionalChange = (subjectId) => {
    setSelectedOptionals((prev) => {
      if (prev.includes(subjectId)) {
        return prev.filter((id) => id !== subjectId);
      } else if (prev.length < 2) {
        return [...prev, subjectId];
      } else {
        toast.warning("You can select only up to 2 electives.");
        return prev;
      }
    });
  };

  const handleSubmit = async () => {
    if (!student || !semester) return;

    const coreIds = allCoreSubjects.map((s) => s.subject_id);
    const electiveIds = selectedOptionals;

    if (backlogSubjects.length > 0 && electiveIds.length > 0) {
      toast.error("You have backlogs; electives not allowed.");
      return;
    }

    const res = await fetch("http://localhost:5000/api/erp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reg_no: regNo,
        semester,
        subjects: coreIds,
        backlog_subjects: backlogSubjects,
        elective_subjects: electiveIds,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      toast.success(`Registered for: ${data.registered_subjects.join(", ")}`);
    } else {
      toast.error(data.error || "Registration failed");
    }
  };
  if (isRegistered) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">
          You are already registered for this semester
        </h1>
      </div>
    );
  }
  if (!student || !semester) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        ERP Registration - Semester {semester}
      </h1>

      <h2 className="text-xl font-semibold mb-2">Core Subjects (including backlogs)</h2>
      <Table className="mb-8">
        <TableHeader>
          <TableRow>
            <TableHead>Subject ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allCoreSubjects.map((subj) => (
            <TableRow key={subj.subject_id}>
              <TableCell>{subj.subject_id}</TableCell>
              <TableCell>{subj.name}</TableCell>
              <TableCell>
                {backlogSubjects.includes(subj.subject_id) ? "Backlog" : "Regular"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {backlogSubjects.length === 0 && (
        <>
          <h2 className="text-xl font-semibold mb-2">Elective Subjects (Max 2)</h2>
          <Table className="mb-6">
            <TableHeader>
              <TableRow>
                <TableHead>Select</TableHead>
                <TableHead>Subject ID</TableHead>
                <TableHead>Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {optionalSubjects.map((subj) => (
                <TableRow key={subj.subject_id}>
                  <TableCell>
                    <Checkbox
                      id={subj.subject_id}
                      checked={selectedOptionals.includes(subj.subject_id)}
                      onCheckedChange={() => handleOptionalChange(subj.subject_id)}
                    />
                  </TableCell>
                  <TableCell>{subj.subject_id}</TableCell>
                  <TableCell>{subj.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}

      {backlogSubjects.length > 0 && (
        <div className="text-red-600 mb-4">
          <h2 className="text-xl font-semibold">Note</h2>
          <p>You have {backlogSubjects.length} backlog(s). Electives are disabled.</p>
        </div>
      )}

      <Button onClick={handleSubmit}>Submit Registration</Button>
    </div>
  );
}