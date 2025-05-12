"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function ViewCoursesPage() {
  const [semester, setSemester] = useState("");
  const [semesters, setSemesters] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reg_no, setRegNo] = useState(null);
  const [maxSemester, setMaxSemester] = useState(null);
  const [results, setResults] = useState([]);

  // Load reg_no from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("college-user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setRegNo(parsedUser.reg_no);
    }
  }, []);

  // Fetch courses when reg_no is available
  useEffect(() => {
    if (!reg_no) return;

    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:5000/api/admin/studentCourses/${reg_no}`
        );

        const { courses: allCourses, maxSemester } = res.data;
        setCourses(allCourses);
        setMaxSemester(maxSemester);

        const semesterList = [...new Set(allCourses.map((c) => c.semester))].sort(
          (a, b) => a - b
        );
        setSemesters(semesterList);

        if (semesterList.length > 0) {
          setSemester(semesterList[0].toString());
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load student courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [reg_no]);

  // Fetch results when semester or reg_no changes
  useEffect(() => {
    if (!reg_no || !semester) return;

    const fetchResults = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/studentResults?reg_no=${reg_no}&semester=${semester}`
        );
        setResults(res.data.results);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load exam results");
      }
    };

    fetchResults();
  }, [reg_no, semester]);

  const displayedCourses = courses.filter(
    (c) => c.semester.toString() === semester
  );

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <Card className="border-0 shadow-none">
        <CardHeader>
          <CardTitle className="text-xl">View Courses by Semester</CardTitle>
          {maxSemester && (
            <p className="text-sm text-muted-foreground">
              Semester: <strong>{maxSemester}</strong>
            </p>
          )}
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Label htmlFor="semester">Select Semester</Label>
            <Select value={semester} onValueChange={setSemester}>
              <SelectTrigger id="semester">
                <SelectValue placeholder="Choose semester" />
              </SelectTrigger>
              <SelectContent>
                {semesters.map((sem) => (
                  <SelectItem key={sem} value={sem.toString()}>
                    Semester {sem}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          ) : displayedCourses.length > 0 ? (
            <div className="grid gap-4">
              {displayedCourses
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((course, index) => (
                  <Card key={index} className="border border-muted">
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div>
                          <p className="font-medium">{course.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {course.subject_id}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              No courses available for this semester.
            </p>
          )}

          {results.length > 0 && (
            <div className="mt-10">
              <h2 className="text-lg font-semibold mb-4">Exam Results</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-muted rounded-md">
                  <thead className="bg-muted text-left">
                    <tr>
                      <th className="p-2">Subject ID</th>
                      <th className="p-2">Midsem</th>
                      <th className="p-2">Endsem</th>
                      <th className="p-2">Class Test</th>
                      <th className="p-2">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((result) => (
                      <tr key={result.subject_id} className="border-t border-muted">
                        <td className="p-2">{result.subject_id}</td>
                        <td className="p-2">{result.midsem_marks}</td>
                        <td className="p-2">{result.endsem_marks}</td>
                        <td className="p-2">{result.classtest_marks}</td>
                        <td className="p-2 font-semibold">
                          {result.grade || "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
