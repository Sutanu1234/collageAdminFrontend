import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Routes, Route } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AddStudent } from "./components/pages/student/add-student";
import AddBook from "./components/pages/library/add-book";
import { AdmitMain } from "./components/pages/student/admit/admit-main";
import { AllStudent } from "./components/pages/student/all-student";
import { ResultMain } from "./components/pages/student/result/add-result";
import { AllRequest } from "./components/pages/finance/allrequest";
import AdminLandingPage from "./components/pages/home/AdminLandingPage";
import AddCoursesPage from "./components/pages/student/subject/AddCoursesPage";
import ViewCoursesPage from "./components/pages/student/subject/ViewCoursesPage";
import ProfessorHomePage from "./components/pages/Prof/home/ProfessorHomePage";
import StudentLandingPage from "./components/pages/student/home/StudentLandingPage";
import AssignedCourses from "./components/pages/Prof/home/assigncource/courses";
import StudentERPRegistration from "./components/pages/erp/StudentRegistration";
import ProfessorAttendance from "./components/pages/Prof/attandance/ProfessorAttendance";
import ProfessorGrading from "./components/pages/Prof/gread/Greading";
import OfferOptionalCourses from "./components/pages/Prof/mysubjects/OfferOptionalCourses";

export default function SideBar() {
  const isAdmin = false;
  const isProf = true;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SidebarTrigger />
        <Separator />
        <div>
          <Routes>
            {isAdmin && <Route path="" element={<AdminLandingPage />} />}
            {isProf && <Route path="" element={<ProfessorHomePage />} />}
            {!isAdmin && !isProf && <Route path="" element={<StudentLandingPage />} />}

            <Route path="addStudent" element={<AddStudent />} />
            <Route path="addSubject" element={<AddCoursesPage />} />
            <Route path="viewSubject" element={<ViewCoursesPage />} />
            <Route path="showBook" element={<AddBook />} />
            <Route path="admit" element={<AdmitMain />} />
            <Route path="allStudents" element={<AllStudent />} />
            <Route path="result" element={<ResultMain />} />
            <Route path="allrequest" element={<AllRequest />} />
            <Route path="assigncource" element={<AssignedCourses />} />
            <Route path="studenterp" element={<StudentERPRegistration />} />
            <Route path="profattendance" element={<ProfessorAttendance />} />
            <Route path="profgrading" element={<ProfessorGrading />} />
            <Route path="profsubjects" element={<OfferOptionalCourses />} />
          </Routes>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
