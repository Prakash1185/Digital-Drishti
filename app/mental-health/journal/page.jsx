"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
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
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Calendar as CalendarIcon,
  Heart,
  Brain,
  Smile,
  Meh,
  Frown,
  MoreVertical,
  Edit3,
  Trash2,
  Save,
  Search,
  BookOpen,
  Tag,
  Star,
  Eye,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react";
import {
  format,
  isToday,
  isYesterday,
  parseISO,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
} from "date-fns";
import { cn } from "@/lib/utils";

const JournalPage = () => {
  const [entries, setEntries] = useState([
    {
      id: 1,
      date: "2024-08-23",
      title: "A Productive Friday",
      content:
        "Today was amazing! I completed my React project and felt really accomplished. The sunset was beautiful, and I took a moment to appreciate the little things. Feeling grateful for the progress I'm making in my development journey.",
      mood: "happy",
      tags: ["productivity", "gratitude", "coding"],
      highlights: [
        "Completed React project",
        "Beautiful sunset",
        "Felt grateful",
      ],
      createdAt: new Date().toISOString(),
      wordCount: 89,
    },
    {
      id: 2,
      date: "2024-08-22",
      title: "Rainy Day Reflections",
      content:
        "It's been a quiet, contemplative day. The rain outside made me want to stay in and reflect on recent changes in my life. Sometimes we need these slower days to process everything that's happening around us.",
      mood: "calm",
      tags: ["reflection", "quiet"],
      highlights: ["Peaceful day", "Good reflection time"],
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      wordCount: 67,
    },
  ]);

  const [currentEntry, setCurrentEntry] = useState({
    title: "",
    content: "",
    mood: "",
    tags: [],
    highlights: [""],
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isWriting, setIsWriting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("today");
  const [weekOffset, setWeekOffset] = useState(0);

  const moods = [
    { value: "happy", label: "Happy", icon: Smile, color: "text-green-600" },
    { value: "calm", label: "Calm", icon: Meh, color: "text-blue-600" },
    { value: "sad", label: "Sad", icon: Frown, color: "text-gray-600" },
    { value: "excited", label: "Excited", icon: Zap, color: "text-yellow-600" },
    { value: "anxious", label: "Anxious", icon: Brain, color: "text-red-600" },
  ];

  const commonTags = [
    "gratitude",
    "productivity",
    "reflection",
    "goals",
    "health",
    "family",
    "friends",
    "work",
    "learning",
    "creativity",
    "exercise",
    "meditation",
  ];

  // Get current week entries
  const getCurrentWeek = () => {
    const today = new Date();
    const weekStart = startOfWeek(
      new Date(today.getTime() + weekOffset * 7 * 24 * 60 * 60 * 1000),
      { weekStartsOn: 1 }
    );
    const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
    return eachDayOfInterval({ start: weekStart, end: weekEnd });
  };

  const getEntryForDate = (date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return entries.find((entry) => entry.date === dateStr);
  };

  const getTodayEntry = () => {
    const today = format(new Date(), "yyyy-MM-dd");
    return entries.find((entry) => entry.date === today);
  };

  const saveEntry = () => {
    if (!currentEntry.content.trim()) return;

    const dateStr = format(selectedDate, "yyyy-MM-dd");
    const wordCount = currentEntry.content.trim().split(/\s+/).length;

    const entry = {
      id: Date.now(),
      date: dateStr,
      title:
        currentEntry.title ||
        `Journal Entry - ${format(selectedDate, "MMM dd")}`,
      content: currentEntry.content,
      mood: currentEntry.mood,
      tags: currentEntry.tags.filter((tag) => tag.trim()),
      highlights: currentEntry.highlights.filter((h) => h.trim()),
      createdAt: new Date().toISOString(),
      wordCount,
    };

    // Check if entry exists for this date
    const existingIndex = entries.findIndex((e) => e.date === dateStr);
    if (existingIndex >= 0) {
      const updatedEntries = [...entries];
      updatedEntries[existingIndex] = {
        ...entry,
        id: entries[existingIndex].id,
      };
      setEntries(updatedEntries);
    } else {
      setEntries([entry, ...entries]);
    }

    setCurrentEntry({
      title: "",
      content: "",
      mood: "",
      tags: [],
      highlights: [""],
    });
    setIsWriting(false);
  };

  const deleteEntry = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const editEntry = (entry) => {
    setCurrentEntry({
      ...entry,
      tags: entry.tags || [],
      highlights: entry.highlights || [""],
    });
    setSelectedDate(parseISO(entry.date));
    setIsWriting(true);
  };

  const addHighlight = () => {
    setCurrentEntry({
      ...currentEntry,
      highlights: [...currentEntry.highlights, ""],
    });
  };

  const updateHighlight = (index, value) => {
    const newHighlights = [...currentEntry.highlights];
    newHighlights[index] = value;
    setCurrentEntry({
      ...currentEntry,
      highlights: newHighlights,
    });
  };

  const removeHighlight = (index) => {
    setCurrentEntry({
      ...currentEntry,
      highlights: currentEntry.highlights.filter((_, i) => i !== index),
    });
  };

  const addTag = (tag) => {
    if (!currentEntry.tags.includes(tag)) {
      setCurrentEntry({
        ...currentEntry,
        tags: [...currentEntry.tags, tag],
      });
    }
  };

  const removeTag = (tagToRemove) => {
    setCurrentEntry({
      ...currentEntry,
      tags: currentEntry.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesSearch;
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
          <div className="container mx-auto p-6 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Daily Journal</h1>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Capture your thoughts and reflect on your journey
                </p>
              </div>

              <Button
                onClick={() => {
                  setSelectedDate(new Date());
                  setIsWriting(true);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                New Entry
              </Button>
            </div>

            {/* Tabs */}
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="week">This Week</TabsTrigger>
                <TabsTrigger value="all">All Entries</TabsTrigger>
              </TabsList>

              <TabsContent value="today" className="mt-6">
                <div className="space-y-6">
                  {getTodayEntry() ? (
                    <EntryCard
                      entry={getTodayEntry()}
                      onEdit={editEntry}
                      onDelete={deleteEntry}
                      moods={moods}
                    />
                  ) : (
                    <div className="text-center py-16 border-2 border-dashed border-muted-foreground/25 rounded-lg">
                      <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        No entry today
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Start writing your thoughts for today
                      </p>
                      <Button
                        onClick={() => {
                          setSelectedDate(new Date());
                          setIsWriting(true);
                        }}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Write Today's Entry
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="week" className="mt-6">
                <div className="space-y-6">
                  {/* Week Navigation */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Weekly Overview</h3>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setWeekOffset(weekOffset + 1)}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-sm font-medium px-3">
                        {format(getCurrentWeek()[0], "MMM dd")} -{" "}
                        {format(getCurrentWeek()[6], "MMM dd")}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setWeekOffset(weekOffset - 1)}
                        disabled={weekOffset <= 0}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Week Calendar */}
                  <div className="grid grid-cols-7 gap-4">
                    {getCurrentWeek().map((day) => {
                      const entry = getEntryForDate(day);
                      const isCurrentDay = isToday(day);

                      return (
                        <div
                          key={day.toISOString()}
                          className={cn(
                            "p-4 rounded-lg border min-h-[120px] cursor-pointer transition-all hover:bg-muted/50",
                            isCurrentDay && "ring-2 ring-primary",
                            entry
                              ? "bg-muted border-primary/20"
                              : "border-dashed"
                          )}
                          onClick={() => {
                            setSelectedDate(day);
                            if (entry) {
                              editEntry(entry);
                            } else {
                              setIsWriting(true);
                            }
                          }}
                        >
                          <div className="text-center mb-3">
                            <div className="text-xs text-muted-foreground">
                              {format(day, "EEE")}
                            </div>
                            <div className="text-lg font-semibold">
                              {format(day, "dd")}
                            </div>
                          </div>
                          {entry ? (
                            <div className="space-y-2">
                              <div className="w-3 h-3 rounded-full bg-primary" />
                              <p className="text-xs text-muted-foreground line-clamp-3">
                                {entry.content}
                              </p>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center h-12">
                              <span className="text-xs text-muted-foreground">
                                No entry
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="all" className="mt-6">
                <div className="space-y-6">
                  {/* Search */}
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search entries..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-9"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Entries List */}
                  <div className="space-y-4">
                    {filteredEntries.length > 0 ? (
                      filteredEntries.map((entry) => (
                        <EntryCard
                          key={entry.id}
                          entry={entry}
                          onEdit={editEntry}
                          onDelete={deleteEntry}
                          moods={moods}
                        />
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                          No entries found
                        </h3>
                        <p className="text-muted-foreground">
                          Try adjusting your search criteria
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Writing Modal */}
            <Dialog open={isWriting} onOpenChange={setIsWriting}>
              <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Edit3 className="h-5 w-5" />
                    Journal Entry
                    <Badge variant="outline">
                      {format(selectedDate, "MMM dd, yyyy")}
                    </Badge>
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 overflow-y-auto max-h-[70vh] pr-2">
                  {/* Title */}
                  <Input
                    placeholder="Entry title (optional)"
                    value={currentEntry.title}
                    onChange={(e) =>
                      setCurrentEntry({
                        ...currentEntry,
                        title: e.target.value,
                      })
                    }
                  />

                  {/* Mood */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      How are you feeling?
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {moods.map((mood) => {
                        const Icon = mood.icon;
                        return (
                          <Button
                            key={mood.value}
                            variant={
                              currentEntry.mood === mood.value
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            onClick={() =>
                              setCurrentEntry({
                                ...currentEntry,
                                mood: mood.value,
                              })
                            }
                          >
                            <Icon className="h-4 w-4 mr-1" />
                            {mood.label}
                          </Button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      What's on your mind?
                    </label>
                    <Textarea
                      placeholder="Write your thoughts, experiences, reflections..."
                      value={currentEntry.content}
                      onChange={(e) =>
                        setCurrentEntry({
                          ...currentEntry,
                          content: e.target.value,
                        })
                      }
                      rows={10}
                      className="resize-none"
                    />
                    <div className="text-xs text-muted-foreground text-right">
                      {
                        currentEntry.content
                          .trim()
                          .split(/\s+/)
                          .filter((word) => word).length
                      }{" "}
                      words
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">
                        Today's Highlights
                      </label>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={addHighlight}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add
                      </Button>
                    </div>
                    {currentEntry.highlights.map((highlight, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          placeholder="Something good that happened..."
                          value={highlight}
                          onChange={(e) =>
                            updateHighlight(index, e.target.value)
                          }
                        />
                        {currentEntry.highlights.length > 1 && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeHighlight(index)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tags</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {currentEntry.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="cursor-pointer"
                          onClick={() => removeTag(tag)}
                        >
                          {tag} ×
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {commonTags
                        .filter((tag) => !currentEntry.tags.includes(tag))
                        .map((tag) => (
                          <Button
                            key={tag}
                            size="sm"
                            variant="outline"
                            onClick={() => addTag(tag)}
                            className="text-xs"
                          >
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </Button>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button variant="outline" onClick={() => setIsWriting(false)}>
                    Cancel
                  </Button>
                  <Button onClick={saveEntry}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Entry
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

// Entry Card Component
const EntryCard = ({ entry, onEdit, onDelete, moods }) => {
  const mood = moods.find((m) => m.value === entry.mood);
  const MoodIcon = mood?.icon || Heart;

  const getDateLabel = (dateStr) => {
    const date = parseISO(dateStr);
    if (isToday(date)) return "Today";
    if (isYesterday(date)) return "Yesterday";
    return format(date, "MMM dd, yyyy");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-lg border bg-card hover:shadow-sm transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold">{entry.title}</h3>
            <Badge variant="outline">{getDateLabel(entry.date)}</Badge>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {mood && (
              <div className="flex items-center gap-1">
                <MoodIcon className={cn("h-4 w-4", mood.color)} />
                <span>{mood.label}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{entry.wordCount} words</span>
            </div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onEdit(entry)}>
              <Edit3 className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(entry.id)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <p className="text-sm leading-relaxed mb-4">{entry.content}</p>

      {entry.highlights && entry.highlights.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
            <Star className="h-3 w-3" />
            Highlights
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {entry.highlights.slice(0, 3).map((highlight, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-current mt-2 flex-shrink-0" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      )}

      {entry.tags && entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {entry.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {entry.tags.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{entry.tags.length - 4} more
            </Badge>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default JournalPage;
