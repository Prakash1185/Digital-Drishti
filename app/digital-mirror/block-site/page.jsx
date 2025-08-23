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
import {
  Card,
  CardContent,
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
  Shield,
  Plus,
  Trash2,
  X,
  Ban,
  EyeOff,
} from "lucide-react";
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
      url: newSite.url.trim().toLowerCase().replace(/^https?:\/\//, ""),
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
        <header className=" z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-2 px-6">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <ShowBreadCrumb />
          </div>
          <div className="ml-auto flex items-center gap-3 px-6">
            <Button onClick={() => setIsAdding(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Block Site
            </Button>
          </div>
        </header>

        <ScrollArea className="flex-1">
          <main className="container mx-auto p-6 space-y-8">
            {/* Page Title */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
              
                <div>
                  <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Block Sites</h1>
                  <p className="text-sm text-muted-foreground md:text-base">
                    Manage your blocked websites for better digital focus
                  </p>
                </div>
              </div>
            </div>

            {/* Add New Site Form */}
            {isAdding && (
              <Card className="">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="h-5 w-5 text-red-600" />
                      Add New Blocked Site
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsAdding(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="url">Website URL</Label>
                      <Input
                        id="url"
                        placeholder="e.g., facebook.com, youtube.com"
                        value={newSite.url}
                        onChange={(e) =>
                          setNewSite({ ...newSite, url: e.target.value })
                        }
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={newSite.category}
                        onValueChange={(value) =>
                          setNewSite({ ...newSite, category: value })
                        }
                      >
                        <SelectTrigger className="bg-white">
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
                  <div className="flex gap-2">
                    <Button onClick={addSite} className="bg-red-600 hover:bg-red-700 text-gray-100">
                      <Shield className="h-4 w-4 mr-2" />
                      Block Site
                    </Button>
                    <Button variant="outline" onClick={() => setIsAdding(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Blocked Sites List */}
            <section className="space-y-6">
             

              {blockedSites.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      No blocked sites yet
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Start by adding websites you want to block
                    </p>
                    <Button onClick={() => setIsAdding(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Site
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {blockedSites.map((site) => (
                    <Card
                      key={site.id}
                      className={cn(
                        "transition-all duration-200 hover:shadow-md h-20 justify-center",
                        site.isActive
                          ? " "
                          : ""
                      )}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div
                              className={cn(
                                "w-12 h-12 rounded-xl flex items-center justify-center",
                                site.isActive
                                  ? "bg-red-100 text-red-600"
                                  : "bg-gray-100 text-gray-600"
                              )}
                            >
                              {site.isActive ? (
                                <Ban className="h-6 w-6" />
                              ) : (
                                <EyeOff className="h-6 w-6" />
                              )}
                            </div>

                            <div>
                              <div className="flex items-center gap-3 mb-1">
                                <h3 className="text-lg font-semibold">{site.url}</h3>
                                <Badge
                                  variant={site.isActive ? "destructive" : "secondary"}
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

                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleSite(site.id)}
                              className={cn(
                                site.isActive
                                  ? "border-red-300 text-red-700 hover:bg-red-50"
                                  : "border-green-300 text-green-700 hover:bg-green-50"
                              )}
                            >
                              {site.isActive ? "Disable" : "Enable"}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeSite(site.id)}
                              className="text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
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