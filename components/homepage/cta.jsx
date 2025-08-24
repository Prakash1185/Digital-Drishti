import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your
            <span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
              {" "}
              Digital Life?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Join thousands of users who have already improved their digital
            wellness. Start your journey today.
          </p>
          <Button
            size="lg"
            className="h-14 px-8 bg-gradient-to-r from-primary to-emerald-500 hover:from-primary hover:to-primary text-lg font-semibold group"
          >
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
