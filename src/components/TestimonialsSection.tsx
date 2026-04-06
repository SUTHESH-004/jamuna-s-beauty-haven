import { Star, Quote, HeartHandshake, Smile } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import testimonialFriendliness from "@/assets/testimonial-friendliness.png";

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

const TestimonialCard = ({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <div
      ref={ref}
      className={`bg-background p-8 rounded-lg border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 group relative overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Decorative quote */}
      <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10 group-hover:text-primary/20 transition-colors" />
      
      {/* Stars with animation */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star
            key={i}
            className="w-5 h-5 fill-primary text-primary transition-transform hover:scale-125"
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>

      {/* Review Text */}
      <p className="text-muted-foreground leading-relaxed mb-6 italic relative z-10">
        "{testimonial.review}"
      </p>

      {/* Name with hover effect */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 group-hover:scale-110 transition-all">
          <span className="font-serif text-lg text-primary font-bold">
            {testimonial.name.charAt(0)}
          </span>
        </div>
        <span className="font-medium text-foreground group-hover:text-primary transition-colors">
          {testimonial.name}
        </span>
      </div>

      {/* Hover gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
};

const TestimonialsSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: spotlightRef, isVisible: spotlightVisible } = useScrollAnimation(0.15);

  return (
    <section id="testimonials" className="py-32 bg-card relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative">
        <div 
          ref={headerRef}
          className={`text-center mb-20 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
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

        <div
          ref={spotlightRef}
          className={`max-w-6xl mx-auto mb-16 transition-all duration-700 ${spotlightVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-0 overflow-hidden rounded-[2rem] border border-primary/15 bg-background shadow-[0_24px_80px_-40px_hsl(var(--foreground)/0.35)]">
            <div className="relative min-h-[320px] lg:min-h-full">
              <img
                src={testimonialFriendliness}
                alt="Happy client sharing a warm moment after bridal styling"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-foreground/65 via-transparent to-primary/10" />
              <div className="absolute left-6 bottom-6 flex flex-wrap gap-3">
                <div className="rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 backdrop-blur-sm">
                  <span className="text-sm font-medium tracking-wide text-primary-foreground">
                    Client Satisfaction
                  </span>
                </div>
                <div className="rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 backdrop-blur-sm">
                  <span className="text-sm font-medium tracking-wide text-primary-foreground">
                    Friendly Service
                  </span>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-background via-background to-primary/5">
              <p className="text-primary font-medium mb-4 tracking-[0.2em] uppercase">
                Warm Words
              </p>
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
                Beauty care that feels personal, joyful, and deeply trusted.
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                From the first consultation to the final finishing touch, we want every client to feel comfortable, celebrated, and completely cared for. These kind words reflect the satisfaction, friendliness, and confidence our clients experience with every visit.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border bg-card/70 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <HeartHandshake className="w-5 h-5" />
                    </div>
                    <h4 className="font-medium text-foreground">Client Satisfaction</h4>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Thoughtful service, polished results, and a calm experience for every special occasion.
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-card/70 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Smile className="w-5 h-5" />
                    </div>
                    <h4 className="font-medium text-foreground">Friendly Atmosphere</h4>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    A warm, welcoming space where every client feels seen, relaxed, and beautifully supported.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
