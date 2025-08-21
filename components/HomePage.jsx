import React from "react";
import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const HomePage = () => {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40">
        <img
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/square-alt-grid.svg"
          alt="background pattern"
          className="[mask-image:radial-gradient(80%_80%_at_center,white,transparent)]"
        />
      </div>

      <div className="relative z-10 container mx-auto">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          {/* Logo Section */}
          <div className="mb-8 rounded-2xl bg-background/40 p-5 shadow-lg backdrop-blur-md border">
            <div className="flex items-center gap-2">
              <Zap className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold font-poppins">
                Digital Drishti
              </span>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight font-poppins lg:text-6xl">
              Transform Your{" "}
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Productivity
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg text-muted-foreground font-inter lg:text-xl">
              Plan smarter, work faster, achieve more. Your intelligent
              workspace for seamless task management and goal tracking.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="font-dm-sans group shadow-lg">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg" className="font-dm-sans">
              Watch Demo
            </Button>
          </div>

          {/* Technology Stack */}
          <div className="mt-20 space-y-4">
            <p className="text-sm font-medium text-muted-foreground font-inter">
              Built with modern technologies
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-lg border bg-background/50 backdrop-blur-sm transition-all hover:bg-background/80"
                )}
              >
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/react-icon.svg"
                  alt="React"
                  className="h-5 w-5 opacity-70 transition-opacity hover:opacity-100"
                />
              </div>
              <div
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-lg border bg-background/50 backdrop-blur-sm transition-all hover:bg-background/80"
                )}
              >
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/typescript-icon.svg"
                  alt="TypeScript"
                  className="h-5 w-5 opacity-70 transition-opacity hover:opacity-100"
                />
              </div>
              <div
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-lg border bg-background/50 backdrop-blur-sm transition-all hover:bg-background/80"
                )}
              >
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/tailwind-icon.svg"
                  alt="Tailwind CSS"
                  className="h-5 w-5 opacity-70 transition-opacity hover:opacity-100"
                />
              </div>
              <div
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-lg border bg-background/50 backdrop-blur-sm transition-all hover:bg-background/80"
                )}
              >
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcn-ui-icon.svg"
                  alt="shadcn/ui"
                  className="h-5 w-5 opacity-70 transition-opacity hover:opacity-100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
