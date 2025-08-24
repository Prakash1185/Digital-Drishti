"use client";

import React from "react";
import { Brain, Shield, Eye, Heart } from "lucide-react";
import { motion } from "framer-motion";

const fade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

const About = () => {
  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI-Powered Insights",
      description:
        "Intelligent analysis of your digital patterns for personalized wellness recommendations.",
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Real-Time Awareness",
      description:
        "Instant feedback on your digital habits to help you make mindful choices.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Privacy First",
      description:
        "Your data stays secure and private. Complete control over your digital wellness journey.",
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Holistic Wellness",
      description:
        "Focus on mental clarity, better sleep, and healthier digital relationships.",
    },
  ];

  return (
    <section
      id="about"
      className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/20"
    >
      <div className="container px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Header */}
          <motion.div
            className="text-center mb-16 lg:mb-20"
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Mindful Technology for
              <span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
                {" "}
                Better Living
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Digital Drishti helps you build a healthier relationship with
              technology through intelligent insights, gentle reminders, and
              personalized wellness coaching.
            </p>
          </motion.div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {features.map((f, i) => (
              <motion.div
                key={i}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
                className="group p-6 lg:p-8 rounded-2xl bg-background/60 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-colors duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300">
                    {f.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{f.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {f.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
