"use client";

import React, { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import ShowBreadCrumb from "@/components/ShowBreadCrumb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Shield, Plus, Trash2, X, Ban, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

const BlockSitePage = () => {
  const [blockedSites, setBlockedSites] = useState([
    {
      id: 1,
      url: "facebook.com",
      category: "Social Media",
      isActive: true,
    },
    {
      id: 2,
      url: "youtube.com",
      category: "Entertainment",
      isActive: true,
    },
    {
      id: 3,
      url: "reddit.com",
      category: "Social Media",
      isActive: false,
    },
  ]);

  const [newSite, setNewSite] = useState({
    url: "",
    category: "",
  });
  const [isAdding, setIsAdding] = useState(false);

  const categories = [
    "Social Media",
    "Entertainment",
    "News",
    "Shopping",
    "Gaming",
    "Other",
  ];

  const addSite = () => {
    if (!newSite.url.trim()) return;

    const site = {
      id: Date.now(),
      url: newSite.url
        .trim()
        .toLowerCase()
        .replace(/^https?:\/\//, ""),
      category: newSite.category || "Other",
      isActive: true,
    };

    setBlockedSites([...blockedSites, site]);
    setNewSite({ url: "", category: "" });
    setIsAdding(false);
  };

  const removeSite = (id) => {
    setBlockedSites(blockedSites.filter((site) => site.id !== id));
  };

  const toggleSite = (id) => {
    setBlockedSites(
      blockedSites.map((site) =>
        site.id === id ? { ...site, isActive: !site.isActive } : site
      )
    );
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-14 sm:h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-2 px-3 sm:px-6">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <ShowBreadCrumb />
          </div>
          <div className="ml-auto flex items-center gap-2 sm:gap-3 px-3 sm:px-6">
            <Button
              onClick={() => setIsAdding(true)}
              size="sm"
              className="h-8 sm:h-9 px-2 sm:px-4 text-xs sm:text-sm"
            >
              <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Block Site</span>
              <span className="sm:hidden">Block</span>
            </Button>
          </div>
        </header>

        <ScrollArea className="flex-1">
          <main className="container mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8">
            {/* Page Title */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3">
                <div>
                  <h1 className="text-lg sm:text-xl font-semibold tracking-tight lg:text-2xl">
                    Block Sites
                  </h1>
                  <p className="text-xs sm:text-sm lg:text-base text-muted-foreground">
                    Manage your blocked websites for better digital focus
                  </p>
                </div>
              </div>
            </div>

            {/* Add New Site Form */}
            {isAdding && (
              <Card className="overflow-hidden">
                <CardHeader className="pb-4 sm:pb-6">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                      <Plus className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                      <span className="hidden sm:inline">
                        Add New Blocked Site
                      </span>
                      <span className="sm:hidden">Add Site</span>
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsAdding(false)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="url" className="text-xs sm:text-sm">
                        Website URL
                      </Label>
                      <Input
                        id="url"
                        placeholder="e.g., facebook.com"
                        value={newSite.url}
                        onChange={(e) =>
                          setNewSite({ ...newSite, url: e.target.value })
                        }
                        className="bg-white text-xs sm:text-sm h-9 sm:h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-xs sm:text-sm">
                        Category
                      </Label>
                      <Select
                        value={newSite.category}
                        onValueChange={(value) =>
                          setNewSite({ ...newSite, category: value })
                        }
                      >
                        <SelectTrigger className="bg-white h-9 sm:h-10 text-xs sm:text-sm">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      onClick={addSite}
                      className="bg-red-600 hover:bg-red-700 text-white h-9 sm:h-10 text-xs sm:text-sm"
                      size="sm"
                    >
                      <Shield className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      Block Site
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsAdding(false)}
                      size="sm"
                      className="h-9 sm:h-10 text-xs sm:text-sm"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Blocked Sites List */}
            <section className="space-y-4 sm:space-y-6">
              {blockedSites.length === 0 ? (
                <Card>
                  <CardContent className="p-8 sm:p-12 text-center">
                    <Shield className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
                    <h3 className="text-base sm:text-lg font-semibold mb-2">
                      No blocked sites yet
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                      Start by adding websites you want to block
                    </p>
                    <Button
                      onClick={() => setIsAdding(true)}
                      size="sm"
                      className="h-9 sm:h-10 text-xs sm:text-sm"
                    >
                      <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      Add First Site
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {blockedSites.map((site) => (
                    <Card
                      key={site.id}
                      className={cn(
                        "transition-all duration-200 hover:shadow-md h-40 justify-center md:h-24",
                        site.isActive ? "" : ""
                      )}
                    >
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          {/* Site Info */}
                          <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                            <div
                              className={cn(
                                "w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                                site.isActive
                                  ? "bg-red-100 text-red-600"
                                  : "bg-gray-100 text-gray-600"
                              )}
                            >
                              {site.isActive ? (
                                <Ban className="h-5 w-5 sm:h-6 sm:w-6" />
                              ) : (
                                <EyeOff className="h-5 w-5 sm:h-6 sm:w-6" />
                              )}
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-1">
                                <h3 className="text-base sm:text-lg font-semibold truncate">
                                  {site.url}
                                </h3>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <Badge
                                    variant={
                                      site.isActive
                                        ? "destructive"
                                        : "secondary"
                                    }
                                    className="text-xs"
                                  >
                                    {site.isActive ? "Active" : "Inactive"}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {site.category}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleSite(site.id)}
                              className={cn(
                                "h-8 sm:h-9 px-2 sm:px-3 text-xs sm:text-sm",
                                site.isActive
                                  ? "border-red-300 text-red-700 hover:bg-red-50"
                                  : "border-green-300 text-green-700 hover:bg-green-50"
                              )}
                            >
                              <span className="hidden sm:inline">
                                {site.isActive ? "Disable" : "Enable"}
                              </span>
                              <span className="sm:hidden">
                                {site.isActive ? "Off" : "On"}
                              </span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeSite(site.id)}
                              className="text-red-600 hover:bg-red-50 h-8 sm:h-9 px-2 sm:px-3"
                            >
                              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                              <span className="hidden sm:inline ml-1 sm:ml-2 text-xs sm:text-sm">
                                Delete
                              </span>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </section>
          </main>
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default BlockSitePage;
