import React from "react";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "../mode-toggle";

const Navbar = () => {
  return (
    <nav className="flex justify-center">
      <div className="bg-background/80 backdrop-blur-md border border-border rounded-lg px-6 py-3 shadow-lg flex">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Eye className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg">Digital Drishti</span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <a
              href="#home"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              About
            </a>
            <a
              href="#testimonials"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Testimonials
            </a>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            <ModeToggle />
            <Button size="sm" className="">
              Login
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
