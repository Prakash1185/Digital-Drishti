import React from "react";
import { Brain, Shield, Eye, Heart } from "lucide-react";

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
    <section id="about" className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/20">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 lg:mb-20">
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
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 lg:p-8 rounded-2xl bg-background/60 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
