import {
  MessageCircle,
  Mail,
  Instagram,
  MapPin,
  Phone,
  ArrowRight,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useRef, useState, useEffect } from "react";

const contactMethods = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Quick responses, easy booking",
    href: "https://wa.me/919790674312",
    external: true,
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "For detailed inquiries",
    href: "mailto:srisparlour1223@gmail.com",
    external: false,
  },
  {
    icon: Instagram,
    title: "Instagram",
    description: "Follow our latest work",
    href: "https://www.instagram.com/sris_parlour/",
    external: true,
  },
];

const ContactCard = ({
  method,
  index,
}: {
  method: (typeof contactMethods)[0];
  index: number;
}) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const Icon = method.icon;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 },
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <a
      ref={ref}
      href={method.href}
      target={method.external ? "_blank" : undefined}
      rel={method.external ? "noopener noreferrer" : undefined}
      className={`group p-8 bg-card rounded-lg border border-border hover:border-primary/50 transition-all duration-500 text-center hover:shadow-xl hover:-translate-y-2 relative overflow-hidden ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10">
        <div className="w-16 h-16 rounded-full bg-accent mx-auto flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
          <Icon className="w-8 h-8 text-accent-foreground group-hover:text-primary transition-colors" />
        </div>
        <h3 className="font-serif text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {method.title}
        </h3>
        <p className="text-muted-foreground mb-4">{method.description}</p>
        <div className="flex items-center justify-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
          <span className="text-sm font-medium">Connect</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </a>
  );
};

const ContactSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: infoRef, isVisible: infoVisible } = useScrollAnimation();

  return (
    <section
      id="contact"
      className="py-32 bg-background relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative">
        <div
          ref={headerRef}
          className={`text-center mb-20 transition-all duration-700 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <p className="text-primary font-medium mb-4 tracking-widest uppercase">
            Get in Touch
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Book Your Appointment
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ready to look your best? Reach out to us through your preferred
            channel. We're here to make you beautiful.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          {contactMethods.map((method, index) => (
            <ContactCard key={method.title} method={method} index={index} />
          ))}
        </div>

        {/* Additional Info with animations */}
        <div
          ref={infoRef}
          className={`max-w-2xl mx-auto text-center space-y-6 transition-all duration-700 ${infoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="flex items-center justify-center gap-3 text-muted-foreground group cursor-pointer hover:text-foreground transition-colors">
            <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <span>
              22/7, Kumaran Hardware Building, Near Muthoot Finance,
              Kinathukadavu, Tamil Nadu 642109
            </span>
          </div>
          <div className="flex items-center justify-center gap-3 text-muted-foreground group cursor-pointer hover:text-foreground transition-colors">
            <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <span>+91 97906 74312 &nbsp;|&nbsp; +91 79049 07252</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
