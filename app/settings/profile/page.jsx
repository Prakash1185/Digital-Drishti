"use client";

import React, { useState, useRef } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import ShowBreadCrumb from "@/components/ShowBreadCrumb";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LogOut, Trash2, User } from "lucide-react";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "user@example.com",
  });
  const [avatar, setAvatar] = useState(null);
  const fileRef = useRef(null);
  const [saving, setSaving] = useState(false);

  const handleNameChange = (value) =>
    setProfile((p) => ({ ...p, name: value }));

  const handleAvatar = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatar(url);
  };

  const save = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      console.log("Profile saved:", { ...profile, avatar });
    }, 800);
  };

  const logout = () => {
    console.log("Logging out...");
    // Add logout logic here
  };

  const deleteAccount = () => {
    console.log("Deleting account...");
    // Add delete account logic here
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 sm:h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-2 px-4 sm:px-6">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-4" />
            <ShowBreadCrumb />
          </div>
        </header>
        <ScrollArea className="flex-1">
          <main className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8 max-w-4xl">
            {/* Header Section - Responsive */}
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  Profile
                </h1>
                <p className="text-sm text-muted-foreground sm:text-base">
                  Manage your account settings
                </p>
              </div>
            </div>

            {/* Profile Form - Responsive */}
            <form onSubmit={save} className="space-y-4 sm:space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  {/* Avatar and Form Fields - Responsive Layout */}
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                    {/* Avatar Section */}
                    <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                      <Avatar className="h-16 w-16 sm:h-20 sm:w-20 mx-auto sm:mx-0">
                        {avatar && <AvatarImage src={avatar} alt="Profile" />}
                        <AvatarFallback className="text-sm sm:text-base">
                          {profile.name
                            .split(" ")
                            .map((p) => p[0])
                            .slice(0, 2)
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-3 w-full sm:w-auto"
                        onClick={() => fileRef.current?.click()}
                      >
                        Change Photo
                      </Button>
                      <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        onChange={handleAvatar}
                        className="hidden"
                      />
                    </div>

                    {/* Form Fields */}
                    <div className="flex-1 space-y-3 sm:space-y-4 w-full">
                      <div className="space-y-2">
                        <Label className="text-sm sm:text-base">Name</Label>
                        <Input
                          value={profile.name}
                          onChange={(e) => handleNameChange(e.target.value)}
                          placeholder="Enter your name"
                          required
                          className="text-sm sm:text-base"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm sm:text-base">Email</Label>
                        <Input
                          type="email"
                          value={profile.email}
                          disabled
                          className="bg-muted text-muted-foreground cursor-not-allowed text-sm sm:text-base"
                        />
                        <p className="text-xs text-muted-foreground">
                          Email cannot be changed
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-start pt-2">
                    <Button 
                      type="submit" 
                      disabled={saving}
                      className="w-full sm:w-auto"
                    >
                      {saving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>

            {/* Account Actions - Responsive */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Account Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                {/* Logout Action */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-3 sm:p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-sm sm:text-base">Logout</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Sign out of your account
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={logout}
                    className="w-full sm:w-auto"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>

                {/* Delete Account Action */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-3 sm:p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-red-900 text-sm sm:text-base">
                      Delete Account
                    </h3>
                    <p className="text-xs sm:text-sm text-red-700">
                      Permanently delete your account and all data
                    </p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="destructive"
                        className="w-full sm:w-auto"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="w-[95vw] max-w-md mx-4 sm:mx-auto">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-base sm:text-lg">
                          Delete Account
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-sm sm:text-base">
                          This action cannot be undone. This will permanently
                          delete your account and remove all your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                        <AlertDialogCancel className="w-full sm:w-auto order-2 sm:order-1">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={deleteAccount}
                          className="w-full sm:w-auto bg-red-600 hover:bg-red-700 order-1 sm:order-2"
                        >
                          Delete Account
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          </main>
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ProfilePage;