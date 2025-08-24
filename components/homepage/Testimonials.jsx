import React from "react";
import { Star } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      avatar:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
      content:
        "Digital Drishti helped me reduce my screen time by 40% while staying productive.",
    },
    {
      name: "Marcus Johnson",
      role: "Software Engineer",
      avatar:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
      content:
        "The AI insights are incredibly accurate. I finally understand my digital patterns.",
    },
    {
      name: "Emily Rodriguez",
      role: "Designer",
      avatar:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
      content:
        "My sleep quality improved dramatically after using Digital Drishti for just two weeks.",
    },
  ];

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-muted/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Hear From Our Regular
            <span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
              {" "}
              Users
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-background rounded-2xl p-6 shadow-sm border border-border/50"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={testimonial.avatar}
                    alt={testimonial.name}
                  />
                </Avatar>
                <div>
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
