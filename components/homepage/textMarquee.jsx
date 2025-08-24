"use client";

import React, { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { wrap } from "@popmotion/popcorn";

function ParallaxText({ children, baseVelocity = 100, className = "" }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="parallax overflow-hidden whitespace-nowrap flex">
      <motion.div
        className={`font-display font-semibold  tracking-[-0.02em] flex whitespace-nowrap flex-none ${className}`}
        style={{ x }}
      >
        <span className="block mr-8">{children} </span>
        <span className="block mr-8">{children} </span>
        <span className="block mr-8">{children} </span>
        <span className="block mr-8">{children} </span>
      </motion.div>
    </div>
  );
}

const TextMarquee = () => {
  return (
    <section className="py-10  bg-gradient-to-br from-background via-muted/20 to-background overflow-hidden">
      <div className="space-y-3">
        {/* First Row */}
        <ParallaxText
          baseVelocity={-2}
          className="text-4xl sm:text-5xl md:text-6xl  text-foreground/80"
        >
          Transform Your Digital Habits
        </ParallaxText>

        {/* Second Row */}
        <ParallaxText
          baseVelocity={2}
          className="text-4xl sm:text-5xl md:text-6xl  bg-gradient-to-r from-primary via-emerald-500 to-primary bg-clip-text text-transparent"
        >
          AI-Powered Wellness Insights
        </ParallaxText>

      

      </div>
    </section>
  );
};

export default TextMarquee;
