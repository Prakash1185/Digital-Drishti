import React from "react";
import { Eye, Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-muted/20">
      <div className="container px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-primary to-emerald-500 text-primary-foreground">
                <Eye className="h-5 w-5" />
              </div>
              <span className="text-lg font-semibold">Digital Drishti</span>
            </div>
            <p className="text-muted-foreground max-w-md">
              Transform your digital habits with AI-powered insights for better
              wellness and productivity.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="#features"
                  className="hover:text-foreground transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="hover:text-foreground transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#download"
                  className="hover:text-foreground transition-colors"
                >
                  Download
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-2 rounded-md bg-muted hover:bg-muted/80 transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-md bg-muted hover:bg-muted/80 transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-md bg-muted hover:bg-muted/80 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Digital Drishti. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
