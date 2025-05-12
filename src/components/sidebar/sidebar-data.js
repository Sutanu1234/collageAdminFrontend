import {
  BookCopyIcon,
  BookOpenTextIcon,
  BookPlusIcon,
  FileBadgeIcon,
  FingerprintIcon,
  GraduationCapIcon,
  Home,
  IdCardIcon,
  InboxIcon,
  IndianRupeeIcon,
  PenSquareIcon,
  Plus,
  ScrollTextIcon,
  UsersRoundIcon,
} from "lucide-react";

// Get user info from localStorage
export const getUser = () => {
  try {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  } catch (err) {
    console.error("Error parsing user data from localStorage", err);
    return null;
  }
};

// Role-based menu configuration
export const getNavMenuByRole = (role) => {
  switch (role) {
    case "admin":
      return [
        {
          title: "Student",
          url: "/student",
          icon: GraduationCapIcon,
          isActive: true,
          items: [
            { title: "Home", url: "/", icon: Home },
            { title: "Add Student", url: "/addStudent", icon: Plus },
            { title: "All Students", url: "/allStudents", icon: UsersRoundIcon },
            { title: "Upload Result", url: "/result", icon: FileBadgeIcon },
            { title: "Upload Admit Card", url: "/admit", icon: IdCardIcon },
            { title: "Manage Subjects", url: "/addSubject", icon: BookCopyIcon },
            { title: "View Subjects", url: "/viewSubject", icon: BookCopyIcon },
          ],
        },
        {
          title: "Finance Department",
          url: "#",
          icon: IndianRupeeIcon,
          items: [
            { title: "Pending Requests", url: "/allrequest", icon: InboxIcon },
            { title: "Payment Status", url: "#", icon: ScrollTextIcon },
          ],
        },
        {
          title: "Library",
          url: "#",
          icon: BookOpenTextIcon,
          items: [
            { title: "Book Details", url: "/showBook", icon: BookPlusIcon },
          ],
        },
        {
          title: "ERP Registration",
          url: "#",
          icon: FingerprintIcon,
          items: [
            { title: "Manage ERP", url: "#", icon: PenSquareIcon },
          ],
        },
      ];

    case "prof":
      return [
        {
          title: "Subjects",
          url: "#",
          icon: BookCopyIcon,
          isActive: true,
          items: [
            { title: "Home", url: "/", icon: Home },
            { title: "My Subjects", url: "/profsubjects", icon: BookOpenTextIcon },
            { title: "Attendance", url: "/profattendance", icon: ScrollTextIcon },
            { title: "Grading", url: "/profgrading", icon: ScrollTextIcon },
          ],
        },
        {
          title: "Assign Cources",
          url: "#",
          icon: FileBadgeIcon,
          items: [
            { title: "View Assign Cources", url: "/assigncource", icon: PenSquareIcon },
          ],
        },
      ];

    case "student":
      return [
        {
          title: "Academics",
          url: "#",
          icon: GraduationCapIcon,
          isActive: true,
          items: [
            { title: "Home", url: "/", icon: Home },
            { title: "ERP Registration", url: "/studenterp", icon: FingerprintIcon },
            { title: "Courses", url: "/student/courses", icon: BookOpenTextIcon },
            { title: "Fees Payment", url: "/student/fees", icon: IndianRupeeIcon },
            { title: "View Attendance", url: "/student/attendance", icon: ScrollTextIcon },
          ],
        },
      ];

    default:
      return [];
  }
};
