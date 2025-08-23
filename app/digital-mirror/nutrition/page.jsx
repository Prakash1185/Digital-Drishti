"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AppSidebar } from "@/components/app-sidebar";
import ShowBreadCrumb from "@/components/ShowBreadCrumb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Sparkles,
  Brain,
  Heart,
  Shield,
  Zap,
  Coffee,
  Moon,
  Sun,
  Target,
  Activity,
  Leaf,
  CheckCircle,
  AlertTriangle,
  Timer,
  Eye,
  Feather,
  LayoutList,
  BookmarkCheck,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Award,
  Settings,
  Download,
  RefreshCw,
  Lightbulb,
  Calendar,
  Clock,
  Users,
  Focus,
  Smile,
  Frown,
  Meh,
  Star,
  ChevronRight,
  Play,
  Pause,
  BarChart3,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const DigitalNutritionPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("7d");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [acknowledgedAlerts, setAcknowledgedAlerts] = useState([]);
  const [completedHabits, setCompletedHabits] = useState([]);
  const [expandedInsight, setExpandedInsight] = useState(null);

  // Green color theme
  const colors = {
    primary: "#22c55e",
    light: "#4ade80",
    lighter: "#86efac",
    lightest: "#dcfce7",
    dark: "#16a34a",
    muted: "#94a3b8",
  };

  // Core wellness metrics
  const wellnessMetrics = [
    {
      key: "mental_clarity",
      label: "Mental Clarity",
      value: 84,
      delta: +7,
      icon: <Brain className="h-5 w-5 sm:h-6 sm:w-6" />,
      description: "Cognitive sharpness and decision-making quality",
      status: "excellent",
      trend: "improving",
    },
    {
      key: "emotional_balance",
      label: "Emotional Balance",
      value: 78,
      delta: +5,
      icon: <Heart className="h-5 w-5 sm:h-6 sm:w-6" />,
      description: "Mood stability and emotional regulation",
      status: "good",
      trend: "improving",
    },
    {
      key: "focus_quality",
      label: "Focus Quality",
      value: 72,
      delta: +4,
      icon: <Eye className="h-5 w-5 sm:h-6 sm:w-6" />,
      description: "Sustained attention and concentration levels",
      status: "good",
      trend: "improving",
    },
    {
      key: "content_nutrition",
      label: "Content Nutrition",
      value: 82,
      delta: +9,
      icon: <Leaf className="h-5 w-5 sm:h-6 sm:w-6" />,
      description: "Quality and balance of digital content consumed",
      status: "excellent",
      trend: "improving",
    },
    {
      key: "digital_wellness",
      label: "Digital Wellness",
      value: 75,
      delta: +3,
      icon: <Shield className="h-5 w-5 sm:h-6 sm:w-6" />,
      description: "Overall healthy digital behavior patterns",
      status: "good",
      trend: "improving",
    },
    {
      key: "sleep_impact",
      label: "Sleep Impact",
      value: 68,
      delta: -2,
      icon: <Moon className="h-5 w-5 sm:h-6 sm:w-6" />,
      description: "How digital habits affect sleep quality",
      status: "moderate",
      trend: "declining",
    },
  ];

  // AI-generated insights
  const aiInsights = [
    {
      id: "insight-1",
      type: "achievement",
      title: "Peak Cognitive Performance Window Identified",
      confidence: 94,
      priority: "High",
      category: "Productivity Optimization",
      timeframe: "Last 7 days",
      impact: "+23% focus efficiency",
      summary:
        "Your cognitive performance consistently peaks between 9:30-11:15 AM with highest sustained attention spans and lowest distraction rates.",
      details:
        "Analysis reveals 24% fewer interruptions and 31% higher information retention during this window. Your brain shows optimal processing speed and decision-making clarity.",
      recommendations: [
        "Schedule most important analytical tasks during 9:30-11:15 AM",
        "Block all non-essential notifications during this peak window",
        "Prepare resources 10 minutes before to eliminate startup friction",
        "Consider light physical activity 15 minutes before peak time",
      ],
      behavioral_changes: [
        "Reduced social media checking by 67% during morning hours",
        "Improved task switching discipline (3.2 → 1.8 switches/hour)",
        "Enhanced deep work session length (42 → 68 minutes average)",
      ],
    },
    {
      id: "insight-2",
      type: "warning",
      title: "Afternoon Energy Crash Pattern Detected",
      confidence: 87,
      priority: "Medium",
      category: "Energy Management",
      timeframe: "Consistent pattern over 14 days",
      impact: "-31% productivity decline",
      summary:
        "Significant cognitive fatigue occurring between 2:00-4:00 PM, correlating with decreased hydration and increased passive content consumption.",
      details:
        "Your interaction patterns show reduced cognitive load tolerance and increased seeking of low-stimulus content. This pattern appears linked to natural circadian rhythms and lifestyle factors.",
      recommendations: [
        "Implement structured hydration breaks at 2:10 PM and 3:20 PM",
        "Switch to light, educational content during energy dip",
        "Consider 5-minute walking breaks every 45 minutes",
        "Avoid caffeine after 2:30 PM to prevent sleep disruption",
      ],
      behavioral_changes: [
        "Increased passive scrolling by 43% during afternoon hours",
        "Reduced complex task completion by 28%",
        "Higher stress indicators in content interaction patterns",
      ],
    },
    {
      id: "insight-3",
      type: "positive",
      title: "Pre-Sleep Digital Hygiene Improving",
      confidence: 91,
      priority: "Medium",
      category: "Sleep Optimization",
      timeframe: "Last 10 days",
      impact: "+19% sleep quality improvement",
      summary:
        "Your pre-sleep digital behavior has shown marked improvement with reduced blue light exposure and stimulating content in the 90 minutes before bed.",
      details:
        "Analysis shows 54% reduction in high-stimulation content consumption and 67% decrease in social media engagement during your wind-down period.",
      recommendations: [
        "Extend current wind-down routine from 75 to 90 minutes",
        "Add 5-minute meditation or journaling session",
        "Create a curated reading list for pre-sleep content",
        "Consider using blue light filters after 8:00 PM",
      ],
      behavioral_changes: [
        "Reduced late-night social media use by 54%",
        "Improved content choice quality in evening hours",
        "Better consistency in sleep routine timing",
      ],
    },
    {
      id: "insight-4",
      type: "insight",
      title: "Content Consumption Quality Enhancement",
      confidence: 89,
      priority: "Low",
      category: "Learning Optimization",
      timeframe: "Last 21 days",
      impact: "+27% knowledge retention",
      summary:
        "Your content diet has shifted toward higher-quality educational material with improved topic continuity and reduced fragmented browsing.",
      details:
        "Sequential learning sessions increased by 41%, with better topic coherence and reduced context switching between unrelated subjects.",
      recommendations: [
        "Establish weekly learning themes for focused study",
        "Batch entertainment content into designated time slots",
        "Use spaced repetition for important articles and concepts",
        "Create a personal knowledge base for key insights",
      ],
      behavioral_changes: [
        "Increased educational content ratio from 23% to 37%",
        "Improved topic continuity in browsing sessions",
        "Reduced time spent on low-value content by 29%",
      ],
    },
  ];

  // Personalized micro-habits
  const microHabits = [
    {
      id: "habit-1",
      title: "Morning Digital Fasting",
      description: "No social media for first 60 minutes after waking",
      impact: "Improves morning focus quality by 34%",
      difficulty: "Medium",
      timeInvestment: "60 minutes",
      completed: false,
      streak: 0,
      targetStreak: 7,
    },
    {
      id: "habit-2",
      title: "Hydration Anchoring",
      description: "Drink water before each major app switch",
      impact: "Reduces afternoon fatigue by 28%",
      difficulty: "Easy",
      timeInvestment: "2 minutes",
      completed: false,
      streak: 0,
      targetStreak: 14,
    },
    {
      id: "habit-3",
      title: "Evening Content Curation",
      description: "Pre-select tomorrow's learning content before bed",
      impact: "Increases intentional browsing by 45%",
      difficulty: "Easy",
      timeInvestment: "5 minutes",
      completed: false,
      streak: 0,
      targetStreak: 10,
    },
    {
      id: "habit-4",
      title: "Focus Block Protection",
      description: "Turn off notifications during deep work sessions",
      impact: "Extends concentration spans by 52%",
      difficulty: "Hard",
      timeInvestment: "Setup once",
      completed: false,
      streak: 0,
      targetStreak: 5,
    },
  ];

  // Weekly goals
  const weeklyGoals = [
    {
      id: "goal-1",
      title: "Reduce Context Switching",
      current: 8,
      target: 12,
      unit: "focus blocks",
      description: "Maintain longer periods of concentrated work",
      progress: 67,
      daysLeft: 3,
    },
    {
      id: "goal-2",
      title: "Improve Content Quality Ratio",
      current: 73,
      target: 80,
      unit: "% quality content",
      description: "Increase proportion of educational vs. passive content",
      progress: 91,
      daysLeft: 3,
    },
    {
      id: "goal-3",
      title: "Consistent Sleep Routine",
      current: 5,
      target: 7,
      unit: "nights/week",
      description: "Maintain healthy pre-sleep digital habits",
      progress: 71,
      daysLeft: 3,
    },
  ];

  // Risk alerts
  const riskAlerts = [
    {
      id: "alert-1",
      severity: "medium",
      title: "Increasing Afternoon Fatigue Pattern",
      description:
        "Cognitive performance showing consistent decline during 2-4 PM window for the past week.",
      suggestion:
        "Implement structured breaks and hydration protocols during this period.",
      category: "Energy Management",
      urgency: "Review this week",
    },
    {
      id: "alert-2",
      severity: "low",
      title: "Weekend Digital Routine Disruption",
      description:
        "Sleep-wake cycles becoming irregular on weekends, affecting Monday productivity.",
      suggestion:
        "Maintain consistent sleep schedule within 1 hour on weekends.",
      category: "Sleep Hygiene",
      urgency: "Monitor weekly",
    },
  ];

  // Utility functions
  const refreshData = async () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastRefresh(new Date());
    }, 2000);
  };

  const toggleHabit = (id) => {
    setCompletedHabits((prev) =>
      prev.includes(id) ? prev.filter((h) => h !== id) : [...prev, id]
    );
  };

  const acknowledgeAlert = (id) => {
    setAcknowledgedAlerts((prev) => [...prev, id]);
  };

  const toggleInsightExpand = (id) => {
    setExpandedInsight((prev) => (prev === id ? null : id));
  };

  const exportData = () => {
    const data = {
      wellnessMetrics,
      aiInsights,
      microHabits,
      weeklyGoals,
      riskAlerts,
      timestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `digital-nutrition-${format(new Date(), "yyyy-MM-dd")}.json`;
    a.click();
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header - Simplified */}
        <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-2 px-4 sm:px-6">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <ShowBreadCrumb />
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-7xl">
            {/* Page Title with Action Buttons - Responsive */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-2">
                  <h1 className="text-xl font-semibold tracking-tight sm:text-2xl lg:text-3xl">
                    Digital Nutrition
                  </h1>
                  <p className="text-sm text-muted-foreground sm:text-base">
                    AI-powered insights for your digital wellness journey
                  </p>
                </div>

                {/* Action Buttons - Responsive */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                  <Select
                    value={selectedPeriod}
                    onValueChange={setSelectedPeriod}
                  >
                    <SelectTrigger className="w-full sm:w-32 h-9 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7d">Last 7 days</SelectItem>
                      <SelectItem value="14d">Last 14 days</SelectItem>
                      <SelectItem value="30d">Last 30 days</SelectItem>
                    </SelectContent>
                  </Select>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto h-9 px-3 text-sm"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Options
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={exportData}>
                        <Download className="mr-2 h-4 w-4" />
                        Export Report
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Calendar className="mr-2 h-4 w-4" />
                        Schedule Review
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Button
                    onClick={refreshData}
                    disabled={isRefreshing}
                    size="sm"
                    className="w-full sm:w-auto h-9 px-3 text-sm"
                  >
                    {isRefreshing ? (
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4 mr-2" />
                    )}
                    {isRefreshing ? "Syncing..." : "Sync"}
                  </Button>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>
                    Analysis updated {format(lastRefresh, "MMM dd 'at' HH:mm")}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <Card className="h-28 sm:h-36">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                        Mood Analysis
                      </p>
                      <p className="text-2xl sm:text-3xl font-bold">3/4</p>
                    </div>
                    <Target className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
                  </div>
                  <div className="mt-2 text-xs sm:text-sm text-muted-foreground">
                    75% completion rate
                  </div>
                </CardContent>
              </Card>

              <Card className="h-28 sm:h-36">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                        Active Habits
                      </p>
                      <p className="text-2xl sm:text-3xl font-bold">3/4</p>
                    </div>
                    <Target className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
                  </div>
                  <div className="mt-2 text-xs sm:text-sm text-muted-foreground">
                    75% completion rate
                  </div>
                </CardContent>
              </Card>

              <Card className="h-28 sm:h-36">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                        Weekly Goals
                      </p>
                      <p className="text-2xl sm:text-3xl font-bold">2/3</p>
                    </div>
                    <Target className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
                  </div>
                  <div className="mt-2 text-xs sm:text-sm text-muted-foreground">
                    67% completion rate
                  </div>
                </CardContent>
              </Card>

              <Card className="h-28 sm:h-36">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                        Wellness Score
                      </p>
                      <p className="text-2xl sm:text-3xl font-bold">76</p>
                    </div>
                    <Target className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
                  </div>
                  <div className="mt-2 text-xs sm:text-sm text-muted-foreground">
                    Overall health index
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Wellness Metrics */}
            <section className="space-y-4 sm:space-y-6">
              <div>
                <h2 className="text-lg font-bold tracking-tight mb-1 sm:text-xl lg:text-2xl sm:mb-2">
                  Wellness Metrics
                </h2>
                <p className="text-xs text-muted-foreground sm:text-sm lg:text-base">
                  AI-analyzed scores across key digital wellness dimensions
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {wellnessMetrics.map((metric) => (
                  <Card
                    key={metric.key}
                    className="group hover:shadow-lg transition-all duration-300 h-64 sm:h-72"
                  >
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-start justify-between mb-3 sm:mb-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-green-100 flex items-center justify-center">
                          <span className="text-green-600">{metric.icon}</span>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-xs",
                              metric.delta >= 0
                                ? "border-green-200 text-green-700 bg-green-50"
                                : "border-red-200 text-red-700 bg-red-50"
                            )}
                          >
                            {metric.delta >= 0 ? "+" : ""}
                            {metric.delta}%
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2 sm:space-y-3">
                        <div>
                          <h3 className="text-base font-semibold sm:text-lg">
                            {metric.label}
                          </h3>
                          <p className="text-xs text-muted-foreground sm:text-sm">
                            {metric.description}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold sm:text-3xl">
                              {metric.value}
                            </span>
                            <span className="text-xs text-muted-foreground sm:text-sm">
                              /100
                            </span>
                          </div>
                          <Progress
                            value={metric.value}
                            className="h-2 sm:h-3"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <Badge
                            variant="secondary"
                            className={cn(
                              "text-xs capitalize",
                              metric.status === "excellent" &&
                                "bg-green-100 text-green-800",
                              metric.status === "good" &&
                                "bg-blue-100 text-blue-800",
                              metric.status === "moderate" &&
                                "bg-yellow-100 text-yellow-800"
                            )}
                          >
                            {metric.status}
                          </Badge>
                          <div className="flex items-center text-xs text-muted-foreground">
                            {metric.trend === "improving" ? (
                              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                            ) : (
                              <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                            )}
                            {metric.trend}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* AI Insights */}
            <section className="space-y-4 sm:space-y-6">
              <div>
                <h2 className="text-lg font-bold tracking-tight mb-1 sm:text-xl lg:text-2xl sm:mb-2">
                  AI-Generated Insights
                </h2>
                <p className="text-xs text-muted-foreground sm:text-sm lg:text-base">
                  Personalized behavioral analysis and recommendations based on
                  your digital patterns
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {aiInsights.map((insight, index) => (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div
                            className={cn(
                              "w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                              insight.type === "achievement" &&
                                "bg-green-100 text-green-600",
                              insight.type === "warning" &&
                                "bg-orange-100 text-orange-600",
                              insight.type === "positive" &&
                                "bg-green-100 text-green-600",
                              insight.type === "insight" &&
                                "bg-blue-100 text-blue-600"
                            )}
                          >
                            {insight.type === "achievement" && (
                              <Award className="h-5 w-5 sm:h-6 sm:w-6" />
                            )}
                            {insight.type === "warning" && (
                              <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6" />
                            )}
                            {insight.type === "positive" && (
                              <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                            )}
                            {insight.type === "insight" && (
                              <Lightbulb className="h-5 w-5 sm:h-6 sm:w-6" />
                            )}
                          </div>

                          <div className="flex-1 space-y-2 sm:space-y-3">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                              <div className="flex-1">
                                <h3 className="text-base font-semibold leading-tight mb-1 sm:text-lg">
                                  {insight.title}
                                </h3>
                                <p className="text-muted-foreground text-xs sm:text-sm">
                                  {insight.summary}
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleInsightExpand(insight.id)}
                                className="self-start sm:ml-4 flex-shrink-0 h-8 px-2 sm:px-3 text-xs sm:text-sm"
                              >
                                {expandedInsight === insight.id
                                  ? "Collapse"
                                  : "Expand"}
                                <ChevronRight
                                  className={cn(
                                    "h-3 w-3 sm:h-4 sm:w-4 ml-1 transition-transform",
                                    expandedInsight === insight.id &&
                                      "rotate-90"
                                  )}
                                />
                              </Button>
                            </div>

                            <div className="flex flex-wrap gap-1 sm:gap-2">
                              <Badge variant="outline" className="text-xs">
                                {insight.category}
                              </Badge>
                              <Badge
                                variant={
                                  insight.priority === "High"
                                    ? "destructive"
                                    : "secondary"
                                }
                                className="text-xs"
                              >
                                {insight.priority} Priority
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {insight.confidence}% confidence
                              </Badge>
                              <Badge
                                variant="secondary"
                                className="text-xs bg-green-100 text-green-700"
                              >
                                {insight.impact}
                              </Badge>
                            </div>

                            {expandedInsight === insight.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-3 sm:space-y-4 pt-3 sm:pt-4 border-t"
                              >
                                <div>
                                  <h4 className="font-semibold mb-2 flex items-center gap-2 text-sm sm:text-base">
                                    <Brain className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                                    Detailed Analysis
                                  </h4>
                                  <p className="text-xs text-muted-foreground leading-relaxed sm:text-sm">
                                    {insight.details}
                                  </p>
                                </div>

                                <div>
                                  <h4 className="font-semibold mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                                    <Target className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                                    Recommended Actions
                                  </h4>
                                  <div className="space-y-1 sm:space-y-2">
                                    {insight.recommendations.map((rec, idx) => (
                                      <div
                                        key={idx}
                                        className="flex items-start gap-2 sm:gap-3"
                                      >
                                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs font-medium mt-0.5 flex-shrink-0">
                                          {idx + 1}
                                        </div>
                                        <p className="text-xs text-muted-foreground sm:text-sm">
                                          {rec}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-semibold mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                                    <Activity className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                                    Behavioral Changes Detected
                                  </h4>
                                  <div className="space-y-1 sm:space-y-2">
                                    {insight.behavioral_changes.map(
                                      (change, idx) => (
                                        <div
                                          key={idx}
                                          className="flex items-start gap-2"
                                        >
                                          <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                          <span className="text-xs text-muted-foreground sm:text-sm">
                                            {change}
                                          </span>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Weekly Goals */}
            <section className="space-y-4 sm:space-y-6">
              <div>
                <h2 className="text-lg font-bold tracking-tight mb-1 sm:text-xl lg:text-2xl sm:mb-2">
                  Weekly Goals
                </h2>
                <p className="text-xs text-muted-foreground sm:text-sm lg:text-base">
                  Track your progress toward key digital wellness objectives
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {weeklyGoals.map((goal) => (
                  <Card
                    key={goal.id}
                    className="group hover:shadow-lg transition-all duration-300 h-64 sm:h-72"
                  >
                    <CardContent className="p-4 sm:p-6">
                      <div className="space-y-3 sm:space-y-4">
                        <div>
                          <h3 className="text-base font-semibold mb-1 sm:text-lg">
                            {goal.title}
                          </h3>
                          <p className="text-xs text-muted-foreground sm:text-sm">
                            {goal.description}
                          </p>
                        </div>

                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold sm:text-3xl">
                            {goal.current}
                          </span>
                          <span className="text-muted-foreground text-sm">
                            / {goal.target} {goal.unit}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <Progress
                            value={goal.progress}
                            className="h-2 sm:h-3"
                          />
                          <div className="flex justify-between items-center text-xs sm:text-sm">
                            <Badge
                              variant="secondary"
                              className="text-xs bg-green-100 text-green-700"
                            >
                              {goal.progress}% Complete
                            </Badge>
                            <span className="text-muted-foreground">
                              {goal.daysLeft} days left
                            </span>
                          </div>
                        </div>

                        {goal.progress >= 80 && (
                          <Badge
                            variant="outline"
                            className="text-xs border-green-300 text-green-700 bg-green-50"
                          >
                            <Star className="h-3 w-3 mr-1" />
                            On Track
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Risk Alerts */}
            {riskAlerts.filter(
              (alert) => !acknowledgedAlerts.includes(alert.id)
            ).length > 0 && (
              <section className="space-y-4 sm:space-y-6">
                <div>
                  <h2 className="text-lg font-bold tracking-tight mb-1 sm:text-xl lg:text-2xl sm:mb-2">
                    Risk Alerts
                  </h2>
                  <p className="text-xs text-muted-foreground sm:text-sm lg:text-base">
                    Early warning signals that require your attention
                  </p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {riskAlerts
                    .filter((alert) => !acknowledgedAlerts.includes(alert.id))
                    .map((alert) => (
                      <Card
                        key={alert.id}
                        className={cn(
                          "border-l-4",
                          alert.severity === "high"
                            ? "border-l-red-500 "
                            : "border-l-orange-500"
                        )}
                      >
                        <CardContent className="p-4 sm:p-6">
                          <div className="flex items-start gap-3 sm:gap-4">
                            <div
                              className={cn(
                                "w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center",
                                alert.severity === "high"
                                  ? "bg-red-100 text-red-600"
                                  : "bg-orange-100 text-orange-600"
                              )}
                            >
                              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5" />
                            </div>

                            <div className="flex-1 space-y-2 sm:space-y-3">
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                                <div className="flex-1">
                                  <div className="flex flex-wrap items-center gap-2 mb-1">
                                    <h3 className="font-semibold text-base sm:text-lg">
                                      {alert.title}
                                    </h3>
                                    <Badge
                                      variant="outline"
                                      className={cn(
                                        "text-xs capitalize",
                                        alert.severity === "high"
                                          ? "border-red-300 text-red-700"
                                          : "border-orange-300 text-orange-700"
                                      )}
                                    >
                                      {alert.severity} risk
                                    </Badge>
                                  </div>
                                  <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <Badge
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      {alert.category}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">
                                      {alert.urgency}
                                    </span>
                                  </div>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => acknowledgeAlert(alert.id)}
                                  className="self-start sm:ml-4 h-8 px-2 sm:px-3 text-xs sm:text-sm"
                                >
                                  Acknowledge
                                </Button>
                              </div>

                              <p className="text-muted-foreground text-xs leading-relaxed sm:text-sm">
                                {alert.description}
                              </p>

                              <div className="p-3 rounded-lg bg-orange-50 border border-orange-200">
                                <p className="text-xs sm:text-sm">
                                  <span className="font-medium text-orange-800">
                                    Suggestion:
                                  </span>{" "}
                                  <span className="text-orange-700">
                                    {alert.suggestion}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </section>
            )}

            {/* Reflective Prompts */}
            <section className="space-y-4 sm:space-y-6">
              <div>
                <h2 className="text-lg font-bold tracking-tight mb-1 sm:text-xl lg:text-2xl sm:mb-2">
                  Reflective Prompts
                </h2>
                <p className="text-xs text-muted-foreground sm:text-sm lg:text-base">
                  Questions to deepen your self-awareness and digital
                  mindfulness
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {[
                  "What digital habits served you best today?",
                  "When did you feel most mentally clear and focused?",
                  "Which online activities left you feeling energized vs. drained?",
                  "How did your screen time choices affect your sleep quality?",
                  "What patterns do you notice in your most productive hours?",
                  "Which content made you feel most engaged and curious?",
                ].map((prompt, index) => (
                  <Card
                    key={index}
                    className="group hover:shadow-md transition-all duration-300 h-20 sm:h-24"
                  >
                    <CardContent className="p-4 sm:p-6 flex items-center">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600 font-medium text-xs sm:text-sm flex-shrink-0">
                          ?
                        </div>
                        <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
                          {prompt}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DigitalNutritionPage;
