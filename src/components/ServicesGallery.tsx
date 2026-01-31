import { Instagram } from "lucide-react";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";

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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div key={index} className="group">
              <div className="relative overflow-hidden rounded-lg aspect-[3/4] mb-4">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                {service.description}
              </p>
              <a
                href="https://instagram.com/sris.beauty"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
              >
                <Instagram className="w-4 h-4" />
                Click to see on Instagram
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGallery;
