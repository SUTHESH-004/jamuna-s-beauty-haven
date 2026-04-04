import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Sparkles, Star, Phone, ArrowRight } from "lucide-react";
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
      {/* Full Background Image */}
      <div className="absolute inset-0">
        <img
          src={salonWoman}
          alt="Professional beautician at Sri's Beauty Parlour"
          className="w-full h-full object-cover object-center"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/20" />
      </div>

      {/* Subtle animated orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-accent/15 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-28 md:py-32">
        <div className="max-w-xl">
          {/* Glassmorphism card */}
          <div className="relative backdrop-blur-md bg-background/40 border border-primary/10 rounded-3xl p-8 md:p-10 shadow-2xl">
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/40 rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/40 rounded-br-3xl" />

            {/* Logo + Badge row */}
            <div className={`flex items-center gap-4 mb-6 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <img
                src={logo}
                alt="Sri's Beauty Parlour Logo"
                className="w-20 h-20 object-contain"
              />
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                  <Sparkles className="w-3 h-3 text-primary" />
                  <span className="text-[11px] font-semibold text-primary tracking-widest uppercase">Since 2009</span>
                </div>
                <div className="flex items-center gap-1 mt-1.5 ml-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-primary fill-primary" />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">2000+ clients</span>
                </div>
              </div>
            </div>

            {/* Headline */}
            <div className={`transition-all duration-700 delay-150 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-foreground leading-[1.1] mb-2">
                Your Beauty,
              </h1>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] mb-5">
                <span className="text-primary relative inline-block">
                  Our Passion
                  <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none">
                    <path d="M2 6C50 2 150 2 198 6" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" className="animate-[draw_1.5s_ease-out_0.8s_both]" strokeDasharray="200" strokeDashoffset="200" style={{ animation: isLoaded ? 'draw 1.2s ease-out 0.8s forwards' : 'none' }} />
                  </svg>
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className={`text-base text-muted-foreground leading-relaxed mb-7 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Expert bridal makeup, hair styling & skincare by <strong className="text-foreground">Jamuna</strong> — 
              15+ years making every client feel beautiful and confident.
            </p>

            {/* CTA Buttons */}
            <div className={`space-y-3 mb-6 transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Button size="lg" className="w-full gap-3 group hover:scale-[1.02] transition-all shadow-lg text-base py-6 rounded-xl" asChild>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5" />
                  Book via WhatsApp
                  <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="lg" className="gap-2 group hover:scale-[1.02] transition-all bg-background/50 py-5 rounded-xl" asChild>
                  <a href="mailto:jamuna.beauty@example.com">
                    <Mail className="w-4 h-4" />
                    Email Us
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="gap-2 group hover:scale-[1.02] transition-all bg-background/50 py-5 rounded-xl" asChild>
                  <a href="tel:+919876543210">
                    <Phone className="w-4 h-4" />
                    Call Now
                  </a>
                </Button>
              </div>
            </div>

            {/* Services tags */}
            <div className={`flex flex-wrap gap-2 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              {["Bridal Makeup", "Hair Styling", "Skincare", "Facials"].map((service) => (
                <span
                  key={service}
                  className="text-xs px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-muted-foreground"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2 backdrop-blur-sm bg-background/10">
          <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
        </div>
      </div>

      {/* SVG animation keyframe */}
      <style>{`
        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
