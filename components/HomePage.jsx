import React from "react";
import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Navbar from "./homepage/navbar";
// import HeroSection from "./homepage/HeroSection";
import HeroShowcase from "./homepage/HeroSection";
import TextMarquee from "./homepage/textMarquee";
import VideoSection from "./homepage/videoSection";
import About from "./homepage/about";
import Testimonials from "./homepage/Testimonials";
import CTA from "./homepage/cta";
import Footer from "./homepage/footer";

const HomePage = () => {
  return (
   <main>
    <Navbar/>
    <HeroShowcase/>
    <TextMarquee/>
    <VideoSection/>
    <About/>
    <Testimonials/>
    <CTA/>
    <Footer/>
   </main>
  );
};

export default HomePage;
