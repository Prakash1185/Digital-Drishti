"use client";

import { AppSidebar } from "@/components/app-sidebar";
import ShowBreadCrumb from "@/components/ShowBreadCrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  RadialBar,
  RadialBarChart,
  LabelList,
} from "recharts";

// Data for charts
const weeklyProductivityData = [
  { day: "Mon", tasks: 12, focus: 6.5 },
  { day: "Tue", tasks: 19, focus: 7.2 },
  { day: "Wed", tasks: 15, focus: 5.8 },
  { day: "Thu", tasks: 22, focus: 8.1 },
  { day: "Fri", tasks: 18, focus: 7.5 },
  { day: "Sat", tasks: 8, focus: 4.2 },
  { day: "Sun", tasks: 5, focus: 3.5 },
];

const digitalNutritionData = [
  { category: "Educational", value: 35, fill: "var(--chart-2)" },
  { category: "Entertainment", value: 28, fill: "oklch(0.626 0.153 162.48)" },
  { category: "Social Media", value: 20, fill: "oklch(0.556 0.136 162.48)" },
  { category: "News", value: 12, fill: "oklch(0.486 0.119 162.48)" },
  { category: "Productivity", value: 5, fill: "oklch(0.416 0.102 162.48)" },
];

const moodTrendData = [
  { date: "Mon", happiness: 7.2, stress: 3.8, energy: 6.5 },
  { date: "Tue", happiness: 7.8, stress: 3.2, energy: 7.2 },
  { date: "Wed", happiness: 6.9, stress: 4.1, energy: 6.8 },
  { date: "Thu", happiness: 8.1, stress: 2.9, energy: 7.8 },
  { date: "Fri", happiness: 7.5, stress: 3.5, energy: 7.1 },
  { date: "Sat", happiness: 8.3, stress: 2.7, energy: 8.2 },
  { date: "Sun", happiness: 7.9, stress: 3.1, energy: 7.6 },
];

const focusSessionData = [
  { hour: "9 AM", sessions: 5 },
  { hour: "10 AM", sessions: 7 },
  { hour: "11 AM", sessions: 6 },
  { hour: "2 PM", sessions: 8 },
  { hour: "3 PM", sessions: 9 },
  { hour: "4 PM", sessions: 7 },
];

const goalCompletionData = [
  { goal: "Tasks", completion: 85, fill: "var(--chart-2)" },
  { goal: "Focus", completion: 72, fill: "oklch(0.626 0.153 162.48)" },
  { goal: "Exercise", completion: 60, fill: "oklch(0.556 0.136 162.48)" },
  { goal: "Reading", completion: 45, fill: "oklch(0.486 0.119 162.48)" },
  { goal: "Meditation", completion: 78, fill: "oklch(0.416 0.102 162.48)" },
];

const screenTimeData = [
  { day: "Mon", mobile: 4.2, desktop: 6.8 },
  { day: "Tue", mobile: 3.8, desktop: 7.2 },
  { day: "Wed", mobile: 5.1, desktop: 5.9 },
  { day: "Thu", mobile: 3.5, desktop: 8.1 },
  { day: "Fri", mobile: 4.8, desktop: 6.5 },
  { day: "Sat", mobile: 6.2, desktop: 3.2 },
  { day: "Sun", mobile: 5.5, desktop: 2.8 },
];

// Chart configurations with single color scheme
const productivityConfig = {
  tasks: { label: "Tasks", color: "var(--chart-2)" },
  focus: { label: "Focus Hours", color: "oklch(0.626 0.153 162.48)" },
};

const nutritionConfig = {
  value: { label: "Hours" },
  Educational: { label: "Educational", color: "var(--chart-2)" },
  Entertainment: { label: "Entertainment", color: "oklch(0.626 0.153 162.48)" },
  "Social Media": { label: "Social Media", color: "oklch(0.556 0.136 162.48)" },
  News: { label: "News", color: "oklch(0.486 0.119 162.48)" },
  Productivity: { label: "Productivity", color: "oklch(0.416 0.102 162.48)" },
};

const moodConfig = {
  happiness: { label: "Happiness", color: "var(--chart-2)" },
  energy: { label: "Energy", color: "oklch(0.626 0.153 162.48)" },
  stress: { label: "Stress", color: "oklch(0.556 0.136 162.48)" },
};

const focusConfig = {
  sessions: { label: "Sessions", color: "var(--chart-2)" },
};

const goalConfig = {
  completion: { label: "Completion %" },
  Tasks: { label: "Tasks", color: "var(--chart-2)" },
  Focus: { label: "Focus", color: "oklch(0.626 0.153 162.48)" },
  Exercise: { label: "Exercise", color: "oklch(0.556 0.136 162.48)" },
  Reading: { label: "Reading", color: "oklch(0.486 0.119 162.48)" },
  Meditation: { label: "Meditation", color: "oklch(0.416 0.102 162.48)" },
};

const screenConfig = {
  mobile: { label: "Mobile", color: "var(--chart-2)" },
  desktop: { label: "Desktop", color: "oklch(0.626 0.153 162.48)" },
};

export default function Page() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <SidebarProvider className="font-inter">
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <ShowBreadCrumb />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-6 md:gap-6 md:p-6">
          {/* Simple Greeting */}
          <div className="space-y-1">
            <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Welcome, User
            </h1>
            <p className="text-sm text-muted-foreground md:text-base">
              {currentDate} • {currentTime}
            </p>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            <Card className={"h-32 justify-center"}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-xs font-medium md:text-sm">
                  Tasks Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold md:text-2xl">23</div>
                <p className="text-xs text-muted-foreground">Today</p>
              </CardContent>
            </Card>

            <Card className={"h-32 justify-center"}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-xs font-medium md:text-sm">
                  Focus Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold md:text-2xl">6.5h</div>
                <p className="text-xs text-muted-foreground">Today</p>
              </CardContent>
            </Card>

            <Card className={"h-32 justify-center"}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
                <CardTitle className="text-xs font-medium md:text-sm">
                  Mood Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold md:text-2xl">8.1</div>
                <p className="text-xs text-muted-foreground">This week</p>
              </CardContent>
            </Card>

            <Card className={"h-32 justify-center"}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-xs font-medium md:text-sm">
                  Screen Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold md:text-2xl">7.2h</div>
                <p className="text-xs text-muted-foreground">Today</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {/* Weekly Productivity - Area Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-base md:text-lg">
                  Weekly Productivity
                </CardTitle>
                <CardDescription className="text-sm">
                  Tasks and focus hours over the week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={productivityConfig}
                  className="h-[250px] w-full"
                >
                  <AreaChart
                    accessibilityLayer
                    data={weeklyProductivityData}
                    margin={{ left: 12, right: 12 }}
                  >
                    <defs>
                      <linearGradient
                        id="fillTasks"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="var(--chart-2)"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="var(--chart-2)"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                      <linearGradient
                        id="fillFocus"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="oklch(0.626 0.153 162.48)"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="oklch(0.626 0.153 162.48)"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="day"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent />}
                    />
                    <Area
                      dataKey="focus"
                      type="natural"
                      fill="url(#fillFocus)"
                      stroke="oklch(0.626 0.153 162.48)"
                      stackId="a"
                    />
                    <Area
                      dataKey="tasks"
                      type="natural"
                      fill="url(#fillTasks)"
                      stroke="var(--chart-2)"
                      stackId="a"
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Digital Nutrition - Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">
                  Digital Nutrition
                </CardTitle>
                <CardDescription className="text-sm">
                  Content breakdown
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={nutritionConfig}
                  className="mx-auto aspect-square max-h-[250px]"
                >
                  <PieChart>
                    <Pie
                      data={digitalNutritionData}
                      dataKey="value"
                      nameKey="category"
                    />
                    <ChartTooltip
                      content={<ChartTooltipContent nameKey="category" />}
                    />
                    <ChartLegend
                      content={<ChartLegendContent nameKey="category" />}
                      className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center text-xs"
                    />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Mood Trends - Line Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-base md:text-lg">
                  Weekly Mood Analysis
                </CardTitle>
                <CardDescription className="text-sm">
                  Happiness, energy, and stress levels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={moodConfig}
                  className="h-[250px] w-full"
                >
                  <LineChart
                    accessibilityLayer
                    data={moodTrendData}
                    margin={{ left: 12, right: 12 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent />}
                    />
                    <Line
                      dataKey="happiness"
                      type="monotone"
                      stroke="var(--chart-2)"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      dataKey="energy"
                      type="monotone"
                      stroke="oklch(0.626 0.153 162.48)"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      dataKey="stress"
                      type="monotone"
                      stroke="oklch(0.556 0.136 162.48)"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Goal Completion - Radial Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">
                  Daily Goals
                </CardTitle>
                <CardDescription className="text-sm">
                  Completion percentage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={goalConfig}
                  className="mx-auto aspect-square max-h-[250px]"
                >
                  <RadialBarChart
                    data={goalCompletionData}
                    startAngle={-90}
                    endAngle={380}
                    innerRadius={30}
                    outerRadius={110}
                  >
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel nameKey="goal" />}
                    />
                    <RadialBar dataKey="completion" background>
                      <LabelList
                        position="insideStart"
                        dataKey="goal"
                        className="fill-white capitalize mix-blend-luminosity"
                        fontSize={11}
                      />
                    </RadialBar>
                  </RadialBarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Focus Sessions - Bar Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base md:text-lg">
                  Peak Focus Hours
                </CardTitle>
                <CardDescription className="text-sm">
                  Daily productivity patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={focusConfig}
                  className="h-[250px] w-full"
                >
                  <BarChart
                    accessibilityLayer
                    data={focusSessionData}
                    margin={{ left: 12, right: 12 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="hour"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent />}
                    />
                    <Bar dataKey="sessions" fill="var(--chart-2)" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Screen Time - Line Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-base md:text-lg">
                  Screen Time Distribution
                </CardTitle>
                <CardDescription className="text-sm">
                  Mobile vs desktop usage throughout the week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={screenConfig}
                  className="h-[250px] w-full"
                >
                  <LineChart
                    accessibilityLayer
                    data={screenTimeData}
                    margin={{ left: 12, right: 12 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="day"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent />}
                    />
                    <Line
                      dataKey="mobile"
                      type="monotone"
                      stroke="var(--chart-2)"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      dataKey="desktop"
                      type="monotone"
                      stroke="oklch(0.626 0.153 162.48)"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
