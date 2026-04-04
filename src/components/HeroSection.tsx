import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Sparkles, Star, Phone } from "lucide-react";
import logo from "@/assets/logo.png";
import salonWoman from "@/assets/salon-woman.jpg";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image - Right Side */}
      <div className="absolute inset-0">
        <img
          src={salonWoman}
          alt="Professional beautician at Sri's Beauty Parlour"
          className="w-full h-full object-cover object-center"
          width={1920}
          height={1280}
        />
        {/* Gradient overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/20 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/30" />
      </div>

      {/* Animated ambient elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-28 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Text & CTA */}
          <div className="max-w-lg">
            {/* Logo */}
            <div className={`mb-6 transition-all duration-700 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
              <img
                src={logo}
                alt="Sri's Beauty Parlour Logo"
                className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-md"
              />
            </div>

            {/* Badge */}
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4 transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-primary tracking-wide uppercase">15+ Years of Excellence</span>
            </div>

            {/* Title */}
            <h1 className={`font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3 leading-tight transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Your Beauty,
              <span className="block text-primary">Our Passion</span>
            </h1>

            {/* Divider */}
            <div className={`flex items-center gap-2 mb-4 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-primary/30 rounded-full" />
              <Star className="w-3 h-3 text-primary fill-primary" />
              <div className="w-12 h-0.5 bg-gradient-to-l from-primary to-primary/30 rounded-full" />
            </div>

            {/* Description */}
            <p className={`text-base md:text-lg text-muted-foreground mb-8 leading-relaxed transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Expert bridal makeup, hair styling & skincare by <strong className="text-foreground">Jamuna</strong>. 
              Book your appointment today and experience the transformation.
            </p>

            {/* CTA Buttons - Primary Focus */}
            <div className={`flex flex-col sm:flex-row gap-3 mb-6 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Button size="lg" className="gap-2 group hover:scale-105 transition-all shadow-lg text-base px-8 py-6" asChild>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5 group-hover:animate-pulse" />
                  Book via WhatsApp
                </a>
              </Button>
              <Button variant="outline" size="lg" className="gap-2 group hover:scale-105 transition-all backdrop-blur-sm bg-background/60 text-base px-8 py-6" asChild>
                <a href="mailto:jamuna.beauty@example.com">
                  <Mail className="w-5 h-5 group-hover:animate-pulse" />
                  Send an Email
                </a>
              </Button>
            </div>

            {/* Quick call link */}
            <div className={`flex items-center gap-2 text-sm text-muted-foreground transition-all duration-700 delay-600 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <Phone className="w-4 h-4 text-primary" />
              <span>Or call us directly:</span>
              <a href="tel:+919876543210" className="text-primary font-semibold hover:underline">+91 98765 43210</a>
            </div>

            {/* Trust indicators */}
            <div className={`flex items-center gap-4 mt-8 pt-6 border-t border-border/50 transition-all duration-700 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-primary fill-primary" />
                ))}
                <span className="ml-1 text-sm font-medium text-foreground">5.0</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <span className="text-sm text-muted-foreground">2000+ Happy Clients</span>
            </div>
          </div>

          {/* Right side is the background image, no content needed */}
          <div className="hidden md:block" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2 backdrop-blur-sm bg-background/10">
          <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
