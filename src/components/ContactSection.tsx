import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Instagram, MapPin, Phone } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-primary font-medium mb-4 tracking-widest uppercase">
            Get in Touch
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Book Your Appointment
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ready to look your best? Reach out to us through your preferred channel.
            We're here to make you beautiful.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          {/* WhatsApp */}
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-8 bg-card rounded-lg border border-border hover:border-primary/50 transition-all duration-300 text-center hover:shadow-lg"
          >
            <div className="w-16 h-16 rounded-full bg-accent mx-auto flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-8 h-8 text-accent-foreground" />
            </div>
            <h3 className="font-serif text-xl font-bold text-foreground mb-2">
              WhatsApp
            </h3>
            <p className="text-muted-foreground">
              Quick responses, easy booking
            </p>
          </a>

          {/* Email */}
          <a
            href="mailto:jamuna.beauty@example.com"
            className="group p-8 bg-card rounded-lg border border-border hover:border-primary/50 transition-all duration-300 text-center hover:shadow-lg"
          >
            <div className="w-16 h-16 rounded-full bg-accent mx-auto flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Mail className="w-8 h-8 text-accent-foreground" />
            </div>
            <h3 className="font-serif text-xl font-bold text-foreground mb-2">
              Email Us
            </h3>
            <p className="text-muted-foreground">
              For detailed inquiries
            </p>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/jamuna.beauty"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-8 bg-card rounded-lg border border-border hover:border-primary/50 transition-all duration-300 text-center hover:shadow-lg"
          >
            <div className="w-16 h-16 rounded-full bg-accent mx-auto flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Instagram className="w-8 h-8 text-accent-foreground" />
            </div>
            <h3 className="font-serif text-xl font-bold text-foreground mb-2">
              Instagram
            </h3>
            <p className="text-muted-foreground">
              Follow our latest work
            </p>
          </a>
        </div>

        {/* Additional Info */}
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="flex items-center justify-center gap-3 text-muted-foreground">
            <MapPin className="w-5 h-5 text-primary" />
            <span>123 Beauty Lane, City Center, State - 123456</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-muted-foreground">
            <Phone className="w-5 h-5 text-primary" />
            <span>+91 98765 43210</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
