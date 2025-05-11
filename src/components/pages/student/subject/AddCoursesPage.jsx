import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function AddCoursesPage() {
  const [semester, setSemester] = useState("");
  const [courses, setCourses] = useState([
    { code: "", name: "", credits: "" },
  ]);

  const handleAddCourse = () => {
    setCourses([...courses, { code: "", name: "", credits: "" }]);
  };

  const handleCourseChange = (index, field, value) => {
    const updatedCourses = [...courses];
    updatedCourses[index][field] = value;
    setCourses(updatedCourses);
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!semester.trim()) {
    toast.error("Semester is required");
    return;
  }

  const hasEmptyFields = courses.some(
    (course) => !course.code.trim() || !course.name.trim() || !course.credits
  );

  if (hasEmptyFields) {
    toast.error("Please fill all course fields");
    return;
  }

  console.log("Semester:", semester);
  console.log("Courses:", courses);
  toast.success("Courses submitted successfully");

  // Reset form (optional)
  setSemester("");
  setCourses([{ code: "", name: "", credits: "" }]);

  // Send data to backend here
};


  return (
    <div className="py-10 px-4">
      <Card className="border-0 shadow-none">
        <CardHeader>
          <CardTitle className="text-xl">Add Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="semester">Semester</Label>
              <Input
                id="semester"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                placeholder="e.g. 3rd Semester"
              />
            </div>

            <div className="space-y-6">
              {courses.map((course, index) => (
                <div
                  key={index}
                  className="grid md:grid-cols-3 gap-4 border rounded-md p-4"
                >
                  <div>
                    <Label htmlFor={`code-${index}`}>Course Code</Label>
                    <Input
                      id={`code-${index}`}
                      value={course.code}
                      onChange={(e) =>
                        handleCourseChange(index, "code", e.target.value)
                      }
                      placeholder="e.g. CS301"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`name-${index}`}>Course Name</Label>
                    <Input
                      id={`name-${index}`}
                      value={course.name}
                      onChange={(e) =>
                        handleCourseChange(index, "name", e.target.value)
                      }
                      placeholder="e.g. Algorithms"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`credits-${index}`}>Credits</Label>
                    <Input
                      id={`credits-${index}`}
                      value={course.credits}
                      onChange={(e) =>
                        handleCourseChange(index, "credits", e.target.value)
                      }
                      placeholder="e.g. 4"
                      type="number"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <Button type="button" onClick={handleAddCourse} variant="outline">
                + Add Another Course
              </Button>
              <Button type="submit">Submit Courses</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
