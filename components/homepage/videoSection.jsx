import React from "react";
import Image from "next/image";

const VideoSection = () => {
  return (
    <section className="pt-10 pb-10 md:py-24 bg-muted/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-12">
          {/* Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold ">
            Digital Wellness
            <span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
              {" "}
              Dashboard
            </span>
          </h2>

          {/* Image */}
          <div className="relative max-w-7xl mx-auto ">
            <Image
              src="/dashboard.png"
              alt="Digital Drishti Dashboard"
              width={1400}
              height={800}
              className="w-full h-auto rounded-lg shadow-2xl border border-primary/50"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
