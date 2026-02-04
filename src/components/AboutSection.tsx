import husbandHero from "@/assets/husband-hero.jpg";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const AboutSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: teamRef, isVisible: teamVisible } = useScrollAnimation(0.2);
  const { ref: quoteRef, isVisible: quoteVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-32 bg-card relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative">
        <div 
          ref={headerRef}
          className={`text-center mb-20 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <p className="text-primary font-medium mb-4 tracking-widest uppercase">
            Meet the Team
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
            The Faces Behind Our Success
          </h2>
        </div>

        <div 
          ref={teamRef}
          className={`grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto transition-all duration-700 delay-150 ${teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {/* Jamuna */}
          <div className="text-center md:text-left group">
            <div className="w-48 h-48 mx-auto md:mx-0 rounded-full bg-primary/20 border-4 border-primary/30 mb-8 flex items-center justify-center overflow-hidden group-hover:scale-105 group-hover:border-primary/60 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-primary/20">
              <span className="font-serif text-6xl text-primary group-hover:scale-110 transition-transform duration-300">J</span>
            </div>
            <h3 className="font-serif text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
              Jamuna
            </h3>
            <p className="text-primary font-medium mb-4">
              Lead Beautician & Founder
            </p>
            <p className="text-muted-foreground leading-relaxed">
              With over 15 years of experience in the beauty industry, Jamuna has 
              transformed thousands of brides and clients into their most beautiful selves. 
              Her expertise spans bridal makeup, hair styling, skincare treatments, 
              and mehndi artistry. She believes every woman deserves to feel beautiful.
            </p>
          </div>

          {/* Husband */}
          <div className="text-center md:text-left group">
            <div className="w-48 h-48 mx-auto md:mx-0 rounded-full overflow-hidden border-4 border-secondary/30 mb-8 group-hover:scale-105 group-hover:border-secondary/60 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-secondary/20">
              <img
                src={husbandHero}
                alt="Managing Partner"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <h3 className="font-serif text-3xl font-bold text-foreground mb-4 group-hover:text-secondary transition-colors">
              Rajesh
            </h3>
            <p className="text-secondary font-medium mb-4">
              Managing Partner & Financial Head
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The pillar of support behind every success. Rajesh handles all business 
              operations, client relations, and ensures every appointment runs smoothly. 
              His dedication to customer satisfaction and attention to detail makes 
              the entire experience seamless for our valued clients.
            </p>
          </div>
        </div>

        {/* Partnership Quote */}
        <div 
          ref={quoteRef}
          className={`mt-24 max-w-3xl mx-auto text-center transition-all duration-700 ${quoteVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        >
          <blockquote className="font-serif text-2xl md:text-3xl text-foreground italic relative">
            <span className="absolute -top-6 -left-4 text-6xl text-primary/20">"</span>
            Together, we bring beauty and business excellence under one roof
            <span className="absolute -bottom-8 -right-4 text-6xl text-primary/20">"</span>
          </blockquote>
          <p className="mt-10 text-muted-foreground">
            — A partnership built on love, trust, and shared dreams
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
