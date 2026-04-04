import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Sparkles, Star } from "lucide-react";
import logo from "@/assets/logo.png";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-accent to-background">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/30 rounded-full blur-3xl" />
        
        {/* Floating sparkle dots */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full animate-pulse"
            style={{
              top: `${15 + i * 15}%`,
              left: `${10 + i * 14}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Decorative border lines */}
      <div className="absolute top-8 left-8 right-8 bottom-8 border border-primary/10 rounded-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-32">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Logo */}
          <div className={`mb-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/10 rounded-full blur-2xl animate-pulse" />
              <img
                src={logo}
                alt="Sri's Beauty Parlour Logo"
                className="relative w-48 h-48 md:w-56 md:h-56 object-contain drop-shadow-lg"
              />
            </div>
          </div>

          {/* Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary tracking-wide">Premium Beauty Experience</span>
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          </div>

          {/* Title */}
          <h1 className={`font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-4 leading-tight transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Sri's
            <span className="block text-primary">Beauty Parlour</span>
          </h1>

          {/* Divider */}
          <div className={`flex items-center gap-3 mb-6 transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}>
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-primary/50" />
            <Star className="w-4 h-4 text-primary fill-primary" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-primary/50" />
          </div>

          {/* Description */}
          <p className={`text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-xl transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Where beauty meets expertise. Led by Jamuna with over 15 years of experience
            in bridal makeup, hair styling, and skincare treatments.
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-wrap justify-center gap-4 transition-all duration-700 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Button size="lg" className="gap-2 group hover:scale-105 transition-transform shadow-lg" asChild>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 group-hover:animate-pulse" />
                Book via WhatsApp
              </a>
            </Button>
            <Button variant="outline" size="lg" className="gap-2 group hover:scale-105 transition-transform backdrop-blur-sm bg-background/50" asChild>
              <a href="mailto:jamuna.beauty@example.com">
                <Mail className="w-5 h-5 group-hover:animate-pulse" />
                Send an Email
              </a>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className={`flex items-center gap-6 mt-12 text-sm text-muted-foreground transition-all duration-700 delay-900 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 text-primary fill-primary" />
              ))}
              <span className="ml-1">5.0</span>
            </div>
            <div className="w-px h-4 bg-border" />
            <span>15+ Years Experience</span>
            <div className="w-px h-4 bg-border" />
            <span>2000+ Happy Clients</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2 backdrop-blur-sm bg-background/10">
          <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
