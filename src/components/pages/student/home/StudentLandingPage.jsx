import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function StudentLandingPage() {
  const navigate = useNavigate();

  // You can replace this with actual data fetched from backend or context
  const studentInfo = {
    name: "Sutanu Bera",
    rollNo: "CSE22107/0961",
    email: "cse22107@iiitkalyani.ac.in",
    semester: "6",
    cgpa: "8.5",
  };

  const features = [
    {
      title: "ERP Registration",
      description: "Manage your ERP system access and settings.",
      path: "/student/erp-registration",
    },
    {
      title: "Courses",
      description: "View and manage enrolled courses.",
      path: "/student/courses",
    },
    {
      title: "Fees Payment",
      description: "Pay your semester and other fees online.",
      path: "/student/fees",
    },
    {
      title: "View Attendance",
      description: "Track your attendance records.",
      path: "/student/attendance",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-4 px-4">
        <div className="container mx-auto flex items-center justify-center gap-4">
          <img src="/colLogo.svg" alt="College Logo" className="h-16 w-16" />
          <h1 className="text-xl md:text-2xl font-bold text-center">
            Indian Institute Of Information Technology, Kalyani
          </h1>
        </div>
      </header>

      <p className="text-center text-muted-foreground mb-6">
        Welcome, {studentInfo.name}. Here's your academic overview and tools.
      </p>

      {/* Student Info */}
      <section className="container mb-10">
        <div className="bg-white p-4">
          <h3 className="text-lg font-semibold mb-4">Student Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <p><strong>Name:</strong> {studentInfo.name}</p>
            <p><strong>Roll No:</strong> {studentInfo.rollNo}</p>
            <p><strong>Email:</strong> {studentInfo.email}</p>
            <p><strong>Semester:</strong> {studentInfo.semester}</p>
            <p><strong>Current CGPA:</strong> {studentInfo.cgpa}</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <main className="flex-1 container mx-auto py-4 px-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card
              key={feature.title}
              onClick={() => navigate(feature.path)}
              className="cursor-pointer hover:shadow-lg transition duration-200"
            >
              <CardContent className="p-6">
                <CardTitle className="text-lg font-semibold">
                  {feature.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted text-center py-4 text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} IIIT Kalyani. All rights reserved.
      </footer>
    </div>
  );
}
