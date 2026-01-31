import husbandHero from "@/assets/husband-hero.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="py-32 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-primary font-medium mb-4 tracking-widest uppercase">
            Meet the Team
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
            The Faces Behind Our Success
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
          {/* Jamuna */}
          <div className="text-center md:text-left">
            <div className="w-48 h-48 mx-auto md:mx-0 rounded-full bg-primary/20 border-4 border-primary/30 mb-8 flex items-center justify-center overflow-hidden">
              <span className="font-serif text-6xl text-primary">J</span>
            </div>
            <h3 className="font-serif text-3xl font-bold text-foreground mb-4">
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
          <div className="text-center md:text-left">
            <div className="w-48 h-48 mx-auto md:mx-0 rounded-full overflow-hidden border-4 border-secondary/30 mb-8">
              <img
                src={husbandHero}
                alt="Managing Partner"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-serif text-3xl font-bold text-foreground mb-4">
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
        <div className="mt-24 max-w-3xl mx-auto text-center">
          <blockquote className="font-serif text-2xl md:text-3xl text-foreground italic">
            "Together, we bring beauty and business excellence under one roof"
          </blockquote>
          <p className="mt-6 text-muted-foreground">
            — A partnership built on love, trust, and shared dreams
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
