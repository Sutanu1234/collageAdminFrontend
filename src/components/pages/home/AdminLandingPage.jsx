import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";

export default function AdminLandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Add Student",
      description: "Enroll new students into the system.",
      path: "/admin/add-student",
    },
    {
      title: "Course Management",
      description: "Create, edit or remove courses offered.",
      path: "/admin/course-management",
    },
    {
      title: "Add Professor",
      description: "Add faculty members and assign courses.",
      path: "/admin/add-professor",
    },
    {
      title: "ERP Registration",
      description: "Manage ERP system user registration.",
      path: "/admin/erp-registration",
    },
  ];

  // Initialize tasks from localStorage
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("adminTasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [newTask, setNewTask] = useState("");

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("adminTasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const handleToggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const handleDeleteTask = (index) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
  };

  // ✅ Clear all tasks
  const handleClearAllTasks = () => {
    setTasks([]);
  };

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
        Welcome, Admin. Use the tools below to manage courses, faculty, and
        students efficiently.
      </p>

      {/* Calendar & To-Do Section */}
      <section className="container px-4 flex gap-16">
        {/* Calendar */}
        <div className="bg-white dark:bg-transparent rounded-md p-4 w-full lg:w-1/2">
          <h3 className="text-lg font-semibold mb-2">Calendar</h3>
          <Calendar className="border-none shadow-none" />
        </div>

        {/* To-Do List */}
        <div className="bg-white dark:bg-transparent rounded-md p-4 w-full">
          <h3 className="text-lg font-semibold mb-2">To-Do List</h3>
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Enter new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <Button onClick={handleAddTask}>Add</Button>
            <Button variant="destructive" onClick={handleClearAllTasks}>
              Clear All
            </Button>
          </div>

          <ul className="max-h-64 overflow-y-auto">
            {tasks.map((task, index) => (
              <li key={index} className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleTask(index)}
                  />
                  <span
                    className={
                      task.completed ? "line-through text-muted-foreground" : ""
                    }
                  >
                    {task.text}
                  </span>
                </label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteTask(index)}
                >
                  ✕
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Features Section */}
      <main className="flex-1 container mx-auto py-10 px-4">
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
