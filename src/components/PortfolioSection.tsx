import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";

const portfolioItems = [
  {
    image: portfolio1,
    title: "Bridal Transformation",
    category: "Bridal Makeup",
  },
  {
    image: portfolio2,
    title: "Elegant Hair Styling",
    category: "Hair Styling",
  },
  {
    image: portfolio3,
    title: "Radiant Glow Facial",
    category: "Skincare",
  },
  {
    image: portfolio4,
    title: "Traditional Mehndi",
    category: "Mehndi Art",
  },
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="py-32 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-primary font-medium mb-4 tracking-widest uppercase">
            Our Work
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Portfolio Gallery
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A glimpse into our beautiful transformations. Each client tells a unique story.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {portfolioItems.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg aspect-[3/4]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-primary-foreground/80 text-sm font-medium mb-2">
                    {item.category}
                  </p>
                  <h3 className="text-primary-foreground font-serif text-xl font-bold">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-muted-foreground">
            Follow us on Instagram to see more of our work
          </p>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
