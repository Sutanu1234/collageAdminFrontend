
import LoginPage from "./components/Auth/LoginPage";
import RegisterPage from "./components/Auth/RegisterPage";
import SideBar from "./SideBar";
import { Routes, Route } from "react-router-dom";
import { Toaster } from 'sonner';

export default function App() {

  return (
    <>
      <Toaster richColors position="top-center" />
      <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/register/set-password" element={<RegisterPage />} />
          <Route path="/*" element={<SideBar />} />
        </Routes>
    </>
  )
}

