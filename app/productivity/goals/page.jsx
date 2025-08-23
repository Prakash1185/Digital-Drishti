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
import { Progress } from "@/components/ui/progress";
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
  Target,
  CheckCircle2,
  Circle,
  MoreVertical,
  Edit3,
  Trash2,
  BookOpen,
  Briefcase,
  Heart,
  DollarSign,
  MapPin,
  Mountain,
  Compass,
  Calendar as CalendarIcon,
  Lightbulb,
  Clock,
  AlertTriangle,
  Star,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const GoalsPage = () => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: "Master Full-Stack Development",
      description:
        "Become proficient in modern web development technologies and frameworks",
      category: "Learning",
      priority: "high",
      status: "in-progress",
      targetDate: "2024-12-31",
      progress: 65,
      timeframe: "6 months",
      difficulty: "challenging",
      milestones: [
        { id: 1, title: "Complete React Fundamentals", completed: true },
        { id: 2, title: "Build 3 React Projects", completed: true },
        { id: 3, title: "Learn Node.js Basics", completed: true },
        { id: 4, title: "Build REST API", completed: false },
        { id: 5, title: "Deploy Production App", completed: false },
      ],
      tags: ["development", "certification", "react"],
      createdAt: "2025-08-01",
      vision:
        "To become a leading full-stack developer and contribute to innovative projects",
    },
    {
      id: 2,
      title: "Athletic Excellence Journey",
      description:
        "Build sustainable fitness habits and complete endurance challenges",
      category: "Health",
      priority: "medium",
      status: "in-progress",
      targetDate: "2025-11-15",
      progress: 40,
      timeframe: "4 months",
      difficulty: "moderate",
      milestones: [
        { id: 1, title: "Run 2K without stopping", completed: true },
        { id: 2, title: "Run 5K consistently", completed: true },
        { id: 3, title: "Run 7K milestone", completed: false },
        { id: 4, title: "Complete 10K practice run", completed: false },
        { id: 5, title: "Official 10K Marathon", completed: false },
      ],
      tags: ["fitness", "running", "endurance"],
      createdAt: "2024-07-15",
      vision:
        "To maintain peak physical health and inspire others through fitness",
    },
    {
      id: 3,
      title: "Financial Independence Foundation",
      description:
        "Build a robust financial foundation for long-term security and freedom",
      category: "Finance",
      priority: "high",
      status: "in-progress",
      targetDate: "2025-12-31",
      progress: 75,
      timeframe: "12 months",
      difficulty: "challenging",
      milestones: [
        { id: 1, title: "Save first $2,000", completed: true },
        { id: 2, title: "Reach $5,000 milestone", completed: true },
        { id: 3, title: "Save $7,500", completed: true },
        { id: 4, title: "Reach $10,000 target", completed: false },
      ],
      tags: ["savings", "emergency-fund", "investing"],
      createdAt: "2024-06-01",
      vision:
        "To achieve complete financial freedom and security for my family",
    },
  ]);

  const [countdowns, setCountdowns] = useState([
    {
      id: 1,
      title: "CAT Exam 2024",
      description: "Common Admission Test for MBA",
      targetDate: "2024-11-24",
      category: "exam",
    },
    {
      id: 2,
      title: "Project Deadline",
      description: "Client project delivery",
      targetDate: "2024-09-15",
      category: "work",
    },
  ]);

  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    category: "",
    priority: "medium",
    targetDate: undefined,
    timeframe: "",
    difficulty: "moderate",
    milestones: "",
    tags: "",
    vision: "",
  });

  const [newCountdown, setNewCountdown] = useState({
    title: "",
    description: "",
    targetDate: undefined,
    category: "exam",
  });

  const [editingGoal, setEditingGoal] = useState(null);
  const [editingCountdown, setEditingCountdown] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCountdownDialogOpen, setIsCountdownDialogOpen] = useState(false);
  const [isEditCountdownDialogOpen, setIsEditCountdownDialogOpen] =
    useState(false);
  const [activeTab, setActiveTab] = useState("vision");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedMilestones, setExpandedMilestones] = useState(new Set());

  const categories = [
    { name: "Learning", icon: BookOpen },
    { name: "Health", icon: Heart },
    { name: "Finance", icon: DollarSign },
    { name: "Career", icon: Briefcase },
    { name: "Personal", icon: Star },
    { name: "Travel", icon: MapPin },
  ];

  const addGoal = () => {
    if (!newGoal.title.trim()) return;

    const milestonesArray = newGoal.milestones
      .split(",")
      .map((milestone, index) => ({
        id: index + 1,
        title: milestone.trim(),
        completed: false,
      }))
      .filter((milestone) => milestone.title);

    const tagsArray = newGoal.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    const goal = {
      id: Date.now(),
      ...newGoal,
      targetDate: newGoal.targetDate
        ? format(newGoal.targetDate, "yyyy-MM-dd")
        : "",
      status: "planning",
      progress: 0,
      milestones: milestonesArray,
      tags: tagsArray,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setGoals([...goals, goal]);
    setNewGoal({
      title: "",
      description: "",
      category: "",
      priority: "medium",
      targetDate: undefined,
      timeframe: "",
      difficulty: "moderate",
      milestones: "",
      tags: "",
      vision: "",
    });
    setIsDialogOpen(false);
  };

  const addCountdown = () => {
    if (!newCountdown.title.trim()) return;

    const countdown = {
      id: Date.now(),
      ...newCountdown,
      targetDate: newCountdown.targetDate
        ? format(newCountdown.targetDate, "yyyy-MM-dd")
        : "",
    };

    setCountdowns([...countdowns, countdown]);
    setNewCountdown({
      title: "",
      description: "",
      targetDate: undefined,
      category: "exam",
    });
    setIsCountdownDialogOpen(false);
  };

  const editGoal = () => {
    if (!editingGoal.title.trim()) return;

    const milestonesArray = editingGoal.milestones
      .split(",")
      .map((milestone, index) => ({
        id: index + 1,
        title: milestone.trim(),
        completed: false,
      }))
      .filter((milestone) => milestone.title);

    const tagsArray = editingGoal.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    const updatedGoal = {
      ...editingGoal,
      targetDate: editingGoal.targetDate
        ? format(editingGoal.targetDate, "yyyy-MM-dd")
        : editingGoal.targetDate,
      milestones: milestonesArray,
      tags: tagsArray,
    };

    setGoals(
      goals.map((goal) => (goal.id === editingGoal.id ? updatedGoal : goal))
    );
    setEditingGoal(null);
    setIsEditDialogOpen(false);
  };

  const editCountdown = () => {
    if (!editingCountdown.title.trim()) return;

    const updatedCountdown = {
      ...editingCountdown,
      targetDate: editingCountdown.targetDate
        ? format(editingCountdown.targetDate, "yyyy-MM-dd")
        : editingCountdown.targetDate,
    };

    setCountdowns(
      countdowns.map((countdown) =>
        countdown.id === editingCountdown.id ? updatedCountdown : countdown
      )
    );
    setEditingCountdown(null);
    setIsEditCountdownDialogOpen(false);
  };

  const openEditDialog = (goal) => {
    setEditingGoal({
      ...goal,
      targetDate: goal.targetDate ? new Date(goal.targetDate) : undefined,
      milestones: goal.milestones.map((m) => m.title).join(", "),
      tags: goal.tags.join(", "),
    });
    setIsEditDialogOpen(true);
  };

  const openEditCountdownDialog = (countdown) => {
    setEditingCountdown({
      ...countdown,
      targetDate: countdown.targetDate
        ? new Date(countdown.targetDate)
        : undefined,
    });
    setIsEditCountdownDialogOpen(true);
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const deleteCountdown = (id) => {
    setCountdowns(countdowns.filter((countdown) => countdown.id !== id));
  };

  const toggleMilestone = (goalId, milestoneId) => {
    setGoals(
      goals.map((goal) => {
        if (goal.id === goalId) {
          const updatedMilestones = goal.milestones.map((milestone) =>
            milestone.id === milestoneId
              ? { ...milestone, completed: !milestone.completed }
              : milestone
          );
          const completedCount = updatedMilestones.filter(
            (m) => m.completed
          ).length;
          const progress = (completedCount / updatedMilestones.length) * 100;

          return {
            ...goal,
            milestones: updatedMilestones,
            progress: Math.round(progress),
            status:
              progress === 100
                ? "completed"
                : progress > 0
                ? "in-progress"
                : "planning",
          };
        }
        return goal;
      })
    );
  };

  const toggleMilestoneExpansion = (goalId) => {
    const newExpanded = new Set(expandedMilestones);
    if (newExpanded.has(goalId)) {
      newExpanded.delete(goalId);
    } else {
      newExpanded.add(goalId);
    }
    setExpandedMilestones(newExpanded);
  };

  const getCategoryIcon = (categoryName) => {
    const category = categories.find((cat) => cat.name === categoryName);
    return category ? category.icon : Target;
  };

  const getDaysRemaining = (targetDate) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const goalStats = {
    total: goals.length,
    completed: goals.filter((g) => g.status === "completed").length,
    inProgress: goals.filter((g) => g.status === "in-progress").length,
    planning: goals.filter((g) => g.status === "planning").length,
    avgProgress:
      goals.length > 0
        ? Math.round(
            goals.reduce((acc, goal) => acc + goal.progress, 0) / goals.length
          )
        : 0,
  };

  const filteredGoals = goals.filter((goal) => {
    if (statusFilter === "all") return true;
    return goal.status === statusFilter;
  });

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <ShowBreadCrumb />
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6 space-y-12">
            {/* Simple Header */}
            <div className="flex items-center justify-between">
              <div className="">
                <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Goals & Vision</h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Track your long-term aspirations and build lasting habits
                </p>
              </div>

              <div className="flex gap-3">
                <Dialog
                  open={isCountdownDialogOpen}
                  onOpenChange={setIsCountdownDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Clock className="mr-2 h-4 w-4" />
                      Add Countdown
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Countdown</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <Input
                        placeholder="Event title..."
                        value={newCountdown.title}
                        onChange={(e) =>
                          setNewCountdown({
                            ...newCountdown,
                            title: e.target.value,
                          })
                        }
                      />
                      <Textarea
                        placeholder="Description..."
                        value={newCountdown.description}
                        onChange={(e) =>
                          setNewCountdown({
                            ...newCountdown,
                            description: e.target.value,
                          })
                        }
                        rows={2}
                      />
                      <div className="grid grid-cols-2 gap-3">
                        {/* Calendar Date Picker for Countdown */}
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "justify-start text-left font-normal",
                                !newCountdown.targetDate &&
                                  "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {newCountdown.targetDate ? (
                                format(newCountdown.targetDate, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={newCountdown.targetDate}
                              onSelect={(date) =>
                                setNewCountdown({
                                  ...newCountdown,
                                  targetDate: date,
                                })
                              }
                              disabled={(date) =>
                                date < new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>

                        <Select
                          value={newCountdown.category}
                          onValueChange={(value) =>
                            setNewCountdown({
                              ...newCountdown,
                              category: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="exam">Exam</SelectItem>
                            <SelectItem value="work">Work</SelectItem>
                            <SelectItem value="personal">Personal</SelectItem>
                            <SelectItem value="event">Event</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-end gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setIsCountdownDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={addCountdown}>Create</Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Goal
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Create New Goal</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4 max-h-[400px] overflow-y-auto">
                      <Input
                        placeholder="Goal title..."
                        value={newGoal.title}
                        onChange={(e) =>
                          setNewGoal({ ...newGoal, title: e.target.value })
                        }
                      />
                      <Textarea
                        placeholder="Description..."
                        value={newGoal.description}
                        onChange={(e) =>
                          setNewGoal({
                            ...newGoal,
                            description: e.target.value,
                          })
                        }
                        rows={3}
                      />
                      <Textarea
                        placeholder="Your vision and why this matters..."
                        value={newGoal.vision}
                        onChange={(e) =>
                          setNewGoal({ ...newGoal, vision: e.target.value })
                        }
                        rows={2}
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <Select
                          value={newGoal.category}
                          onValueChange={(value) =>
                            setNewGoal({ ...newGoal, category: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem
                                key={category.name}
                                value={category.name}
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select
                          value={newGoal.priority}
                          onValueChange={(value) =>
                            setNewGoal({ ...newGoal, priority: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {/* Calendar Date Picker for Goal */}
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "justify-start text-left font-normal",
                                !newGoal.targetDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {newGoal.targetDate ? (
                                format(newGoal.targetDate, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={newGoal.targetDate}
                              onSelect={(date) =>
                                setNewGoal({
                                  ...newGoal,
                                  targetDate: date,
                                })
                              }
                              disabled={(date) =>
                                date < new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>

                        <Select
                          value={newGoal.difficulty}
                          onValueChange={(value) =>
                            setNewGoal({ ...newGoal, difficulty: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Difficulty" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="moderate">Moderate</SelectItem>
                            <SelectItem value="challenging">
                              Challenging
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Input
                        placeholder="Timeframe (e.g., 6 months)"
                        value={newGoal.timeframe}
                        onChange={(e) =>
                          setNewGoal({ ...newGoal, timeframe: e.target.value })
                        }
                      />
                      <Textarea
                        placeholder="Milestones (comma separated)..."
                        value={newGoal.milestones}
                        onChange={(e) =>
                          setNewGoal({ ...newGoal, milestones: e.target.value })
                        }
                        rows={2}
                      />
                      <Input
                        placeholder="Tags (comma separated)..."
                        value={newGoal.tags}
                        onChange={(e) =>
                          setNewGoal({ ...newGoal, tags: e.target.value })
                        }
                      />
                    </div>
                    <div className="flex justify-end gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={addGoal}>Create Goal</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Clean Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h3 className="tracking-tight text-sm font-medium">
                    Total Goals
                  </h3>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="text-2xl font-bold">{goalStats.total}</div>
                <p className="text-xs text-muted-foreground">Active goals</p>
              </div>
              <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h3 className="tracking-tight text-sm font-medium">
                    Completed
                  </h3>
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="text-2xl font-bold">{goalStats.completed}</div>
                <p className="text-xs text-muted-foreground">Achieved</p>
              </div>
              <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h3 className="tracking-tight text-sm font-medium">
                    In Progress
                  </h3>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="text-2xl font-bold">{goalStats.inProgress}</div>
                <p className="text-xs text-muted-foreground">Active work</p>
              </div>
              <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h3 className="tracking-tight text-sm font-medium">
                    Planning
                  </h3>
                  <Lightbulb className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="text-2xl font-bold">{goalStats.planning}</div>
                <p className="text-xs text-muted-foreground">Future goals</p>
              </div>
              <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h3 className="tracking-tight text-sm font-medium">
                    Avg Progress
                  </h3>
                  <Mountain className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="text-2xl font-bold">
                  {goalStats.avgProgress}%
                </div>
                <p className="text-xs text-muted-foreground">Overall</p>
              </div>
            </div>

            {/* Countdowns Section */}
            {countdowns.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Upcoming Events</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {countdowns.map((countdown) => {
                    const daysLeft = getDaysRemaining(countdown.targetDate);
                    const isUpcoming = daysLeft <= 7 && daysLeft > 0;
                    const isToday = daysLeft === 0;
                    const isOverdue = daysLeft < 0;

                    return (
                      <motion.div
                        key={countdown.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.02 }}
                        className={`relative p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:shadow-lg ${
                          isOverdue
                            ? "border-red-200 bg-gradient-to-br from-red-50 to-red-100 dark:border-red-800/50 dark:from-red-950/30 dark:to-red-950/20"
                            : isToday
                            ? "border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 dark:border-amber-800/50 dark:from-amber-950/30 dark:to-orange-950/20"
                            : isUpcoming
                            ? "border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 dark:border-green-800/50 dark:from-green-950/30 dark:to-emerald-950/20"
                            : "border-green-200/50 bg-gradient-to-br from-green-50/30 to-emerald-50/30 dark:border-green-800/30 dark:from-green-950/20 dark:to-emerald-950/10"
                        }`}
                      >
                        {/* Top Section */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm truncate">
                              {countdown.title}
                            </h3>
                            <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                              {countdown.description}
                            </p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 opacity-40 hover:opacity-100"
                              >
                                <MoreVertical className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-32">
                              <DropdownMenuItem
                                onClick={() =>
                                  openEditCountdownDialog(countdown)
                                }
                              >
                                <Edit3 className="mr-2 h-3 w-3" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => deleteCountdown(countdown.id)}
                              >
                                <Trash2 className="mr-2 h-3 w-3" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        {/* Main Counter */}
                        <div className="text-center mb-3">
                          <div
                            className={`text-2xl font-bold leading-none ${
                              isOverdue
                                ? "text-red-600 dark:text-red-400"
                                : isToday
                                ? "text-amber-600 dark:text-amber-400"
                                : "text-green-600 dark:text-green-400"
                            }`}
                          >
                            {isOverdue
                              ? Math.abs(daysLeft)
                              : daysLeft > 0
                              ? daysLeft
                              : "0"}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {isOverdue
                              ? "days overdue"
                              : isToday
                              ? "Today!"
                              : daysLeft === 1
                              ? "Tomorrow"
                              : daysLeft > 0
                              ? "days left"
                              : "Today!"}
                          </div>
                        </div>

                        {/* Status Indicator */}
                        <div className="flex items-center justify-center mb-2">
                          {isOverdue ? (
                            <div className="flex items-center gap-1.5">
                              <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                              <span className="text-xs font-medium text-red-600 dark:text-red-400">
                                Ended
                              </span>
                            </div>
                          ) : isToday ? (
                            <div className="flex items-center gap-1.5">
                              <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                              <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                                Happening Now
                              </span>
                            </div>
                          ) : isUpcoming ? (
                            <div className="flex items-center gap-1.5">
                              <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                              <span className="text-xs font-medium text-green-600 dark:text-green-400">
                                Soon
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5">
                              <div className="h-1.5 w-1.5 rounded-full bg-green-500/60" />
                              <span className="text-xs font-medium text-green-600/80 dark:text-green-400/80">
                                Upcoming
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Date */}
                        <div className="text-center pt-2 border-t border-border/30">
                          <div className="text-xs text-muted-foreground font-mono">
                            {new Date(countdown.targetDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </div>
                        </div>

                        {/* Gradient overlay for visual appeal */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tabs */}
            <Tabs
              defaultValue="vision"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="vision">
                  <Compass className="mr-2 h-4 w-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="journey">
                  <Mountain className="mr-2 h-4 w-4" />
                  Journey
                </TabsTrigger>
                <TabsTrigger value="areas">
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Categories
                </TabsTrigger>
                <TabsTrigger value="timeline">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Timeline
                </TabsTrigger>
              </TabsList>

              <TabsContent value="vision" className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-xl font-semibold">Active Goals</h3>
                    <div className="grid grid-cols-1 gap-6">
                      {goals
                        .filter((g) => g.status !== "completed")
                        .slice(0, 3)
                        .map((goal) => (
                          <GoalCard
                            key={goal.id}
                            goal={goal}
                            onEdit={() => openEditDialog(goal)}
                            onDelete={() => deleteGoal(goal.id)}
                            onToggleMilestone={(milestoneId) =>
                              toggleMilestone(goal.id, milestoneId)
                            }
                            onToggleExpansion={() =>
                              toggleMilestoneExpansion(goal.id)
                            }
                            isExpanded={expandedMilestones.has(goal.id)}
                            getCategoryIcon={getCategoryIcon}
                          />
                        ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="p-6 rounded-lg border">
                      <h4 className="font-semibold mb-4">Progress Overview</h4>
                      <div className="text-center">
                        <div className="text-3xl font-bold mb-2">
                          {goalStats.avgProgress}%
                        </div>
                        <div className="text-sm text-muted-foreground mb-4">
                          Average completion
                        </div>
                        <Progress
                          value={goalStats.avgProgress}
                          className="h-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="journey" className="mt-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">All Goals</h3>
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="planning">Planning</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredGoals.map((goal) => (
                      <GoalCard
                        key={goal.id}
                        goal={goal}
                        onEdit={() => openEditDialog(goal)}
                        onDelete={() => deleteGoal(goal.id)}
                        onToggleMilestone={(milestoneId) =>
                          toggleMilestone(goal.id, milestoneId)
                        }
                        onToggleExpansion={() =>
                          toggleMilestoneExpansion(goal.id)
                        }
                        isExpanded={expandedMilestones.has(goal.id)}
                        getCategoryIcon={getCategoryIcon}
                        detailed={true}
                      />
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="areas" className="mt-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold">Goal Categories</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => {
                      const categoryGoals = goals.filter(
                        (g) => g.category === category.name
                      );
                      const completed = categoryGoals.filter(
                        (g) => g.status === "completed"
                      ).length;
                      const inProgress = categoryGoals.filter(
                        (g) => g.status === "in-progress"
                      ).length;
                      const planning = categoryGoals.filter(
                        (g) => g.status === "planning"
                      ).length;

                      return (
                        <div
                          key={category.name}
                          className="p-6 rounded-lg border"
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <category.icon className="h-5 w-5" />
                            <h4 className="font-semibold">{category.name}</h4>
                          </div>
                          <div className="space-y-3">
                            <div className="text-2xl font-bold">
                              {categoryGoals.length}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Total goals
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-xs">
                              <div className="text-center">
                                <div className="font-medium">{planning}</div>
                                <div className="text-muted-foreground">
                                  Planning
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="font-medium">{inProgress}</div>
                                <div className="text-muted-foreground">
                                  Active
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="font-medium">{completed}</div>
                                <div className="text-muted-foreground">
                                  Done
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="timeline" className="mt-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold">Goal Timeline</h3>
                  <div className="space-y-4">
                    {goals
                      .sort(
                        (a, b) =>
                          new Date(a.targetDate) - new Date(b.targetDate)
                      )
                      .map((goal) => {
                        const daysLeft = getDaysRemaining(goal.targetDate);
                        return (
                          <div key={goal.id} className="p-6 rounded-lg border">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                {React.createElement(
                                  getCategoryIcon(goal.category),
                                  {
                                    className: "h-5 w-5",
                                  }
                                )}
                                <div>
                                  <h4 className="font-semibold">
                                    {goal.title}
                                  </h4>
                                  <p className="text-sm text-muted-foreground">
                                    Due:{" "}
                                    {new Date(
                                      goal.targetDate
                                    ).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-medium">
                                  {goal.progress}%
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {daysLeft > 0
                                    ? `${daysLeft} days left`
                                    : "Overdue"}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Edit Dialogs */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Edit Goal</DialogTitle>
                </DialogHeader>
                {editingGoal && (
                  <div className="grid gap-4 py-4 max-h-[400px] overflow-y-auto">
                    <Input
                      placeholder="Goal title..."
                      value={editingGoal.title}
                      onChange={(e) =>
                        setEditingGoal({
                          ...editingGoal,
                          title: e.target.value,
                        })
                      }
                    />
                    <Textarea
                      placeholder="Description..."
                      value={editingGoal.description}
                      onChange={(e) =>
                        setEditingGoal({
                          ...editingGoal,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                    />
                    <Textarea
                      placeholder="Vision..."
                      value={editingGoal.vision}
                      onChange={(e) =>
                        setEditingGoal({
                          ...editingGoal,
                          vision: e.target.value,
                        })
                      }
                      rows={2}
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <Select
                        value={editingGoal.category}
                        onValueChange={(value) =>
                          setEditingGoal({ ...editingGoal, category: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem
                              key={category.name}
                              value={category.name}
                            >
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select
                        value={editingGoal.priority}
                        onValueChange={(value) =>
                          setEditingGoal({ ...editingGoal, priority: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Calendar Date Picker for Edit Goal */}
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "justify-start text-left font-normal",
                            !editingGoal.targetDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {editingGoal.targetDate ? (
                            format(editingGoal.targetDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={editingGoal.targetDate}
                          onSelect={(date) =>
                            setEditingGoal({
                              ...editingGoal,
                              targetDate: date,
                            })
                          }
                          disabled={(date) =>
                            date < new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <Textarea
                      placeholder="Milestones (comma separated)..."
                      value={editingGoal.milestones}
                      onChange={(e) =>
                        setEditingGoal({
                          ...editingGoal,
                          milestones: e.target.value,
                        })
                      }
                      rows={2}
                    />
                  </div>
                )}
                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={editGoal}>Update</Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog
              open={isEditCountdownDialogOpen}
              onOpenChange={setIsEditCountdownDialogOpen}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Countdown</DialogTitle>
                </DialogHeader>
                {editingCountdown && (
                  <div className="grid gap-4 py-4">
                    <Input
                      placeholder="Event title..."
                      value={editingCountdown.title}
                      onChange={(e) =>
                        setEditingCountdown({
                          ...editingCountdown,
                          title: e.target.value,
                        })
                      }
                    />
                    <Textarea
                      placeholder="Description..."
                      value={editingCountdown.description}
                      onChange={(e) =>
                        setEditingCountdown({
                          ...editingCountdown,
                          description: e.target.value,
                        })
                      }
                      rows={2}
                    />

                    {/* Calendar Date Picker for Edit Countdown */}
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "justify-start text-left font-normal",
                            !editingCountdown.targetDate &&
                              "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {editingCountdown.targetDate ? (
                            format(editingCountdown.targetDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={editingCountdown.targetDate}
                          onSelect={(date) =>
                            setEditingCountdown({
                              ...editingCountdown,
                              targetDate: date,
                            })
                          }
                          disabled={(date) =>
                            date < new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditCountdownDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={editCountdown}>Update</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

// Simplified Goal Card
const GoalCard = ({
  goal,
  onEdit,
  onDelete,
  onToggleMilestone,
  onToggleExpansion,
  isExpanded,
  getCategoryIcon,
  detailed = false,
}) => {
  const Icon = getCategoryIcon(goal.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6 rounded-lg border"
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <Icon className="h-5 w-5 mt-1" />
            <div className="space-y-1">
              <h3 className="font-semibold">{goal.title}</h3>
              <p className="text-sm text-muted-foreground">
                {goal.description}
              </p>
              {goal.vision && detailed && (
                <p className="text-xs text-muted-foreground italic">
                  "{goal.vision}"
                </p>
              )}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={onEdit}>
                <Edit3 className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{goal.progress}%</span>
          </div>
          <Progress value={goal.progress} className="h-2" />
        </div>

        {goal.milestones.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Milestones</span>
              {goal.milestones.length > 3 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onToggleExpansion}
                  className="text-xs"
                >
                  {isExpanded
                    ? "Show less"
                    : `Show all ${goal.milestones.length}`}
                </Button>
              )}
            </div>
            <div className="space-y-1">
              {(isExpanded ? goal.milestones : goal.milestones.slice(0, 3)).map(
                (milestone) => (
                  <div
                    key={milestone.id}
                    className="flex items-center gap-2 text-sm"
                  >
                    <button onClick={() => onToggleMilestone(milestone.id)}>
                      {milestone.completed ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <Circle className="h-4 w-4" />
                      )}
                    </button>
                    <span
                      className={
                        milestone.completed
                          ? "line-through text-muted-foreground"
                          : ""
                      }
                    >
                      {milestone.title}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex gap-2">
            <Badge variant="outline">{goal.category}</Badge>
            <Badge variant="outline">{goal.difficulty}</Badge>
          </div>
          <span className="text-xs text-muted-foreground">
            Due: {new Date(goal.targetDate).toLocaleDateString()}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default GoalsPage;
