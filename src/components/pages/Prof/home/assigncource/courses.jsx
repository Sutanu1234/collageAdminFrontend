"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function AssignedCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [professor, setProfessor] = useState(null);

  useEffect(() => {
    const profData = localStorage.getItem("college-user");

    if (profData) {
      const parsedProf = JSON.parse(profData);
      setProfessor(parsedProf);

      fetch(`http://localhost:5000/api/professor/${parsedProf.prof_id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch");
          return res.json();
        })
        .then((data) => {
          setCourses(data.courses || []);
          toast.success("Courses loaded!");
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch courses", err);
          toast.error("Failed to fetch courses.");
          setLoading(false);
        });
    } else {
      toast.error("User not found in localStorage");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Assigned Courses - {professor?.name || "Unknown"}
      </h1>

      {courses.length === 0 ? (
        <p className="text-gray-600">No courses assigned yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card key={course._id}>
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold">{course.name}</h2>
                <p>Course Code: {course.code}</p>
                <p>Semester: {course.semester}</p>
                <p>Credits: {course.credits}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
