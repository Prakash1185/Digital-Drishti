"use client";

import React from "react";
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
import { Shield, Eye, Lock, Database, Globe, UserCheck } from "lucide-react";

const PrivacyPage = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className=" sticky top-0 z-10 flex h-14 sm:h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-4" />
            <ShowBreadCrumb />
          </div>
        </header>
        <ScrollArea className="flex-1">
          <main className="container mx-auto p-6 space-y-8">
            <div className="flex items-center gap-3">
              
              <div>
                <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Privacy Policy</h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                  How we protect and handle your data
                </p>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>What We Collect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <Eye className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Usage Analytics</p>
                      <p className="text-muted-foreground">
                        How you interact with features, time spent in app, and
                        feature usage patterns to improve user experience
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Lock className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Digital Wellness Data</p>
                      <p className="text-muted-foreground">
                        Your habits, goals, progress tracking, and preferences
                        to provide personalized insights and recommendations
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Device Information</p>
                      <p className="text-muted-foreground">
                        Basic device type, operating system, and app version to
                        ensure compatibility and security
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <UserCheck className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Account Information</p>
                      <p className="text-muted-foreground">
                        Email address, name, and profile picture for account
                        management and personalization
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How We Use Your Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground">
                    Provide personalized digital wellness insights and
                    recommendations
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground">
                    Improve app functionality and user experience
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground">
                    Generate AI-powered behavioral analysis and suggestions
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground">
                    Ensure account security and prevent unauthorized access
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Protection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <Database className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Secure Storage</p>
                      <p className="text-muted-foreground">
                        All data is encrypted in transit and at rest using
                        industry-standard encryption
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Access Control</p>
                      <p className="text-muted-foreground">
                        Limited access to your data only by authorized personnel
                        for legitimate purposes
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">No Third-Party Sharing</p>
                      <p className="text-muted-foreground">
                        We never sell, rent, or share your personal data with
                        third parties without your consent
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Rights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground">
                    <strong>Access:</strong> Request a copy of your personal
                    data
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground">
                    <strong>Correction:</strong> Update or correct your
                    information
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground">
                    <strong>Deletion:</strong> Request deletion of your account
                    and data
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground">
                    <strong>Portability:</strong> Export your data in a
                    machine-readable format
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact & Updates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm">
                  <p className="text-muted-foreground mb-4">
                    If you have questions about this privacy policy or want to
                    exercise your rights, contact us at:
                  </p>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="font-medium text-green-800">
                      example@example.com
                    </p>
                  </div>
                </div>
                <div className="text-sm">
                  <p className="text-muted-foreground">
                    We may update this privacy policy occasionally. We'll notify
                    you of significant changes through the app or email.
                  </p>
                </div>
                <div className="text-xs text-muted-foreground">
                  Last updated: August 23, 2025
                </div>
              </CardContent>
            </Card>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Your privacy is our priority.</strong> We're committed
                to being transparent about our data practices and protecting
                your information.
              </p>
            </div>
          </main>
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default PrivacyPage;
