"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppSidebar } from "@/components/app-sidebar";
import ShowBreadCrumb from "@/components/ShowBreadCrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  Trash2,
  BarChart3,
  Edit3,
  MoreVertical,
  Flag,
  AlertCircle,
  Minus,
  CheckCheck,
  Target,
  TagIcon,
} from "lucide-react";

const TaskManagerPage = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Design Dashboard UI",
      description: "Create wireframes and mockups for the new dashboard",
      priority: "high",
      status: "todo",
      dueDate: "2024-08-25",
      category: "Design",
      completed: false,
    },
    {
      id: 2,
      title: "Implement Authentication",
      description: "Set up user login and registration system",
      priority: "medium",
      status: "in-progress",
      dueDate: "2024-08-30",
      category: "Development",
      completed: false,
    },
    {
      id: 3,
      title: "Write Documentation",
      description: "Document API endpoints and usage examples",
      priority: "low",
      status: "completed",
      dueDate: "2024-08-20",
      category: "Documentation",
      completed: true,
    },
    {
      id: 4,
      title: "Setup CI/CD Pipeline",
      description: "Configure automated testing and deployment workflow",
      priority: "medium",
      status: "todo",
      dueDate: "2024-09-01",
      category: "DevOps",
      completed: false,
    },
    {
      id: 5,
      title: "User Testing Session",
      description: "Conduct usability testing with target users",
      priority: "high",
      status: "in-progress",
      dueDate: "2024-08-28",
      category: "Research",
      completed: false,
    },
    {
      id: 6,
      title: "Code Review",
      description: "Review pull requests and provide feedback",
      priority: "low",
      status: "todo",
      dueDate: "2024-08-27",
      category: "Development",
      completed: false,
    },
  ]);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    category: "",
    dueDate: "",
  });

  const [editingTask, setEditingTask] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const addTask = () => {
    if (!newTask.title.trim()) return;
    const task = {
      id: Date.now(),
      ...newTask,
      status: "todo",
      completed: false,
    };
    setTasks([...tasks, task]);
    setNewTask({
      title: "",
      description: "",
      priority: "medium",
      category: "",
      dueDate: "",
    });
    setIsDialogOpen(false);
  };

  const editTask = () => {
    if (!editingTask.title.trim()) return;
    setTasks(
      tasks.map((task) => (task.id === editingTask.id ? editingTask : task))
    );
    setEditingTask(null);
    setIsEditDialogOpen(false);
  };

  const openEditDialog = (task) => {
    setEditingTask({ ...task });
    setIsEditDialogOpen(true);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              status: task.completed ? "todo" : "completed",
            }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (activeTab === "completed") return task.completed;
    if (activeTab === "todo") return !task.completed && task.status === "todo";
    if (activeTab === "in-progress") return task.status === "in-progress";
    if (activeTab === "high") return task.priority === "high";
    if (activeTab === "medium") return task.priority === "medium";
    if (activeTab === "low") return task.priority === "low";
    return true;
  });

  const tasksByPriority = {
    high: filteredTasks.filter((task) => task.priority === "high"),
    medium: filteredTasks.filter((task) => task.priority === "medium"),
    low: filteredTasks.filter((task) => task.priority === "low"),
  };

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length,
    high: tasks.filter((t) => t.priority === "high").length,
    medium: tasks.filter((t) => t.priority === "medium").length,
    low: tasks.filter((t) => t.priority === "low").length,
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 sm:h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="flex items-center gap-2 px-3 sm:px-4">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <ShowBreadCrumb />
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-lg sm:text-xl font-semibold tracking-tight lg:text-2xl">
                  Task Manager
                </h1>
                <p className="text-muted-foreground text-xs sm:text-sm lg:text-base">
                  Keep track of your projects and stay organized
                </p>
              </div>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    className="h-8 sm:h-9 px-3 sm:px-4 text-xs sm:text-sm"
                  >
                    <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">New Task</span>
                    <span className="sm:hidden">New</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] mx-3 sm:mx-0">
                  <DialogHeader>
                    <DialogTitle className="text-base sm:text-lg">
                      Create new task
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-3 sm:gap-4 py-3 sm:py-4">
                    <Input
                      placeholder="Task title..."
                      value={newTask.title}
                      onChange={(e) =>
                        setNewTask({ ...newTask, title: e.target.value })
                      }
                      className="text-xs sm:text-sm h-9 sm:h-10"
                    />
                    <Textarea
                      placeholder="Add description..."
                      value={newTask.description}
                      onChange={(e) =>
                        setNewTask({
                          ...newTask,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                      className="text-xs sm:text-sm resize-none"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Select
                        value={newTask.priority}
                        onValueChange={(value) =>
                          setNewTask({ ...newTask, priority: value })
                        }
                      >
                        <SelectTrigger className="h-9 sm:h-10 text-xs sm:text-sm">
                          <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Category"
                        value={newTask.category}
                        onChange={(e) =>
                          setNewTask({ ...newTask, category: e.target.value })
                        }
                        className="text-xs sm:text-sm h-9 sm:h-10"
                      />
                    </div>
                    <Input
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) =>
                        setNewTask({ ...newTask, dueDate: e.target.value })
                      }
                      className="text-xs sm:text-sm h-9 sm:h-10"
                    />
                  </div>
                  <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                      size="sm"
                      className="h-9 sm:h-10 text-xs sm:text-sm"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={addTask}
                      size="sm"
                      className="h-9 sm:h-10 text-xs sm:text-sm"
                    >
                      Create Task
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              <div className="rounded-lg border bg-card p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs sm:text-sm font-medium text-muted-foreground">
                    Tasks
                  </div>
                  <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                </div>
                <div className="mt-1 sm:mt-2 text-xl sm:text-2xl font-bold">
                  {taskStats.total}
                </div>
                <p className="text-xs text-muted-foreground">Total tasks</p>
              </div>

              <div className="rounded-lg border bg-card p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs sm:text-sm font-medium text-muted-foreground">
                    Completed
                  </div>
                  <CheckCheck className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-500" />
                </div>
                <div className="mt-1 sm:mt-2 text-xl sm:text-2xl font-bold">
                  {taskStats.completed}
                </div>
                <p className="text-xs text-muted-foreground">
                  {taskStats.total > 0
                    ? Math.round((taskStats.completed / taskStats.total) * 100)
                    : 0}
                  % done
                </p>
              </div>

              <div className="rounded-lg border bg-card p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs sm:text-sm font-medium text-muted-foreground">
                    High
                  </div>
                  <Flag className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
                </div>
                <div className="mt-1 sm:mt-2 text-xl sm:text-2xl font-bold">
                  {taskStats.high}
                </div>
                <p className="text-xs text-muted-foreground">Critical tasks</p>
              </div>

              <div className="rounded-lg border bg-card p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs sm:text-sm font-medium text-muted-foreground">
                    Medium
                  </div>
                  <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-amber-500" />
                </div>
                <div className="mt-1 sm:mt-2 text-xl sm:text-2xl font-bold">
                  {taskStats.medium}
                </div>
                <p className="text-xs text-muted-foreground">Important tasks</p>
              </div>

              <div className="rounded-lg border bg-card p-3 sm:p-4 col-span-2 sm:col-span-1">
                <div className="flex items-center justify-between">
                  <div className="text-xs sm:text-sm font-medium text-muted-foreground">
                    Low
                  </div>
                  <Minus className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-500" />
                </div>
                <div className="mt-1 sm:mt-2 text-xl sm:text-2xl font-bold">
                  {taskStats.low}
                </div>
                <p className="text-xs text-muted-foreground">Standard tasks</p>
              </div>
            </div>

            {/* Tabs */}
            <Tabs
              defaultValue="all"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 h-auto">
                <TabsTrigger value="all" className="text-xs sm:text-sm py-2">
                  All
                </TabsTrigger>
                <TabsTrigger value="todo" className="text-xs sm:text-sm py-2">
                  Todo
                </TabsTrigger>
                <TabsTrigger
                  value="completed"
                  className="text-xs sm:text-sm py-2"
                >
                  Done
                </TabsTrigger>
                <TabsTrigger value="high" className="text-xs sm:text-sm py-2">
                  High
                </TabsTrigger>
                <TabsTrigger value="medium" className="text-xs sm:text-sm py-2">
                  Medium
                </TabsTrigger>
                <TabsTrigger value="low" className="text-xs sm:text-sm py-2">
                  Low
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-4 sm:mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                  {/* High Priority Column */}
                  <PriorityColumn
                    title="High Priority"
                    tasks={tasksByPriority.high}
                    color="destructive"
                    icon={<Flag className="h-3 w-3 sm:h-4 sm:w-4" />}
                    toggleTask={toggleTask}
                    openEditDialog={openEditDialog}
                    deleteTask={deleteTask}
                  />

                  {/* Medium Priority Column */}
                  <PriorityColumn
                    title="Medium Priority"
                    tasks={tasksByPriority.medium}
                    color="secondary"
                    icon={<AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" />}
                    toggleTask={toggleTask}
                    openEditDialog={openEditDialog}
                    deleteTask={deleteTask}
                  />

                  {/* Low Priority Column */}
                  <PriorityColumn
                    title="Low Priority"
                    tasks={tasksByPriority.low}
                    color="outline"
                    icon={<Minus className="h-3 w-3 sm:h-4 sm:w-4" />}
                    toggleTask={toggleTask}
                    openEditDialog={openEditDialog}
                    deleteTask={deleteTask}
                  />
                </div>
              </TabsContent>

              {/* Other tab content */}
              {[
                "todo",
                "in-progress",
                "completed",
                "high",
                "medium",
                "low",
              ].map((tab) => (
                <TabsContent key={tab} value={tab} className="mt-4 sm:mt-6">
                  <TaskList
                    tasks={filteredTasks}
                    toggleTask={toggleTask}
                    openEditDialog={openEditDialog}
                    deleteTask={deleteTask}
                    emptyMessage={`No ${tab.replace("-", " ")} tasks found`}
                  />
                </TabsContent>
              ))}
            </Tabs>

            {/* Edit Task Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent className="sm:max-w-[425px] mx-3 sm:mx-0">
                <DialogHeader>
                  <DialogTitle className="text-base sm:text-lg">
                    Edit task
                  </DialogTitle>
                </DialogHeader>
                {editingTask && (
                  <div className="grid gap-3 sm:gap-4 py-3 sm:py-4">
                    <Input
                      placeholder="Task title..."
                      value={editingTask.title}
                      onChange={(e) =>
                        setEditingTask({
                          ...editingTask,
                          title: e.target.value,
                        })
                      }
                      className="text-xs sm:text-sm h-9 sm:h-10"
                    />
                    <Textarea
                      placeholder="Add description..."
                      value={editingTask.description}
                      onChange={(e) =>
                        setEditingTask({
                          ...editingTask,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                      className="text-xs sm:text-sm resize-none"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Select
                        value={editingTask.priority}
                        onValueChange={(value) =>
                          setEditingTask({ ...editingTask, priority: value })
                        }
                      >
                        <SelectTrigger className="h-9 sm:h-10 text-xs sm:text-sm">
                          <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Category"
                        value={editingTask.category}
                        onChange={(e) =>
                          setEditingTask({
                            ...editingTask,
                            category: e.target.value,
                          })
                        }
                        className="text-xs sm:text-sm h-9 sm:h-10"
                      />
                    </div>
                    <Input
                      type="date"
                      value={editingTask.dueDate}
                      onChange={(e) =>
                        setEditingTask({
                          ...editingTask,
                          dueDate: e.target.value,
                        })
                      }
                      className="text-xs sm:text-sm h-9 sm:h-10"
                    />
                  </div>
                )}
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditDialogOpen(false)}
                    size="sm"
                    className="h-9 sm:h-10 text-xs sm:text-sm"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={editTask}
                    size="sm"
                    className="h-9 sm:h-10 text-xs sm:text-sm"
                  >
                    Update Task
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

// Priority Column Component
const PriorityColumn = ({
  title,
  tasks,
  color,
  icon,
  toggleTask,
  openEditDialog,
  deleteTask,
}) => {
  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="font-semibold text-sm sm:text-base">{title}</h2>
        </div>
        <Badge variant={color} className="text-xs">
          {tasks.length}
        </Badge>
      </div>
      <div className="space-y-2 sm:space-y-3">
        <AnimatePresence>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              toggleTask={toggleTask}
              openEditDialog={openEditDialog}
              deleteTask={deleteTask}
            />
          ))}
        </AnimatePresence>
        {tasks.length === 0 && (
          <EmptyState text={`No ${title.toLowerCase()} tasks`} />
        )}
      </div>
    </div>
  );
};

// Task Card Component
const TaskCard = ({ task, toggleTask, openEditDialog, deleteTask }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-l-red-500";
      case "medium":
        return "border-l-amber-500";
      case "low":
        return "border-l-emerald-500";
      default:
        return "border-l-muted";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className={`group rounded-lg border-l-4 ${getPriorityColor(
        task.priority
      )} bg-card p-3 sm:p-4 shadow-sm ${task.completed ? "opacity-60" : ""}`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <button
          onClick={() => toggleTask(task.id)}
          className="mt-0.5 sm:mt-1 flex-shrink-0"
        >
          {task.completed ? (
            <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500" />
          ) : (
            <Circle className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="space-y-1 min-w-0 flex-1">
              <h3
                className={`font-medium leading-tight text-sm sm:text-base ${
                  task.completed ? "line-through text-muted-foreground" : ""
                }`}
              >
                {task.title}
              </h3>
              {task.description && (
                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                  {task.description}
                </p>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 sm:h-8 sm:w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity ml-2 flex-shrink-0"
                >
                  <MoreVertical className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => openEditDialog(task)}>
                  <Edit3 className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm">Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => deleteTask(task.id)}
                  className="text-destructive"
                >
                  <Trash2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm">Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="mt-2 sm:mt-3 flex items-center flex-wrap gap-1 sm:gap-2">
            <Badge variant="secondary" className="text-xs">
              {task.completed
                ? "Completed"
                : task.status === "in-progress"
                ? "In Progress"
                : "Todo"}
            </Badge>

            {task.category && (
              <Badge variant="outline" className="text-xs">
                <TagIcon className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                {task.category}
              </Badge>
            )}

            {task.dueDate && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-2 w-2 sm:h-3 sm:w-3" />
                {new Date(task.dueDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Task List Component
const TaskList = ({
  tasks,
  toggleTask,
  openEditDialog,
  deleteTask,
  emptyMessage,
}) => {
  if (tasks.length === 0) {
    return <EmptyState text={emptyMessage} />;
  }

  return (
    <div className="space-y-2 sm:space-y-3">
      <AnimatePresence>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            toggleTask={toggleTask}
            openEditDialog={openEditDialog}
            deleteTask={deleteTask}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

// Empty State Component
const EmptyState = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center py-8 sm:py-10 text-center rounded-lg border border-dashed bg-muted/50">
      <Target className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground mb-2" />
      <p className="text-xs sm:text-sm text-muted-foreground">{text}</p>
    </div>
  );
};

export default TaskManagerPage;
