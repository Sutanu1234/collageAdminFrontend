"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function OfferOptionalCourses() {
  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [semester, setSemester] = useState("");
  const [courses, setCourses] = useState([]);

  const handleAddCourse = () => {
    if (!courseId || !courseName || !semester) {
      toast.error("Please fill in all fields");
      return;
    }

    setCourses((prev) => [
      ...prev,
      {
        id: Date.now(),
        courseId,
        courseName,
        semester,
      },
    ]);

    setCourseId("");
    setCourseName("");
    setSemester("");
    toast.success("Course offered successfully");
  };

  const handleCourseChange = (id, field, value) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === id ? { ...course, [field]: value } : course
      )
    );
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Offer Optional/Additional Course</h1>

      {/* Add New Course Form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label>Course ID</Label>
          <Input value={courseId} onChange={(e) => setCourseId(e.target.value)} />
        </div>
        <div>
          <Label>Course Name</Label>
          <Input value={courseName} onChange={(e) => setCourseName(e.target.value)} />
        </div>
        <div>
          <Label>Semester</Label>
          <Input value={semester} onChange={(e) => setSemester(e.target.value)} />
        </div>
        <div className="md:col-span-3">
          <Button onClick={handleAddCourse}>Offer Course</Button>
        </div>
      </div>

      {/* Offered Courses Table */}
      {courses.length > 0 && (
        <div className="overflow-auto mt-8">
          <h2 className="text-xl font-semibold mb-2">Offered Courses</h2>
          <table className="w-full border text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Course ID</th>
                <th className="border px-4 py-2">Course Name</th>
                <th className="border px-4 py-2">Semester</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td className="border px-4 py-2">
                    <Input
                      value={course.courseId}
                      onChange={(e) =>
                        handleCourseChange(course.id, "courseId", e.target.value)
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <Input
                      value={course.courseName}
                      onChange={(e) =>
                        handleCourseChange(course.id, "courseName", e.target.value)
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <Input
                      value={course.semester}
                      onChange={(e) =>
                        handleCourseChange(course.id, "semester", e.target.value)
                      }
                    />
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
