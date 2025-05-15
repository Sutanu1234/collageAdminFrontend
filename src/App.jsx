
import LoginPage from "./components/Auth/LoginPage";
import RegisterPage from "./components/Auth/RegisterPage";
import StudentLandingPage from "./components/pages/student/home/StudentLandingPage";
import SideBar from "./SideBar";
import { Routes, Route } from "react-router-dom";
import { Toaster } from 'sonner';
import ViewCoursesPage from "./components/pages/student/subject/ViewCoursesPage";
import AssignedCourses from "./components/pages/Prof/home/assigncource/courses";

export default function App() {

  return (
    <>
      <Toaster richColors position="top-center" />
      <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/register/set-password" element={<RegisterPage />} />
          <Route path="/*" element={<SideBar />} />
        {/* <Route path="/student/courses" element={<ViewCoursesPage />} /> */}
        {/* <Route path="/profsubjects" element={<AssignedCourses />} /> */}
          
        </Routes>
    </>
  )
}

