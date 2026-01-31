import { Instagram, Play } from "lucide-react";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";
import portfolio7 from "@/assets/portfolio-7.jpg";
import portfolio8 from "@/assets/portfolio-8.jpg";

const services = [
  {
    image: portfolio1,
    title: "Bridal Makeup",
    description: "Complete bridal transformation with premium products.",
  },
  {
    image: portfolio2,
    title: "Hair Styling",
    description: "From elegant updos to trendy cuts for every occasion.",
  },
  {
    image: portfolio3,
    title: "Skincare & Facials",
    description: "Rejuvenating treatments for glowing, healthy skin.",
  },
  {
    image: portfolio4,
    title: "Mehndi Art",
    description: "Intricate and beautiful henna designs for all celebrations.",
  },
  {
    image: portfolio5,
    title: "Nail Art",
    description: "Stunning nail designs and premium manicure services.",
  },
  {
    image: portfolio6,
    title: "Brow Shaping",
    description: "Perfect eyebrow threading and shaping for defined looks.",
  },
  {
    image: portfolio7,
    title: "Party Makeup",
    description: "Glamorous looks for special occasions and events.",
  },
  {
    image: portfolio8,
    title: "Waxing & Hair Removal",
    description: "Smooth, silky skin with professional waxing treatments.",
  },
];

const ServicesGallery = () => {
  return (
    <section id="services" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-primary font-medium mb-4 tracking-widest uppercase">
            Our Expertise
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Services & Portfolio
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A glimpse into our beautiful transformations. Each client tells a unique story.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div key={index} className="group">
              <a
                href="https://instagram.com/sris.beauty/reels"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative overflow-hidden rounded-lg aspect-[3/4] mb-4"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Floating Instagram Overlay */}
                <div className="absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3 text-primary-foreground">
                    <div className="w-16 h-16 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center border-2 border-primary-foreground/50">
                      <Play className="w-8 h-8 fill-current" />
                    </div>
                    <div className="flex items-center gap-2 bg-primary-foreground/20 backdrop-blur-sm px-4 py-2 rounded-full">
                      <Instagram className="w-5 h-5" />
                      <span className="font-medium text-sm">Watch on Instagram</span>
                    </div>
                  </div>
                </div>
              </a>
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGallery;
