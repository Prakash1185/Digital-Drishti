"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppSidebar } from "@/components/app-sidebar";
import ShowBreadCrumb from "@/components/ShowBreadCrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  Send,
  Bot,
  User,
  MessageCircle,
  Trash2,
  Copy,
  MoreVertical,
  Clock,
  Shield,
  Plus,
  History,
  Search,
} from "lucide-react";
import { format, isToday, isYesterday, formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

const AIChatPage = () => {
  const [currentChatId, setCurrentChatId] = useState(1);
  const [chats, setChats] = useState([
    {
      id: 1,
      title: "Feeling Overwhelmed",
      lastMessage: "Thank you for the advice, it really helped!",
      timestamp: new Date(),
      messageCount: 8,
    },
    {
      id: 2,
      title: "Work Stress Discussion",
      lastMessage: "I understand how challenging that must feel...",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      messageCount: 12,
    },
    {
      id: 3,
      title: "Anxiety Support",
      lastMessage: "Let's work together to find some strategies...",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      messageCount: 15,
    },
  ]);

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "assistant",
      content:
        "Hello! I'm here to listen and support you. How are you feeling today?",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
    },
    {
      id: 2,
      type: "user",
      content:
        "Hi, I've been feeling overwhelmed with work lately. Everything feels like too much.",
      timestamp: new Date(Date.now() - 4 * 60 * 1000),
    },
    {
      id: 3,
      type: "assistant",
      content:
        "I understand how challenging that can feel. It's completely normal to feel overwhelmed sometimes, especially when juggling multiple responsibilities. Would you like to talk about what specific aspects of work are contributing to these feelings?",
      timestamp: new Date(Date.now() - 3 * 60 * 1000),
      suggestions: [
        "It's the workload",
        "Deadline pressure",
        "Team dynamics",
        "Work-life balance",
      ],
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showChatHistory, setShowChatHistory] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = (userMessage) => {
    setIsTyping(true);

    setTimeout(() => {
      const responses = [
        {
          content:
            "I hear you, and those feelings are completely valid. It's important to acknowledge when we're struggling rather than pushing through without support. What do you think would help you feel more in control right now?",
          suggestions: [
            "Break tasks into smaller steps",
            "Set better boundaries",
            "Take regular breaks",
            "Talk to my manager",
          ],
        },
        {
          content:
            "Thank you for sharing that with me. It takes strength to recognize when we need support. From what you've described, it sounds like you're dealing with quite a lot. Have you been able to identify what feels most pressing?",
          suggestions: [
            "Focus on urgent tasks",
            "Delegate responsibilities",
            "Practice stress management",
            "Seek professional help",
          ],
        },
        {
          content:
            "That's a very common experience, and you're definitely not alone in feeling this way. Many people struggle with similar challenges. What strategies have you tried before, and what seemed to work or not work for you?",
          suggestions: [
            "Deep breathing helps",
            "Exercise usually works",
            "Talking helps me process",
            "Nothing has worked so far",
          ],
        },
      ];

      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];

      const newMessage = {
        id: Date.now(),
        type: "assistant",
        content: randomResponse.content,
        timestamp: new Date(),
        suggestions: randomResponse.suggestions,
      };

      setMessages((prev) => [...prev, newMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleSendMessage = (content = inputValue) => {
    if (!content.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Update current chat's last message
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === currentChatId
          ? { ...chat, lastMessage: content.trim(), timestamp: new Date() }
          : chat
      )
    );

    simulateAIResponse(content.trim());
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  const createNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: "New Conversation",
      lastMessage: "Hello! I'm here to listen and support you...",
      timestamp: new Date(),
      messageCount: 1,
    };

    setChats((prev) => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
    setMessages([
      {
        id: 1,
        type: "assistant",
        content:
          "Hello! I'm here to listen and support you. How are you feeling today?",
        timestamp: new Date(),
      },
    ]);
    setShowChatHistory(false);
  };

  const loadChat = (chatId) => {
    setCurrentChatId(chatId);
    // In a real app, you'd load messages from the selected chat
    setShowChatHistory(false);
  };

  const deleteChat = (chatId) => {
    setChats((prev) => prev.filter((chat) => chat.id !== chatId));
    if (chatId === currentChatId && chats.length > 1) {
      const remainingChats = chats.filter((chat) => chat.id !== chatId);
      setCurrentChatId(remainingChats[0].id);
    }
  };

  const copyMessage = (content) => {
    navigator.clipboard.writeText(content);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getTimeLabel = (date) => {
    if (isToday(date)) return format(date, "HH:mm");
    if (isYesterday(date)) return "Yesterday";
    return format(date, "MMM dd");
  };

  const filteredChats = chats.filter(
    (chat) =>
      chat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentChat = chats.find((chat) => chat.id === currentChatId);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Fixed Header */}
        <header className="sticky top-0 z-10 flex h-14 sm:h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-2 px-6">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <ShowBreadCrumb />
          </div>
        </header>

        {/* Chat Header */}
        <div className="flex h-16 shrink-0 items-center justify-between px-6 border-b bg-background">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
            </div>
            <div>
              <h1 className="font-semibold">AI Companion</h1>
              <p className="text-sm text-muted-foreground">
                Always here to help
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            

            <Dialog open={showChatHistory} onOpenChange={setShowChatHistory}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <History className="h-4 w-4 mr-2" />
                  History
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Chat History</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search conversations..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    <Button onClick={createNewChat} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <ScrollArea className="h-[400px]">
                    <div className="space-y-2">
                      {filteredChats.map((chat) => (
                        <div
                          key={chat.id}
                          className={cn(
                            "p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors",
                            chat.id === currentChatId &&
                              "bg-muted border-primary/20"
                          )}
                          onClick={() => loadChat(chat.id)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-sm truncate">
                                {chat.title}
                              </h3>
                              <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                                {chat.lastMessage}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs text-muted-foreground">
                                  {getTimeLabel(chat.timestamp)}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {chat.messageCount} messages
                                </span>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0"
                                >
                                  <MoreVertical className="h-3 w-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem
                                  onClick={() => deleteChat(chat.id)}
                                >
                                  <Trash2 className="mr-2 h-3 w-3" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </DialogContent>
            </Dialog>

            <Button onClick={createNewChat} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Chat
            </Button>
          </div>
        </div>

        {/* Chat Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Messages Area */}
          <ScrollArea className="flex-1 px-6">
            <div className="max-w-3xl mx-auto py-6 space-y-6">
              <AnimatePresence>
                {messages.map((message) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    onSuggestionClick={handleSuggestionClick}
                    onCopy={copyMessage}
                  />
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-muted rounded-2xl rounded-tl-sm p-4 max-w-xs">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t bg-background px-6 py-4">
            <div className="max-w-3xl mx-auto space-y-3">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Input
                    ref={inputRef}
                    placeholder="Type your message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pr-12 h-11 rounded-xl"
                    disabled={isTyping}
                  />
                  <Button
                    size="sm"
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim() || isTyping}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg p-0"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                AI responses are for support only. For serious concerns, consult
                a mental health professional.
              </p>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

// Refined Message Bubble Component
const MessageBubble = ({ message, onSuggestionClick, onCopy }) => {
  const isUser = message.type === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex gap-4", isUser ? "justify-end" : "justify-start")}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center flex-shrink-0">
          <Bot className="h-4 w-4 text-white" />
        </div>
      )}

      <div
        className={cn(
          "max-w-lg space-y-3",
          isUser ? "items-end" : "items-start"
        )}
      >
        <div
          className={cn(
            "rounded-2xl px-4 py-3 relative group",
            isUser
              ? "bg-primary text-primary-foreground rounded-br-sm"
              : "bg-muted rounded-tl-sm"
          )}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>

          {/* Copy button */}
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
            onClick={() => onCopy(message.content)}
          >
            <Copy className="h-3 w-3" />
          </Button>
        </div>

        {/* Suggestions */}
        {message.suggestions && !isUser && (
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {message.suggestions.map((suggestion, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => onSuggestionClick(suggestion)}
                  className="text-xs px-3 py-2 rounded-lg border bg-background hover:bg-muted transition-colors"
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        <div
          className={cn(
            "flex items-center gap-1 text-xs text-muted-foreground",
            isUser ? "justify-end" : "justify-start"
          )}
        >
          <Clock className="h-3 w-3" />
          <span>{format(message.timestamp, "HH:mm")}</span>
        </div>
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-500 to-slate-700 flex items-center justify-center flex-shrink-0">
          <User className="h-4 w-4 text-white" />
        </div>
      )}
    </motion.div>
  );
};

export default AIChatPage;
