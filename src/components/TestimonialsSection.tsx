import { Star } from "lucide-react";

// Static testimonials for display (approved reviews from database would be shown here too)
const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    rating: 5,
    review: "Absolutely stunning bridal makeup! Jamuna made me look like a princess on my wedding day. Everyone couldn't stop complimenting my look.",
  },
  {
    id: 2,
    name: "Anitha Krishnan",
    rating: 5,
    review: "Best beauty parlour in town! The hair styling was perfect and lasted all day long. Highly recommend for any special occasion.",
  },
  {
    id: 3,
    name: "Meera Patel",
    rating: 5,
    review: "The mehndi design was intricate and beautiful. Sri's Beauty Parlour really understands what brides need. Thank you so much!",
  },
  {
    id: 4,
    name: "Kavitha Rajan",
    rating: 5,
    review: "Professional service with amazing attention to detail. The facial treatment left my skin glowing. Will definitely come back!",
  },
  {
    id: 5,
    name: "Deepa Venkat",
    rating: 5,
    review: "Wonderful experience! The team is so friendly and skilled. My party makeup was exactly what I envisioned.",
  },
  {
    id: 6,
    name: "Lakshmi Suresh",
    rating: 5,
    review: "I've tried many beauty parlours but Sri's is the best. The nail art designs are creative and long-lasting. Love it!",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-32 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-primary font-medium mb-4 tracking-widest uppercase">
            Testimonials
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - hear from our happy clients who trusted us with their special moments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-background p-8 rounded-lg border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-primary text-primary"
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-muted-foreground leading-relaxed mb-6 italic">
                "{testimonial.review}"
              </p>

              {/* Name */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="font-serif text-lg text-primary font-bold">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <span className="font-medium text-foreground">
                  {testimonial.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
