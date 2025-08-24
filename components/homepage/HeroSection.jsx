"use client";

import React from "react";
import { Star, ArrowRight, Brain, Shield, Eye } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const fadeParent = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const fastFade = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const HeroSection = ({
  heading = "Transform Your Digital Wellness with AI-Powered Insights",
  description = "Break free from mindless scrolling. Build intentional digital habits with personalized coaching, real-time behavioral analysis, and adaptive wellness recommendations tailored to your unique patterns.",
  primaryButton = { text: "Download Extension", url: "/" },
  secondaryButton = { text: "Explore Digital Drishti", url: "#explore" },
  reviews = {
    count: 1200,
    rating: 4.9,
    avatars: [
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
        alt: "Sarah M.",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
        alt: "James K.",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
        alt: "Maria L.",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
        alt: "David R.",
      },
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
        alt: "Emma T.",
      },
    ],
  },
  features = [
    { icon: <Brain className="h-4 w-4" />, text: "AI-Powered Insights" },
    { icon: <Shield className="h-4 w-4" />, text: "Privacy-First Design" },
    { icon: <Eye className="h-4 w-4" />, text: "Real-Time Analysis" },
  ],
}) => {
  return (
    <motion.section
      className="relative pb-10 pt-8 sm:py-16 sm:pt-12 lg:py-24 lg:pt-16 overflow-hidden"
      initial="hidden"
      animate="show"
      variants={fadeParent}
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-40 sm:opacity-50 lg:opacity-60">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(34,197,94,0.1) 1px,transparent 1px),
                linear-gradient(90deg,rgba(34,197,94,0.1) 1px,transparent 1px)
              `,
              backgroundSize: "20px 20px",
            }}
          />
          <div
            className="h-full w-full hidden sm:block"
            style={{
              backgroundImage: `
                linear-gradient(rgba(34,197,94,0.1) 1px,transparent 1px),
                linear-gradient(90deg,rgba(34,197,94,0.1) 1px,transparent 1px)
              `,
              backgroundSize: "30px 30px",
            }}
          />
          <div
            className="h-full w-full hidden lg:block"
            style={{
              backgroundImage: `
                linear-gradient(rgba(34,197,94,0.1) 1px,transparent 1px),
                linear-gradient(90deg,rgba(34,197,94,0.1) 1px,transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(34,197,94,0.05)_50%,transparent_100%)]" />
      </div>

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            variants={fastFade}
            className="mb-4 sm:mb-6 lg:mb-8 flex justify-center"
          >
            <Badge
              variant="outline"
              className="bg-background/80 backdrop-blur-sm border-primary/30 text-primary px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm"
            >
              <Eye className="h-3 w-3 mr-1.5 sm:mr-2" />
              <span className="hidden sm:inline">
                Transforming Digital Wellness with AI
              </span>
              <span className="sm:hidden">Digital Wellness AI</span>
            </Badge>
          </motion.div>

          {/* Heading + Description */}
          <div className="mx-auto max-w-2xl sm:max-w-4xl lg:max-w-5xl xl:max-w-6xl space-y-4 sm:space-y-6">
            <motion.h1
              variants={fadeUp}
              className="text-3xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl leading-tight sm:leading-tight"
            >
              {heading.split(" ").map((word, index) => (
                <span key={index}>
                  {word === "Digital" || word === "AI-Powered" ? (
                    <span className="bg-gradient-to-r from-primary via-emerald-500 to-primary bg-clip-text text-transparent">
                      {word}
                    </span>
                  ) : (
                    word
                  )}{" "}
                </span>
              ))}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-muted-foreground text-balance text-sm tracking-tighter sm:text-base lg:text-lg xl:text-xl max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto leading-relaxed px-2 sm:px-0"
            >
              {description}
            </motion.p>
          </div>

          {/* Features */}
          <motion.div
            className="mt-6 sm:mt-8 lg:mt-10 flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 px-2 sm:px-0"
            variants={fadeParent}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fastFade}
                whileHover={{ y: -4 }}
                className="flex items-center gap-1.5 sm:gap-2 rounded-md sm:rounded-lg border border-border/50 bg-background/60 backdrop-blur-sm px-2.5 sm:px-3 lg:px-4 py-1.5 sm:py-2 text-xs sm:text-sm"
              >
                <span className="text-primary flex-shrink-0">
                  {feature.icon}
                </span>
                <span className="font-medium whitespace-nowrap">
                  {feature.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            className="mt-8 sm:mt-10 lg:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0"
          >
            <Button
              asChild
              size="lg"
              className="h-10 sm:h-11 lg:h-12 px-6 sm:px-7 lg:px-8 bg-gradient-to-r from-primary to-emerald-500 hover:from-primary hover:to-primary group shadow-lg text-sm sm:text-base w-full sm:w-auto"
            >
              <a
                href={primaryButton.url}
                className="inline-flex items-center justify-center"
              >
                <span className="truncate">{primaryButton.text}</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 flex-shrink-0" />
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-10 sm:h-11 lg:h-12 px-6 sm:px-7 lg:px-8 bg-background/80 backdrop-blur-sm border-border/60 text-sm sm:text-base w-full sm:w-auto"
            >
              <a href={secondaryButton.url} className="truncate">
                {secondaryButton.text}
              </a>
            </Button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            variants={fadeUp}
            className="mx-auto mt-12 sm:mt-16 lg:mt-20 hidden w-fit flex-col items-center gap-4 lg:gap-6 lg:flex-row"
          >
            <div className="flex items-center -space-x-2 lg:-space-x-3">
              {reviews.avatars.map((avatar, index) => (
                <motion.div key={index} whileHover={{ scale: 1.12 }}>
                  <Avatar className="h-10 w-10 lg:h-12 lg:w-12 border-2 border-background shadow-md transition-transform">
                    <AvatarImage src={avatar.src} alt={avatar.alt} />
                  </Avatar>
                </motion.div>
              ))}
            </div>
            <div className="text-center lg:text-left">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className="h-3 w-3 lg:h-4 lg:w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="font-semibold text-xs lg:text-sm">
                  {reviews.rating} out of 5
                </span>
              </div>
              <p className="text-muted-foreground text-xs lg:text-sm font-medium mt-1">
                Trusted by {reviews.count}+ users improving their digital
                wellness
              </p>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeParent}
            className="mt-12 sm:mt-16 lg:mt-20 hidden grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 max-w-lg sm:max-w-2xl mx-auto"
          >
            {[
              { v: "85%", l: "Improved Focus Quality" },
              { v: "73%", l: "Better Sleep Patterns" },
              { v: "2.5hrs", l: "Average Daily Time Saved" },
            ].map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
                  {s.v}
                </div>
                <div className="text-xs lg:text-sm text-muted-foreground mt-1">
                  {s.l}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
