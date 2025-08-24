"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const fadeParent = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const imageReveal = {
  hidden: { opacity: 0, y: 32, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const VideoSection = () => {
  return (
    <motion.section
      className="pt-10 pb-10 md:py-24 bg-muted/30"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      variants={fadeParent}
    >
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-12">
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl lg:text-6xl font-bold"
          >
            Digital Wellness
            <span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
              {" "}
              Dashboard
            </span>
          </motion.h2>

          <motion.div
            variants={imageReveal}
            className="relative max-w-7xl mx-auto"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.25 }}
          >
            <Image
              src="/dashboard.png"
              alt="Digital Drishti Dashboard"
              width={1400}
              height={800}
              priority
              className="w-full h-auto rounded-lg shadow-2xl border border-primary/50"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default VideoSection;
