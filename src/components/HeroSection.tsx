import { Button } from "@/components/ui/button";
import { MessageCircle, Mail } from "lucide-react";
import jamunaHero from "@/assets/jamuna-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={jamunaHero}
          alt="Jamuna - Expert Beautician"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-32">
        <div className="max-w-2xl">
          <p className="text-primary font-medium mb-4 tracking-widest uppercase">
            Welcome to
          </p>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Jamuna
            <span className="block text-primary">Beauty Parlour</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Where beauty meets expertise. Led by Jamuna with over 15 years of experience 
            in bridal makeup, hair styling, and skincare treatments. Every client leaves 
            feeling beautiful and confident.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="gap-2" asChild>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5" />
                Book via WhatsApp
              </a>
            </Button>
            <Button variant="outline" size="lg" className="gap-2" asChild>
              <a href="mailto:jamuna.beauty@example.com">
                <Mail className="w-5 h-5" />
                Send an Email
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
