import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Sparkles } from "lucide-react";
import jamunaHero from "@/assets/jamuna-hero.jpg";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/40 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0">
        <img
          src={jamunaHero}
          alt="Jamuna - Expert Beautician"
          className="w-full h-full object-cover transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
      </div>

      {/* Content with Staggered Animations */}
      <div className="relative z-10 container mx-auto px-6 py-32">
        <div className="max-w-2xl">
          <p className={`text-primary font-medium mb-4 tracking-widest uppercase flex items-center gap-2 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Sparkles className="w-4 h-4 animate-pulse" />
            Welcome to
          </p>
          <h1 className={`font-serif text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight transition-all duration-700 delay-150 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Sri's
            <span className="block text-primary relative">
              Beauty Parlour
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent-foreground rounded-full scale-x-0 animate-[scale-x_1s_ease-out_0.8s_forwards] origin-left" />
            </span>
          </h1>
          <p className={`text-lg text-muted-foreground mb-8 leading-relaxed transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Where beauty meets expertise. Led by Jamuna with over 15 years of experience 
            in bridal makeup, hair styling, and skincare treatments. Every client leaves 
            feeling beautiful and confident.
          </p>
          <div className={`flex flex-wrap gap-4 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Button size="lg" className="gap-2 group hover:scale-105 transition-transform" asChild>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 group-hover:animate-pulse" />
                Book via WhatsApp
              </a>
            </Button>
            <Button variant="outline" size="lg" className="gap-2 group hover:scale-105 transition-transform" asChild>
              <a href="mailto:jamuna.beauty@example.com">
                <Mail className="w-5 h-5 group-hover:animate-pulse" />
                Send an Email
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2 backdrop-blur-sm bg-background/10">
          <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
