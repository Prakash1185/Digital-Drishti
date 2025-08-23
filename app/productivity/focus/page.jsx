"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppSidebar } from "@/components/app-sidebar";
import ShowBreadCrumb from "@/components/ShowBreadCrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Play,
  Pause,
  Square,
  Plus,
  Timer,
  Clock,
  Target,
  MoreVertical,
  Edit3,
  Trash2,
  Coffee,
  Brain,
  Zap,
  Maximize,
  X,
  RotateCcw,
} from "lucide-react";

const FocusPage = () => {
  const [sessions, setSessions] = useState([
    {
      id: 1,
      name: "Deep Work",
      focusTime: 25,
      breakTime: 5,
      longBreakTime: 15,
      rounds: 4,
      completedSessions: 12,
      totalFocusTime: 300, // in minutes
    },
    {
      id: 2,
      name: "Study Session",
      focusTime: 45,
      breakTime: 10,
      longBreakTime: 20,
      rounds: 3,
      completedSessions: 8,
      totalFocusTime: 360,
    },
    {
      id: 3,
      name: "Quick Focus",
      focusTime: 15,
      breakTime: 3,
      longBreakTime: 10,
      rounds: 6,
      completedSessions: 15,
      totalFocusTime: 225,
    },
  ]);

  const [currentSession, setCurrentSession] = useState(null);
  const [timerState, setTimerState] = useState("stopped");
  const [currentPhase, setCurrentPhase] = useState("focus");
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSession, setEditingSession] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("sessions");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [newSession, setNewSession] = useState({
    name: "",
    focusTime: 25,
    breakTime: 5,
    longBreakTime: 15,
    rounds: 4,
  });

  const intervalRef = useRef(null);

  const handlePhaseComplete = useCallback(() => {
    if (currentPhase === "focus") {
      if (currentRound === currentSession.rounds) {
        setCurrentPhase("longBreak");
        setTimeLeft(currentSession.longBreakTime * 60);
        setCurrentRound(1);
        setSessions((prev) =>
          prev.map((session) =>
            session.id === currentSession.id
              ? {
                  ...session,
                  completedSessions: session.completedSessions + 1,
                  totalFocusTime:
                    session.totalFocusTime + session.focusTime * session.rounds,
                }
              : session
          )
        );
      } else {
        setCurrentPhase("break");
        setTimeLeft(currentSession.breakTime * 60);
      }
    } else if (currentPhase === "break") {
      setCurrentPhase("focus");
      setTimeLeft(currentSession.focusTime * 60);
      setCurrentRound((prev) => prev + 1);
    } else if (currentPhase === "longBreak") {
      setTimerState("stopped");
      setCurrentPhase("focus");
      setCurrentRound(1);
    }
  }, [currentPhase, currentRound, currentSession]);

  // Timer logic
  useEffect(() => {
    if (timerState === "running" && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerState === "running") {
      handlePhaseComplete();
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [timerState, timeLeft, handlePhaseComplete]);

  const startTimer = (session = null) => {
    if (session && session !== currentSession) {
      setCurrentSession(session);
      setCurrentPhase("focus");
      setTimeLeft(session.focusTime * 60);
      setCurrentRound(1);
    }
    setTimerState("running");
  };

  const pauseTimer = () => {
    setTimerState("paused");
  };

  const stopTimer = () => {
    setTimerState("stopped");
    setCurrentPhase("focus");
    setCurrentRound(1);
    if (currentSession) {
      setTimeLeft(currentSession.focusTime * 60);
    }
  };

  const resetTimer = () => {
    setTimerState("stopped");
    setCurrentPhase("focus");
    setCurrentRound(1);
    if (currentSession) {
      setTimeLeft(currentSession.focusTime * 60);
    }
  };

  const addSession = () => {
    if (!newSession.name.trim()) return;
    const session = {
      id: Date.now(),
      ...newSession,
      completedSessions: 0,
      totalFocusTime: 0,
    };
    setSessions([...sessions, session]);
    setNewSession({
      name: "",
      focusTime: 25,
      breakTime: 5,
      longBreakTime: 15,
      rounds: 4,
    });
    setIsDialogOpen(false);
  };

  const editSession = () => {
    if (!editingSession.name.trim()) return;
    setSessions(
      sessions.map((session) =>
        session.id === editingSession.id ? editingSession : session
      )
    );
    setEditingSession(null);
    setIsEditDialogOpen(false);
  };

  const openEditDialog = (session) => {
    setEditingSession({ ...session });
    setIsEditDialogOpen(true);
  };

  const deleteSession = (id) => {
    setSessions(sessions.filter((session) => session.id !== id));
    if (currentSession && currentSession.id === id) {
      setCurrentSession(null);
      setTimerState("stopped");
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getPhaseColor = (phase) => {
    switch (phase) {
      case "focus":
        return "text-blue-600 dark:text-blue-400";
      case "break":
        return "text-emerald-600 dark:text-emerald-400";
      case "longBreak":
        return "text-purple-600 dark:text-purple-400";
      default:
        return "text-muted-foreground";
    }
  };

  const getPhaseIcon = (phase) => {
    switch (phase) {
      case "focus":
        return <Brain className="h-4 w-4 sm:h-5 sm:w-5" />;
      case "break":
        return <Coffee className="h-4 w-4 sm:h-5 sm:w-5" />;
      case "longBreak":
        return <Zap className="h-4 w-4 sm:h-5 sm:w-5" />;
      default:
        return <Timer className="h-4 w-4 sm:h-5 sm:w-5" />;
    }
  };

  const getProgress = () => {
    if (!currentSession) return 0;
    const totalTime =
      currentPhase === "focus"
        ? currentSession.focusTime * 60
        : currentPhase === "break"
        ? currentSession.breakTime * 60
        : currentSession.longBreakTime * 60;
    return ((totalTime - timeLeft) / totalTime) * 100;
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
                  Focus Timer
                </h1>
                <p className="text-muted-foreground text-xs sm:text-sm lg:text-base">
                  Create custom focus sessions and boost your productivity
                </p>
              </div>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    className="h-8 sm:h-9 px-3 sm:px-4 text-xs sm:text-sm"
                  >
                    <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">New Session</span>
                    <span className="sm:hidden">New</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] mx-3 sm:mx-0">
                  <DialogHeader>
                    <DialogTitle className="text-base sm:text-lg">
                      Create new session
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-3 sm:gap-4 py-3 sm:py-4">
                    <Input
                      placeholder="Session name..."
                      value={newSession.name}
                      onChange={(e) =>
                        setNewSession({ ...newSession, name: e.target.value })
                      }
                      className="text-xs sm:text-sm h-9 sm:h-10"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <label className="text-xs sm:text-sm font-medium">
                          Focus (min)
                        </label>
                        <Input
                          type="number"
                          min="1"
                          max="120"
                          value={newSession.focusTime}
                          onChange={(e) =>
                            setNewSession({
                              ...newSession,
                              focusTime: parseInt(e.target.value) || 25,
                            })
                          }
                          className="text-xs sm:text-sm h-9 sm:h-10"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs sm:text-sm font-medium">
                          Break (min)
                        </label>
                        <Input
                          type="number"
                          min="1"
                          max="60"
                          value={newSession.breakTime}
                          onChange={(e) =>
                            setNewSession({
                              ...newSession,
                              breakTime: parseInt(e.target.value) || 5,
                            })
                          }
                          className="text-xs sm:text-sm h-9 sm:h-10"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <label className="text-xs sm:text-sm font-medium">
                          Long Break (min)
                        </label>
                        <Input
                          type="number"
                          min="1"
                          max="120"
                          value={newSession.longBreakTime}
                          onChange={(e) =>
                            setNewSession({
                              ...newSession,
                              longBreakTime: parseInt(e.target.value) || 15,
                            })
                          }
                          className="text-xs sm:text-sm h-9 sm:h-10"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs sm:text-sm font-medium">
                          Rounds
                        </label>
                        <Input
                          type="number"
                          min="1"
                          max="10"
                          value={newSession.rounds}
                          onChange={(e) =>
                            setNewSession({
                              ...newSession,
                              rounds: parseInt(e.target.value) || 4,
                            })
                          }
                          className="text-xs sm:text-sm h-9 sm:h-10"
                        />
                      </div>
                    </div>
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
                      onClick={addSession}
                      size="sm"
                      className="h-9 sm:h-10 text-xs sm:text-sm"
                    >
                      Create Session
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Enhanced Timer Display */}
            {currentSession && (
              <div className="rounded-xl border bg-gradient-to-br from-card to-card/50 p-4 sm:p-6 lg:p-8 text-center space-y-4 sm:space-y-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div></div>
                  <div className="space-y-1 sm:space-y-2">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">
                      {currentSession.name}
                    </h2>
                    <div
                      className={`flex items-center justify-center gap-1 sm:gap-2 ${getPhaseColor(
                        currentPhase
                      )}`}
                    >
                      {getPhaseIcon(currentPhase)}
                      <span className="text-sm sm:text-base lg:text-lg font-medium capitalize">
                        {currentPhase === "longBreak"
                          ? "Long Break"
                          : currentPhase}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsFullscreen(true)}
                    className="h-6 w-6 sm:h-8 sm:w-8 p-0"
                  >
                    <Maximize className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div className="text-4xl sm:text-6xl lg:text-7xl font-mono font-bold tracking-tight">
                    {formatTime(timeLeft)}
                  </div>
                  <div className="max-w-xs sm:max-w-md mx-auto space-y-2">
                    <Progress value={getProgress()} className="h-1 sm:h-2" />
                    <div className="flex items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                      <span>
                        Round {currentRound} of {currentSession.rounds}
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span className="hidden sm:inline">
                        {Math.round(getProgress())}% complete
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                  {timerState === "stopped" || timerState === "paused" ? (
                    <Button
                      size="sm"
                      className="h-9 sm:h-10 text-xs sm:text-sm"
                      onClick={() => startTimer()}
                    >
                      <Play className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      {timerState === "paused" ? "Resume" : "Start"}
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-9 sm:h-10 text-xs sm:text-sm"
                      onClick={pauseTimer}
                    >
                      <Pause className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      Pause
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-9 sm:h-10 text-xs sm:text-sm"
                    onClick={resetTimer}
                  >
                    <RotateCcw className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Reset</span>
                    <span className="sm:hidden">Reset</span>
                  </Button>
                  {timerState !== "stopped" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-9 sm:h-10 text-xs sm:text-sm"
                      onClick={stopTimer}
                    >
                      <Square className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="hidden sm:inline">Stop</span>
                      <span className="sm:hidden">Stop</span>
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Tabs */}
            <Tabs
              defaultValue="sessions"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 h-auto">
                <TabsTrigger
                  value="sessions"
                  className="text-xs sm:text-sm py-2"
                >
                  <span className="hidden sm:inline">My Sessions</span>
                  <span className="sm:hidden">Sessions</span>
                </TabsTrigger>
                <TabsTrigger value="stats" className="text-xs sm:text-sm py-2">
                  <span className="hidden sm:inline">Statistics</span>
                  <span className="sm:hidden">Stats</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="sessions" className="mt-4 sm:mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  <AnimatePresence>
                    {sessions.map((session) => (
                      <SessionCard
                        key={session.id}
                        session={session}
                        isActive={currentSession?.id === session.id}
                        onStart={() => startTimer(session)}
                        onEdit={() => openEditDialog(session)}
                        onDelete={() => deleteSession(session.id)}
                      />
                    ))}
                  </AnimatePresence>
                </div>
                {sessions.length === 0 && (
                  <EmptyState text="No focus sessions created yet. Create your first session to get started!" />
                )}
              </TabsContent>

              <TabsContent value="stats" className="mt-4 sm:mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  <div className="rounded-xl border bg-card p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div className="text-xs sm:text-sm font-medium text-muted-foreground">
                        Total Sessions
                      </div>
                      <Target className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                    </div>
                    <div className="mt-1 sm:mt-2 text-xl sm:text-2xl lg:text-3xl font-bold">
                      {sessions.reduce(
                        (acc, session) => acc + session.completedSessions,
                        0
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Completed sessions
                    </p>
                  </div>

                  <div className="rounded-xl border bg-card p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div className="text-xs sm:text-sm font-medium text-muted-foreground">
                        Focus Time
                      </div>
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                    </div>
                    <div className="mt-1 sm:mt-2 text-xl sm:text-2xl lg:text-3xl font-bold">
                      {Math.round(
                        sessions.reduce(
                          (acc, session) => acc + session.totalFocusTime,
                          0
                        ) / 60
                      )}
                      h
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Total focus time
                    </p>
                  </div>

                  <div className="rounded-xl border bg-card p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
                    <div className="flex items-center justify-between">
                      <div className="text-xs sm:text-sm font-medium text-muted-foreground">
                        Average Session
                      </div>
                      <Timer className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                    </div>
                    <div className="mt-1 sm:mt-2 text-xl sm:text-2xl lg:text-3xl font-bold">
                      {sessions.length > 0
                        ? Math.round(
                            sessions.reduce(
                              (acc, session) => acc + session.focusTime,
                              0
                            ) / sessions.length
                          )
                        : 0}
                      m
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Average focus time
                    </p>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold">
                    Session Performance
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    {sessions.map((session) => (
                      <div
                        key={session.id}
                        className="rounded-xl border bg-card p-3 sm:p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="space-y-1 min-w-0 flex-1">
                            <h4 className="font-medium text-sm sm:text-base truncate">
                              {session.name}
                            </h4>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              {session.focusTime}min focus • {session.breakTime}
                              min break • {session.rounds} rounds
                            </p>
                          </div>
                          <div className="text-right space-y-1 flex-shrink-0 ml-4">
                            <div className="text-lg sm:text-xl lg:text-2xl font-bold">
                              {session.completedSessions}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              sessions
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 sm:mt-3 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs text-muted-foreground">
                          <span>
                            {Math.round(session.totalFocusTime / 60)}h total
                            focus
                          </span>
                          <span className="hidden sm:inline">•</span>
                          <span>Created {new Date().toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Edit Session Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent className="sm:max-w-[425px] mx-3 sm:mx-0">
                <DialogHeader>
                  <DialogTitle className="text-base sm:text-lg">
                    Edit session
                  </DialogTitle>
                </DialogHeader>
                {editingSession && (
                  <div className="grid gap-3 sm:gap-4 py-3 sm:py-4">
                    <Input
                      placeholder="Session name..."
                      value={editingSession.name}
                      onChange={(e) =>
                        setEditingSession({
                          ...editingSession,
                          name: e.target.value,
                        })
                      }
                      className="text-xs sm:text-sm h-9 sm:h-10"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <label className="text-xs sm:text-sm font-medium">
                          Focus (min)
                        </label>
                        <Input
                          type="number"
                          min="1"
                          max="120"
                          value={editingSession.focusTime}
                          onChange={(e) =>
                            setEditingSession({
                              ...editingSession,
                              focusTime: parseInt(e.target.value) || 25,
                            })
                          }
                          className="text-xs sm:text-sm h-9 sm:h-10"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs sm:text-sm font-medium">
                          Break (min)
                        </label>
                        <Input
                          type="number"
                          min="1"
                          max="60"
                          value={editingSession.breakTime}
                          onChange={(e) =>
                            setEditingSession({
                              ...editingSession,
                              breakTime: parseInt(e.target.value) || 5,
                            })
                          }
                          className="text-xs sm:text-sm h-9 sm:h-10"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <label className="text-xs sm:text-sm font-medium">
                          Long Break (min)
                        </label>
                        <Input
                          type="number"
                          min="1"
                          max="120"
                          value={editingSession.longBreakTime}
                          onChange={(e) =>
                            setEditingSession({
                              ...editingSession,
                              longBreakTime: parseInt(e.target.value) || 15,
                            })
                          }
                          className="text-xs sm:text-sm h-9 sm:h-10"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs sm:text-sm font-medium">
                          Rounds
                        </label>
                        <Input
                          type="number"
                          min="1"
                          max="10"
                          value={editingSession.rounds}
                          onChange={(e) =>
                            setEditingSession({
                              ...editingSession,
                              rounds: parseInt(e.target.value) || 4,
                            })
                          }
                          className="text-xs sm:text-sm h-9 sm:h-10"
                        />
                      </div>
                    </div>
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
                    onClick={editSession}
                    size="sm"
                    className="h-9 sm:h-10 text-xs sm:text-sm"
                  >
                    Update Session
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </main>
      </SidebarInset>

      {/* Fullscreen Timer */}
      <AnimatePresence>
        {isFullscreen && (
          <FullscreenTimer
            currentSession={currentSession}
            currentPhase={currentPhase}
            timeLeft={timeLeft}
            currentRound={currentRound}
            timerState={timerState}
            onClose={() => setIsFullscreen(false)}
            onStart={() => startTimer()}
            onPause={pauseTimer}
            onReset={resetTimer}
            onStop={stopTimer}
            formatTime={formatTime}
            getPhaseColor={getPhaseColor}
            getPhaseIcon={getPhaseIcon}
            getProgress={getProgress}
          />
        )}
      </AnimatePresence>
    </SidebarProvider>
  );
};

// Separate Fullscreen Timer Component to prevent re-renders
const FullscreenTimer = React.memo(
  ({
    currentSession,
    currentPhase,
    timeLeft,
    currentRound,
    timerState,
    onClose,
    onStart,
    onPause,
    onReset,
    onStop,
    formatTime,
    getPhaseColor,
    getPhaseIcon,
    getProgress,
  }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center p-4"
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={onClose}
        className="absolute top-3 right-3 sm:top-4 sm:right-4 h-8 w-8 p-0"
      >
        <X className="h-4 w-4" />
      </Button>

      <div className="text-center space-y-6 sm:space-y-8 max-w-2xl mx-auto">
        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            {currentSession?.name}
          </h2>
          <div
            className={`flex items-center justify-center gap-2 sm:gap-3 ${getPhaseColor(
              currentPhase
            )}`}
          >
            {getPhaseIcon(currentPhase)}
            <span className="text-lg sm:text-xl lg:text-2xl font-medium capitalize">
              {currentPhase === "longBreak" ? "Long Break" : currentPhase}
            </span>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div className="text-6xl sm:text-7xl lg:text-8xl font-mono font-bold">
            {formatTime(timeLeft)}
          </div>
          <div className="w-80 sm:w-96 mx-auto">
            <Progress value={getProgress()} className="h-2" />
          </div>
          <div className="text-lg sm:text-xl text-muted-foreground">
            Round {currentRound} of {currentSession?.rounds}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          {timerState === "stopped" || timerState === "paused" ? (
            <Button size="lg" onClick={onStart}>
              <Play className="mr-2 h-5 w-5" />
              {timerState === "paused" ? "Resume" : "Start"}
            </Button>
          ) : (
            <Button size="lg" variant="outline" onClick={onPause}>
              <Pause className="mr-2 h-5 w-5" />
              Pause
            </Button>
          )}
          <Button size="lg" variant="outline" onClick={onReset}>
            <RotateCcw className="mr-2 h-5 w-5" />
            Reset
          </Button>
          <Button size="lg" variant="outline" onClick={onStop}>
            <Square className="mr-2 h-5 w-5" />
            Stop
          </Button>
        </div>
      </div>
    </motion.div>
  )
);

FullscreenTimer.displayName = "FullscreenTimer";

// Enhanced Session Card Component
const SessionCard = ({ session, isActive, onStart, onEdit, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className={`group rounded-xl border bg-card p-3 sm:p-4 shadow-sm ${
        isActive ? "ring-2 ring-primary bg-primary/5" : ""
      }`}
    >
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1 min-w-0 flex-1">
            <h3 className="font-medium leading-tight text-sm sm:text-base truncate">
              {session.name}
            </h3>
            <div className="text-xs sm:text-sm text-muted-foreground">
              {session.focusTime}min focus • {session.breakTime}min break
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 sm:h-8 sm:w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
              >
                <MoreVertical className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEdit}>
                <Edit3 className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete} className="text-destructive">
                <Trash2 className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Target className="h-2 w-2 sm:h-3 sm:w-3" />
            {session.rounds} rounds
          </div>
          <div className="flex items-center gap-1">
            <Timer className="h-2 w-2 sm:h-3 sm:w-3" />
            {session.completedSessions} completed
          </div>
        </div>

        <Button
          onClick={onStart}
          className="w-full h-8 sm:h-9 text-xs sm:text-sm"
          variant={isActive ? "default" : "outline"}
          size="sm"
        >
          <Play className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          {isActive ? "Continue" : "Start Session"}
        </Button>
      </div>
    </motion.div>
  );
};

// Empty State Component
const EmptyState = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center rounded-xl border border-dashed bg-muted/50 col-span-full">
      <div className="rounded-full bg-muted p-2 sm:p-3 mb-3 sm:mb-4">
        <Timer className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-muted-foreground" />
      </div>
      <p className="text-xs sm:text-sm text-muted-foreground max-w-sm px-4">
        {text}
      </p>
    </div>
  );
};

export default FocusPage;
