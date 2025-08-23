"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AppSidebar } from "@/components/app-sidebar";
import ShowBreadCrumb from "@/components/ShowBreadCrumb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  Globe,
  Clock,
  Brain,
  TrendingUp,
  RefreshCw,
  Download,
  Settings,
  Filter,
  Eye,
  Heart,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Activity,
  Zap,
  Lightbulb,
  TrendingDown,
  Target,
  Award,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const ContentAnalyticsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("7d");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // Primary color: Green with various shades
  const primaryColor = "#22c55e";
  const colorVariations = {
    primary: "#22c55e",
    light: "#4ade80",
    lighter: "#86efac",
    lightest: "#dcfce7",
    dark: "#16a34a",
    darker: "#15803d",
    muted: "#94a3b8",
  };

  // Mock data for content consumption analytics
  const contentEngagementData = [
    { date: "2024-08-17", engagement: 75, time_spent: 120, websites: 15 },
    { date: "2024-08-18", engagement: 82, time_spent: 145, websites: 18 },
    { date: "2024-08-19", engagement: 68, time_spent: 95, websites: 12 },
    { date: "2024-08-20", engagement: 91, time_spent: 180, websites: 22 },
    { date: "2024-08-21", engagement: 77, time_spent: 135, websites: 16 },
    { date: "2024-08-22", engagement: 85, time_spent: 165, websites: 20 },
    { date: "2024-08-23", engagement: 79, time_spent: 155, websites: 19 },
  ];

  const contentTypeData = [
    { type: "Educational", hours: 4.2, percentage: 35, sentiment: 85 },
    { type: "News", hours: 2.8, percentage: 23, sentiment: 45 },
    { type: "Social Media", hours: 2.1, percentage: 18, sentiment: 60 },
    { type: "Entertainment", hours: 1.8, percentage: 15, sentiment: 75 },
    { type: "Work Related", hours: 1.1, percentage: 9, sentiment: 55 },
  ];

  const sentimentTimelineData = [
    { date: "2024-08-17", positive: 70, neutral: 25, negative: 5 },
    { date: "2024-08-18", positive: 65, neutral: 30, negative: 5 },
    { date: "2024-08-19", positive: 55, neutral: 35, negative: 10 },
    { date: "2024-08-20", positive: 91, neutral: 7, negative: 2 },
    { date: "2024-08-21", positive: 77, neutral: 16, negative: 7 },
    { date: "2024-08-22", positive: 85, neutral: 11, negative: 4 },
    { date: "2024-08-23", positive: 89, neutral: 9, negative: 2 },
  ];

  const hourlyPatternData = [
    { hour: "06:00", productivity: 45, engagement: 52, focus: 48 },
    { hour: "08:00", productivity: 78, engagement: 84, focus: 81 },
    { hour: "10:00", productivity: 92, engagement: 94, focus: 93 },
    { hour: "12:00", productivity: 87, engagement: 88, focus: 85 },
    { hour: "14:00", productivity: 68, engagement: 72, focus: 65 },
    { hour: "16:00", productivity: 74, engagement: 79, focus: 76 },
    { hour: "18:00", productivity: 82, engagement: 86, focus: 84 },
    { hour: "20:00", productivity: 89, engagement: 91, focus: 88 },
    { hour: "22:00", productivity: 71, engagement: 75, focus: 73 },
  ];

  const aiInsights = [
    {
      type: "positive",
      title: "Peak Performance Window Identified",
      description:
        "Your cognitive performance peaks between 10:00-12:00 with 94% engagement rates. Educational content consumption during this window shows 23% higher retention.",
      confidence: 94,
      impact: "Optimize learning schedule for maximum retention",
      trend: "up",
      metric: "+23%",
      category: "Performance Optimization",
      priority: "High",
    },
    {
      type: "warning",
      title: "Afternoon Performance Dip",
      description:
        "Significant productivity decline observed during 14:00-16:00 window. News consumption during this period correlates with 18% sentiment decrease.",
      confidence: 87,
      impact: "Consider content filtering during low-energy periods",
      trend: "down",
      metric: "-18%",
      category: "Energy Management",
      priority: "Medium",
    },
    {
      type: "insight",
      title: "Evening Recovery Pattern",
      description:
        "Strong engagement recovery after 18:00 suggests effective circadian rhythm alignment. Evening sessions show 12% higher focus quality than afternoon.",
      confidence: 91,
      impact: "Leverage evening sessions for complex tasks",
      trend: "up",
      metric: "+12%",
      category: "Circadian Optimization",
      priority: "Medium",
    },
  ];

  const chartConfigs = {
    engagement: {
      engagement: { label: "Engagement", color: colorVariations.primary },
      time_spent: { label: "Time Spent", color: colorVariations.light },
      websites: { label: "Websites", color: colorVariations.lighter },
    },
    sentiment: {
      positive: { label: "Positive", color: colorVariations.primary },
      neutral: { label: "Neutral", color: colorVariations.light },
      negative: { label: "Negative", color: colorVariations.muted },
    },
    hourly: {
      productivity: { label: "Productivity", color: colorVariations.primary },
      engagement: { label: "Engagement", color: colorVariations.light },
      focus: { label: "Focus", color: colorVariations.lighter },
    },
  };

  const refreshData = async () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastRefresh(new Date());
    }, 2000);
  };

  const exportData = () => {
    const data = {
      contentEngagement: contentEngagementData,
      contentTypes: contentTypeData,
      sentimentTimeline: sentimentTimelineData,
      hourlyPattern: hourlyPatternData,
      aiInsights,
      timestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `content-analytics-${format(new Date(), "yyyy-MM-dd")}.json`;
    a.click();
  };

  const getTotalStats = () => {
    const totalHours = contentTypeData.reduce(
      (acc, item) => acc + item.hours,
      0
    );
    const avgSentiment =
      contentTypeData.reduce((acc, item) => acc + item.sentiment, 0) /
      contentTypeData.length;
    const totalWebsites = contentEngagementData.reduce(
      (acc, item) => acc + item.websites,
      0
    );
    const avgEngagement =
      contentEngagementData.reduce((acc, item) => acc + item.engagement, 0) /
      contentEngagementData.length;

    return { totalHours, avgSentiment, totalWebsites, avgEngagement };
  };

  const stats = getTotalStats();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Fixed Header */}
        <header className="sticky top-0 z-10 flex h-14 sm:h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-2 px-3 sm:px-6">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <ShowBreadCrumb />
          </div>
        </header>

        <ScrollArea className="flex-1">
          <main className="container mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8">
            {/* Header Section */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-lg sm:text-xl font-semibold tracking-tight lg:text-2xl">
                  Content Analytics
                </h1>
                <p className="text-muted-foreground text-xs sm:text-sm lg:text-base">
                  AI-powered analysis of your digital content consumption
                  patterns
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <Select
                  value={selectedPeriod}
                  onValueChange={setSelectedPeriod}
                >
                  <SelectTrigger className="w-28 sm:w-32 h-8 sm:h-9 text-xs sm:text-sm">
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
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 sm:h-9 px-2 sm:px-3 text-xs sm:text-sm"
                    >
                      <Settings className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Options</span>
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

                <Button
                  onClick={refreshData}
                  disabled={isRefreshing}
                  size="sm"
                  className="h-8 sm:h-9 px-2 sm:px-3 text-xs sm:text-sm"
                >
                  {isRefreshing ? (
                    <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 animate-spin" />
                  ) : (
                    <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  )}
                  <span className="hidden sm:inline">Refresh</span>
                </Button>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              <Card className="h-20 sm:h-24 justify-center">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${colorVariations.lightest}` }}
                    >
                      <Clock
                        className="h-4 w-4 sm:h-5 sm:w-5"
                        style={{ color: colorVariations.primary }}
                      />
                    </div>
                    <div>
                      <div className="text-lg sm:text-xl lg:text-2xl font-bold">
                        {stats.totalHours.toFixed(1)}h
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        Total Time
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="h-20 sm:h-24 justify-center">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${colorVariations.lightest}` }}
                    >
                      <BarChart3
                        className="h-4 w-4 sm:h-5 sm:w-5"
                        style={{ color: colorVariations.primary }}
                      />
                    </div>
                    <div>
                      <div className="text-lg sm:text-xl lg:text-2xl font-bold">
                        {stats.avgEngagement.toFixed(0)}%
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        Avg Engagement
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="h-20 sm:h-24 justify-center">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${colorVariations.lightest}` }}
                    >
                      <Globe
                        className="h-4 w-4 sm:h-5 sm:w-5"
                        style={{ color: colorVariations.primary }}
                      />
                    </div>
                    <div>
                      <div className="text-lg sm:text-xl lg:text-2xl font-bold">
                        {stats.totalWebsites}
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        Websites Visited
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="h-20 sm:h-24 justify-center">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${colorVariations.lightest}` }}
                    >
                      <Heart
                        className="h-4 w-4 sm:h-5 sm:w-5"
                        style={{ color: colorVariations.primary }}
                      />
                    </div>
                    <div>
                      <div className="text-lg sm:text-xl lg:text-2xl font-bold">
                        {stats.avgSentiment.toFixed(0)}%
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        Avg Sentiment
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Engagement Chart - AREA CHART */}
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-sm sm:text-base lg:text-lg">
                  <BarChart3
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    style={{ color: colorVariations.primary }}
                  />
                  Content Engagement Trends
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Your content interaction patterns over time
                </CardDescription>
              </CardHeader>
              <CardContent className="p-3 sm:p-6">
                <ChartContainer
                  config={chartConfigs.engagement}
                  className="h-[250px] sm:h-[350px] lg:h-[400px] w-full"
                >
                  <AreaChart
                    data={contentEngagementData}
                    margin={{ top: 10, right: 15, left: 10, bottom: 10 }}
                  >
                    <defs>
                      <linearGradient
                        id="fillEngagement"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor={colorVariations.primary}
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor={colorVariations.primary}
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                      <linearGradient
                        id="fillTimeSpent"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor={colorVariations.light}
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor={colorVariations.light}
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                      <linearGradient
                        id="fillWebsites"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor={colorVariations.lighter}
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor={colorVariations.lighter}
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      fontSize={11}
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        });
                      }}
                    />
                    <YAxis tickLine={false} axisLine={false} fontSize={11} />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="dot" />}
                    />
                    <Area
                      dataKey="engagement"
                      type="natural"
                      fill="url(#fillEngagement)"
                      stroke={colorVariations.primary}
                      strokeWidth={2}
                    />
                    <Area
                      dataKey="time_spent"
                      type="natural"
                      fill="url(#fillTimeSpent)"
                      stroke={colorVariations.light}
                      strokeWidth={2}
                    />
                    <Area
                      dataKey="websites"
                      type="natural"
                      fill="url(#fillWebsites)"
                      stroke={colorVariations.lighter}
                      strokeWidth={2}
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Sentiment Analysis Chart - LINE CHART */}
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-sm sm:text-base lg:text-lg">
                  <Activity
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    style={{ color: colorVariations.primary }}
                  />
                  Sentiment Distribution Over Time
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  How content sentiment varies throughout your browsing sessions
                </CardDescription>
              </CardHeader>
              <CardContent className="p-3 sm:p-6">
                <ChartContainer
                  config={chartConfigs.sentiment}
                  className="h-[250px] sm:h-[350px] lg:h-[400px] w-full"
                >
                  <LineChart
                    data={sentimentTimelineData}
                    margin={{ top: 10, right: 15, left: 10, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      fontSize={11}
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        });
                      }}
                    />
                    <YAxis tickLine={false} axisLine={false} fontSize={11} />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="dot" />}
                    />
                    <Line
                      type="monotone"
                      dataKey="positive"
                      stroke={colorVariations.primary}
                      strokeWidth={3}
                      dot={{
                        fill: colorVariations.primary,
                        strokeWidth: 2,
                        r: 4,
                      }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="neutral"
                      stroke={colorVariations.light}
                      strokeWidth={2}
                      dot={{
                        fill: colorVariations.light,
                        strokeWidth: 2,
                        r: 3,
                      }}
                      activeDot={{ r: 5 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="negative"
                      stroke={colorVariations.muted}
                      strokeWidth={2}
                      dot={{
                        fill: colorVariations.muted,
                        strokeWidth: 2,
                        r: 3,
                      }}
                      activeDot={{ r: 5 }}
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Hourly Pattern Chart - BAR CHART */}
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-sm sm:text-base lg:text-lg">
                  <Eye
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    style={{ color: colorVariations.primary }}
                  />
                  Daily Performance Patterns
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Hourly productivity, engagement, and focus metrics
                </CardDescription>
              </CardHeader>
              <CardContent className="p-3 sm:p-6">
                <ChartContainer
                  config={chartConfigs.hourly}
                  className="h-[250px] sm:h-[350px] lg:h-[400px] w-full"
                >
                  <BarChart
                    data={hourlyPatternData}
                    margin={{ top: 10, right: 15, left: 10, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="hour"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      fontSize={11}
                    />
                    <YAxis tickLine={false} axisLine={false} fontSize={11} />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="dot" />}
                    />
                    <Bar
                      dataKey="productivity"
                      fill={colorVariations.primary}
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="engagement"
                      fill={colorVariations.light}
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="focus"
                      fill={colorVariations.lighter}
                      radius={[4, 4, 0, 0]}
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Enhanced AI Insights */}
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-sm sm:text-base lg:text-lg">
                  <Zap
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    style={{ color: colorVariations.primary }}
                  />
                  AI-Generated Insights
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Advanced behavioral analysis with actionable recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="p-3 sm:p-6">
                <div className="space-y-4 sm:space-y-6">
                  {aiInsights.map((insight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-border/50 bg-gradient-to-br from-background via-background to-muted/30 p-4 sm:p-6 lg:p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-border"
                    >
                      {/* Background Pattern */}
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-muted/5 to-muted/10 opacity-50" />

                      <div className="relative">
                        {/* Header Section */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6 gap-4">
                          <div className="flex items-start gap-3 sm:gap-4">
                            {/* Status Icon */}
                            <div
                              className={cn(
                                "flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl border-2 shadow-sm",
                                insight.type === "positive" &&
                                  "border-green-200 bg-green-50 text-green-600",
                                insight.type === "warning" &&
                                  "border-green-200 bg-green-50 text-green-600",
                                insight.type === "insight" &&
                                  "border-green-200 bg-green-50 text-green-600"
                              )}
                            >
                              {insight.type === "positive" && (
                                <Award className="h-5 w-5 sm:h-6 sm:w-6" />
                              )}
                              {insight.type === "warning" && (
                                <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6" />
                              )}
                              {insight.type === "insight" && (
                                <Target className="h-5 w-5 sm:h-6 sm:w-6" />
                              )}
                            </div>

                            {/* Title and Category */}
                            <div className="space-y-2 flex-1">
                              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-foreground leading-tight">
                                {insight.title}
                              </h3>
                              <div className="flex flex-wrap items-center gap-2">
                                <Badge
                                  variant="secondary"
                                  className="text-xs font-medium"
                                  style={{
                                    backgroundColor: colorVariations.lightest,
                                    color: colorVariations.dark,
                                  }}
                                >
                                  {insight.category}
                                </Badge>
                                <Badge
                                  variant={
                                    insight.priority === "High"
                                      ? "destructive"
                                      : "outline"
                                  }
                                  className="text-xs font-medium"
                                  style={
                                    insight.priority !== "High"
                                      ? {
                                          borderColor: colorVariations.light,
                                          color: colorVariations.dark,
                                        }
                                      : {}
                                  }
                                >
                                  {insight.priority} Priority
                                </Badge>
                              </div>
                            </div>
                          </div>

                          {/* Metrics Section */}
                          <div className="flex items-center gap-3 sm:gap-3 self-start">
                            <div className="text-right">
                              <div
                                className={cn(
                                  "flex items-center gap-1 text-base sm:text-lg font-bold",
                                  insight.trend === "up"
                                    ? "text-green-600"
                                    : "text-green-600"
                                )}
                                style={{ color: colorVariations.primary }}
                              >
                                {insight.trend === "up" ? (
                                  <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4" />
                                ) : (
                                  <ArrowDownRight className="h-3 w-3 sm:h-4 sm:w-4" />
                                )}
                                {insight.metric}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Impact
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-base sm:text-lg font-bold text-foreground">
                                {insight.confidence}%
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Confidence
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <div className="mb-4 sm:mb-6">
                          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                            {insight.description}
                          </p>
                        </div>

                        {/* Action Item */}
                        <div className="flex items-start gap-3 rounded-lg sm:rounded-xl border border-border/50 bg-muted/30 p-3 sm:p-4">
                          <div
                            className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-md sm:rounded-lg text-white"
                            style={{ backgroundColor: colorVariations.primary }}
                          >
                            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-xs sm:text-sm font-semibold text-foreground mb-1">
                              Recommended Action
                            </h4>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              {insight.impact}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ContentAnalyticsPage;
