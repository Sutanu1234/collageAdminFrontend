import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

  const dummySemesters = ["1", "2", "3"];
  const dummyCourses = {
    "1": [
      { code: "MTH101", name: "Calculus I", credits: 4 },
      { code: "PHY101", name: "Physics I", credits: 3 },
    ],
    "2": [
      { code: "CSE102", name: "Intro to Programming", credits: 4 },
      { code: "ENG102", name: "Communication Skills", credits: 2 },
    ],
    "3": [
      { code: "CSE201", name: "Data Structures", credits: 4 },
      { code: "CSE202", name: "Computer Organization", credits: 3 },
      { code: "MTH203", name: "Linear Algebra", credits: 3 },
    ],
  };

  useEffect(() => {
    setSemesters(dummySemesters);
  }, []);

  useEffect(() => {
    if (!semester) return;
    setLoading(true);
    setTimeout(() => {
      const result = dummyCourses[semester] || [];
      setCourses(result);
      setLoading(false);

      if (result.length > 0) {
        toast.success(`Loaded ${result.length} course(s) for Semester ${semester}`);
      } else {
        toast.info(`No courses found for Semester ${semester}`);
      }
    }, 700);
  }, [semester]);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <Card className="border-0 shadow-none">
        <CardHeader>
          <CardTitle className="text-xl">View Courses by Semester</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Label htmlFor="semester">Select Semester</Label>
            <Select onValueChange={setSemester}>
              <SelectTrigger id="semester">
                <SelectValue placeholder="Choose semester" />
              </SelectTrigger>
              <SelectContent>
                {semesters.map((sem) => (
                  <SelectItem key={sem} value={sem}>
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
          ) : (
            <div className="grid gap-4">
              {courses.map((course, index) => (
                <Card key={index} className="border border-muted">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div>
                        <p className="font-medium">{course.name}</p>
                        <p className="text-sm text-muted-foreground">{course.code}</p>
                      </div>
                      <p className="font-semibold">Credits: {course.credits}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
