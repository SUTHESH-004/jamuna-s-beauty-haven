import { Instagram, Play, Sparkles } from "lucide-react";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";
import portfolio7 from "@/assets/portfolio-7.jpg";
import portfolio8 from "@/assets/portfolio-8.jpg";
import bridalmakeupportfolio from "@/assets/bridalMakeup.jpeg";
import mehendiartportfolio from "@/assets/mehandiportfolio.jpeg";
import receptionMakeupPortfolio from "@/assets/receptionportfolio.jpeg";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const services = [
  {
    image: bridalmakeupportfolio,
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
    image: mehendiartportfolio,
    title: "Mehndi Art",
    description: "Intricate and beautiful henna designs for all celebrations.",
  },
  {
    image: portfolio5,
    title: " Manicure and Pedicure ",
    description: "Stunning nail designs and premium manicure services.",
  },
  {
    image: portfolio6,
    title: "Eyebrow Shaping",
    description: "Perfect eyebrow threading and shaping for defined looks.",
  },
  {
    image: receptionMakeupPortfolio,
    title: "Reception Makeup",
    description: "Glamorous looks for special occasions and events.",
  },
  {
    image: portfolio8,
    title: "HairCare & Lice Treatment",
    description: "Maintain long and healthy hair",
  },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <div
      ref={ref}
      className={`group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <a
        href="https://www.instagram.com/sris_parlour?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
        target="_blank"
        rel="noopener noreferrer"
        className="block relative overflow-hidden rounded-lg aspect-[3/4] mb-4 shadow-lg hover:shadow-xl transition-shadow"
      >
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient overlay always visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />

        {/* Floating Instagram Overlay */}
        <div className="absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[2px]">
          <div className="flex flex-col items-center gap-3 text-primary-foreground transform group-hover:scale-100 scale-90 transition-transform duration-300">
            <div className="w-16 h-16 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center border-2 border-primary-foreground/50 animate-pulse">
              <Play className="w-8 h-8 fill-current" />
            </div>
            <div className="flex items-center gap-2 bg-primary-foreground/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Instagram className="w-5 h-5" />
              <span className="font-medium text-sm">Watch on Instagram</span>
            </div>
          </div>
        </div>

        {/* Service title overlay on bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 transform group-hover:translate-y-full transition-transform duration-300">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
            <span className="text-primary-foreground font-medium text-sm">{service.title}</span>
          </div>
        </div>
      </a>
      <h3 className="font-serif text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
        {service.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {service.description}
      </p>
    </div>
  );
};

const ServicesGallery = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  return (
    <section id="services" className="py-32 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-40 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-0 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative">
        <div
          ref={headerRef}
          className={`text-center mb-20 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <p className="text-primary font-medium mb-4 tracking-widest uppercase flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            Our Expertise
            <Sparkles className="w-4 h-4" />
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
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGallery;
