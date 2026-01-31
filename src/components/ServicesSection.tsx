import { Sparkles, Scissors, Heart, Palette } from "lucide-react";

const services = [
  {
    icon: Sparkles,
    title: "Bridal Makeup",
    description:
      "Complete bridal transformation with premium products. We make your special day unforgettable.",
  },
  {
    icon: Scissors,
    title: "Hair Styling",
    description:
      "From elegant updos to trendy cuts. Expert styling for every occasion and hair type.",
  },
  {
    icon: Heart,
    title: "Skincare & Facials",
    description:
      "Rejuvenating treatments for glowing, healthy skin. Customized facials for all skin types.",
  },
  {
    icon: Palette,
    title: "Mehndi Art",
    description:
      "Intricate and beautiful henna designs. Traditional and modern patterns for all celebrations.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-primary font-medium mb-4 tracking-widest uppercase">
            What We Offer
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
            Our Services
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 bg-card rounded-lg border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <service.icon className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-4">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
