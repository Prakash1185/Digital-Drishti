"use client";

import { MenuIcon, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ModeToggle } from "../mode-toggle";
import Link from "next/link";

const Navbar = () => {
  const features = [
    {
      title: "Digital Mirror",
      description: "Reflect on your digital habits",
      href: "#digital-mirror",
    },
    {
      title: "AI Insights",
      description: "Personalized wellness recommendations",
      href: "#ai-insights",
    },
    {
      title: "Habit Tracking",
      description: "Build healthier digital routines",
      href: "#habits",
    },
    {
      title: "Wellness Analytics",
      description: "Track your digital wellness journey",
      href: "#analytics",
    },
    {
      title: "Focus Sessions",
      description: "Enhance your concentration periods",
      href: "#focus",
    },
    {
      title: "Sleep Optimization",
      description: "Improve your digital sleep hygiene",
      href: "#sleep",
    },
  ];

  const solutions = [
    {
      title: "For Individuals",
      description: "Personal digital wellness tracking",
      href: "#individual",
    },
    {
      title: "For Teams",
      description: "Workplace digital wellness programs",
      href: "#teams",
    },
    {
      title: "For Organizations",
      description: "Enterprise-wide wellness solutions",
      href: "#enterprise",
    },
    {
      title: "For Educators",
      description: "Digital wellness in educational settings",
      href: "#education",
    },
  ];

  return (
    <section className="sticky top-0 z-50 border-b  bg-background backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4">
        <nav className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-emerald-500 text-primary-foreground">
              <Eye className="h-5 w-5" />
            </div>
            <span className="text-lg md:text-xl font-semibold tracking-tight bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
              Digital Drishti
            </span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[600px] grid-cols-2 p-3">
                    {features.map((feature, index) => (
                      <NavigationMenuLink
                        href={feature.href}
                        key={index}
                        className="rounded-md p-3 transition-colors hover:bg-muted/70"
                      >
                        <div>
                          <p className="mb-1 font-semibold text-foreground">
                            {feature.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* <NavigationMenuItem>
                <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[500px] grid-cols-2 p-3">
                    {solutions.map((solution, index) => (
                      <NavigationMenuLink
                        href={solution.href}
                        key={index}
                        className="rounded-md p-3 transition-colors hover:bg-muted/70"
                      >
                        <div>
                          <p className="mb-1 font-semibold text-foreground">
                            {solution.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {solution.description}
                          </p>
                        </div>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem> */}

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#about"
                  className={navigationMenuTriggerStyle()}
                >
                  About
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#testimonials"
                  className={navigationMenuTriggerStyle()}
                >
                  Testimonials
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#contact"
                  className={navigationMenuTriggerStyle()}
                >
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 lg:flex">
            {/* <ModeToggle /> */}
            <Link href={"/dashboard"} className="cursor-pointer"><Button variant="outline" size="sm">
              Dashboard
            </Button></Link>
            <Link href={"/login"} className="cursor-pointer"><Button variant="outline" size="sm">
              Sign in
            </Button></Link>
            <Button
              size="sm"
              className="bg-gradient-to-r from-primary to-emerald-500 hover:from-primary hover:to-primary"
            >
              Start Free
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* <ModeToggle /> */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <MenuIcon className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="max-h-screen overflow-auto">
                <SheetHeader>
                  <SheetTitle>
                    <a href="#home" className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-emerald-500 text-primary-foreground">
                        <Eye className="h-5 w-5" />
                      </div>
                      <span className="text-lg font-semibold tracking-tight">
                        Digital Drishti
                      </span>
                    </a>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col p-4">
                  <Accordion type="single" collapsible className="mb-4 mt-4">
                    <AccordionItem value="features" className="border-none">
                      <AccordionTrigger className="text-base hover:no-underline">
                        Features
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid gap-2">
                          {features.map((feature, index) => (
                            <a
                              href={feature.href}
                              key={index}
                              className="rounded-md p-3 transition-colors hover:bg-muted/70"
                            >
                              <div>
                                <p className="mb-1 font-semibold text-foreground">
                                  {feature.title}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {feature.description}
                                </p>
                              </div>
                            </a>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="solutions" className="border-none hidden">
                      <AccordionTrigger className="text-base hover:no-underline">
                        Solutions
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid gap-2">
                          {solutions.map((solution, index) => (
                            <a
                              href={solution.href}
                              key={index}
                              className="rounded-md p-3 transition-colors hover:bg-muted/70"
                            >
                              <div>
                                <p className="mb-1 font-semibold text-foreground">
                                  {solution.title}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {solution.description}
                                </p>
                              </div>
                            </a>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                  </Accordion>

                  <div className="flex flex-col gap-4">
                    <a href="#about" className="font-medium py-2">
                      About
                    </a>
                    <a href="#testimonials" className="font-medium py-2">
                      Testimonials
                    </a>
                    <a href="#contact" className="font-medium py-2">
                      Contact
                    </a>
                  </div>

                  <div className="mt-6 flex flex-col gap-3">
                    <Button variant="outline">Sign in</Button>
                    <Button className="bg-gradient-to-r from-primary to-emerald-500">
                      Start Free
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
