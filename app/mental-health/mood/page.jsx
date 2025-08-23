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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Brain,
  Heart,
  Activity,
  Calendar,
  Clock,
  Download,
  Settings,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Zap,
  Target,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Filter,
  Eye,
  Globe,
  Smartphone,
  MonitorSpeaker,
  Mouse,
  Keyboard,
  PlayCircle,
  BookOpen,
  MessageSquare,
  Search,
  MoreHorizontal,
} from "lucide-react";
import { format, subDays, startOfWeek, endOfWeek } from "date-fns";
import { cn } from "@/lib/utils";

const MoodTrackerPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("7d");
  const [selectedChart, setSelectedChart] = useState("mood");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastAnalysis, setLastAnalysis] = useState(new Date());

  // Mock data - in real app, this would come from API analysis
  const moodData = [
    { date: "Mon", mood: 7, energy: 6, stress: 4, focus: 8 },
    { date: "Tue", mood: 6, energy: 5, stress: 6, focus: 6 },
    { date: "Wed", mood: 8, energy: 7, stress: 3, focus: 9 },
    { date: "Thu", mood: 5, energy: 4, stress: 7, focus: 5 },
    { date: "Fri", mood: 9, energy: 8, stress: 2, focus: 8 },
    { date: "Sat", mood: 8, energy: 7, stress: 3, focus: 7 },
    { date: "Sun", mood: 7, energy: 6, stress: 4, focus: 6 },
  ];

  const behaviorAnalysis = {
    screenTime: {
      total: 7.2,
      breakdown: [
        { category: "Social Media", hours: 2.3, color: "#ef4444" },
        { category: "Work/Productivity", hours: 3.1, color: "#3b82f6" },
        { category: "Entertainment", hours: 1.5, color: "#f59e0b" },
        { category: "News", hours: 0.3, color: "#6b7280" },
      ],
    },
    contentSentiment: {
      positive: 65,
      neutral: 25,
      negative: 10,
    },
    activityPatterns: [
      { time: "6:00", activity: 2, mood: 6 },
      { time: "9:00", activity: 8, mood: 7 },
      { time: "12:00", activity: 6, mood: 8 },
      { time: "15:00", activity: 7, mood: 6 },
      { time: "18:00", activity: 5, mood: 7 },
      { time: "21:00", activity: 3, mood: 8 },
    ],
  };

  const insights = [
    {
      type: "positive",
      title: "Productivity Boost",
      description:
        "Your mood improves by 23% when engaging with productivity content",
      confidence: 87,
      action: "Continue using productivity tools during morning hours",
    },
    {
      type: "warning",
      title: "Social Media Impact",
      description:
        "Extended social media use correlates with decreased mood scores",
      confidence: 92,
      action: "Consider limiting social media to 30 minutes per session",
    },
    {
      type: "neutral",
      title: "Sleep Pattern",
      description: "Late-night device usage may be affecting your morning mood",
      confidence: 76,
      action: "Try implementing a digital sunset 1 hour before bed",
    },
  ];

  const recommendations = [
    {
      category: "Content",
      suggestion: "Increase exposure to educational and motivational content",
      impact: "High",
      timeframe: "1 week",
    },
    {
      category: "Timing",
      suggestion: "Shift news consumption to afternoon hours",
      impact: "Medium",
      timeframe: "3 days",
    },
    {
      category: "Balance",
      suggestion: "Add 15-minute breaks between intensive screen sessions",
      impact: "High",
      timeframe: "Immediate",
    },
  ];

  const analyzeUserBehavior = async () => {
    setIsAnalyzing(true);
    // Simulate API call to Hugging Face and other analytics APIs
    setTimeout(() => {
      setIsAnalyzing(false);
      setLastAnalysis(new Date());
    }, 3000);
  };

  const exportData = () => {
    // Export mood and behavior data
    const data = {
      moodData,
      behaviorAnalysis,
      insights,
      timestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mood-analysis-${format(new Date(), "yyyy-MM-dd")}.json`;
    a.click();
  };

  const chartColors = {
    mood: "#3b82f6",
    energy: "#10b981",
    stress: "#ef4444",
    focus: "#8b5cf6",
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Fixed Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-2 px-6">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <ShowBreadCrumb />
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6 space-y-6">
            {/* Header Section */}
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Mood Analytics</h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  AI-powered insights based on your digital behavior and content
                  consumption
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-xs">
                  <Brain className="h-3 w-3 mr-1" />
                  AI Powered
                </Badge>

                <Select
                  value={selectedPeriod}
                  onValueChange={setSelectedPeriod}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 3 months</SelectItem>
                  </SelectContent>
                </Select>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Options
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={exportData}>
                      <Download className="mr-2 h-4 w-4" />
                      Export Data
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Filter className="mr-2 h-4 w-4" />
                      Filter Settings
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button onClick={analyzeUserBehavior} disabled={isAnalyzing}>
                  {isAnalyzing ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Brain className="h-4 w-4 mr-2" />
                  )}
                  {isAnalyzing ? "Analyzing..." : "Analyze Now"}
                </Button>
              </div>
            </div>

            {/* Analysis Status */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Analysis Complete</h3>
                      <p className="text-sm text-muted-foreground">
                        Last updated:{" "}
                        {format(lastAnalysis, "MMM dd, yyyy 'at' HH:mm")}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">8,247</div>
                    <div className="text-sm text-muted-foreground">
                      Data points analyzed
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Chart Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Mood Trends
                    </CardTitle>
                    <CardDescription>
                      Your emotional well-being patterns over time
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select
                      value={selectedChart}
                      onValueChange={setSelectedChart}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mood">Mood</SelectItem>
                        <SelectItem value="energy">Energy</SelectItem>
                        <SelectItem value="stress">Stress</SelectItem>
                        <SelectItem value="focus">Focus</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={moodData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="opacity-30"
                      />
                      <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis
                        domain={[0, 10]}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--background))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey={selectedChart}
                        stroke={chartColors[selectedChart]}
                        fill={chartColors[selectedChart]}
                        fillOpacity={0.1}
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Analytics Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Content Consumption Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChartIcon className="h-5 w-5" />
                    Content Breakdown
                  </CardTitle>
                  <CardDescription>
                    How you spend your digital time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold">
                        {behaviorAnalysis.screenTime.total}h
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Daily average
                      </div>
                    </div>

                    <div className="space-y-3">
                      {behaviorAnalysis.screenTime.breakdown.map(
                        (item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: item.color }}
                              />
                              <span className="text-sm">{item.category}</span>
                            </div>
                            <div className="text-sm font-medium">
                              {item.hours}h
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sentiment Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Content Sentiment
                  </CardTitle>
                  <CardDescription>
                    Emotional tone of consumed content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Positive</span>
                        <span className="text-sm font-medium">
                          {behaviorAnalysis.contentSentiment.positive}%
                        </span>
                      </div>
                      <Progress
                        value={behaviorAnalysis.contentSentiment.positive}
                        className="h-2"
                      />

                      <div className="flex items-center justify-between">
                        <span className="text-sm">Neutral</span>
                        <span className="text-sm font-medium">
                          {behaviorAnalysis.contentSentiment.neutral}%
                        </span>
                      </div>
                      <Progress
                        value={behaviorAnalysis.contentSentiment.neutral}
                        className="h-2"
                      />

                      <div className="flex items-center justify-between">
                        <span className="text-sm">Negative</span>
                        <span className="text-sm font-medium">
                          {behaviorAnalysis.contentSentiment.negative}%
                        </span>
                      </div>
                      <Progress
                        value={behaviorAnalysis.contentSentiment.negative}
                        className="h-2"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Activity Patterns */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Daily Activity Patterns
                </CardTitle>
                <CardDescription>
                  How your mood correlates with activity throughout the day
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={behaviorAnalysis.activityPatterns}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="opacity-30"
                      />
                      <XAxis
                        dataKey="time"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--background))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="activity" fill="#3b82f6" opacity={0.7} />
                      <Bar dataKey="mood" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Insights and Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* AI Insights */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    AI Insights
                  </CardTitle>
                  <CardDescription>
                    Patterns discovered in your behavior
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {insights.map((insight, index) => (
                      <div key={index} className="p-4 rounded-lg border">
                        <div className="flex items-start gap-3">
                          <div
                            className={cn(
                              "w-2 h-2 rounded-full mt-2",
                              insight.type === "positive" && "bg-green-500",
                              insight.type === "warning" && "bg-yellow-500",
                              insight.type === "neutral" && "bg-blue-500"
                            )}
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">
                              {insight.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {insight.description}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <Badge variant="outline" className="text-xs">
                                {insight.confidence}% confidence
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Recommendations
                  </CardTitle>
                  <CardDescription>
                    Personalized suggestions for better well-being
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recommendations.map((rec, index) => (
                      <div key={index} className="p-4 rounded-lg border">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="secondary" className="text-xs">
                                {rec.category}
                              </Badge>
                              <Badge
                                variant={
                                  rec.impact === "High" ? "default" : "outline"
                                }
                                className="text-xs"
                              >
                                {rec.impact} Impact
                              </Badge>
                            </div>
                            <p className="text-sm">{rec.suggestion}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Expected results in {rec.timeframe}
                            </p>
                          </div>
                          <Button size="sm" variant="outline">
                            Apply
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Data Sources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Data Sources
                </CardTitle>
                <CardDescription>
                  Information used for mood analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg border">
                    <Globe className="h-5 w-5 text-blue-500" />
                    <div>
                      <div className="text-sm font-medium">Browser History</div>
                      <div className="text-xs text-muted-foreground">
                        2,341 entries
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg border">
                    <Smartphone className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="text-sm font-medium">App Usage</div>
                      <div className="text-xs text-muted-foreground">
                        47 apps
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg border">
                    <PlayCircle className="h-5 w-5 text-red-500" />
                    <div>
                      <div className="text-sm font-medium">
                        Media Consumption
                      </div>
                      <div className="text-xs text-muted-foreground">
                        18 hours
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg border">
                    <Search className="h-5 w-5 text-purple-500" />
                    <div>
                      <div className="text-sm font-medium">Search Queries</div>
                      <div className="text-xs text-muted-foreground">
                        156 searches
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MoodTrackerPage;
