import { MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

// Placeholder coordinates for Sri's Beauty Parlour
// Replace with actual address coordinates
const PARLOUR_ADDRESS = "22/7, Kumaran Hardware Building, Near Muthoot Finance, Kinathukadavu, Tamil Nadu 642109";
const GOOGLE_MAPS_LINK = "https://maps.app.goo.gl/hxmVmzZqxWqusji29";
const EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5332.705327075159!2d77.01540020586583!3d10.823013431728663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba84ff6c8311a9f%3A0x43a49c6c657af5ed!2sSris%20parlour!5e0!3m2!1sen!2sin!4v1775473253028!5m2!1sen!2sin";

const MapSection = () => {
  const handleMapClick = () => {
    window.open(GOOGLE_MAPS_LINK, "_blank");
  };

  return (
    <section id="location" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-primary font-medium mb-4 tracking-widest uppercase">
            Find Us
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Visit Our Parlour
          </h2>
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-6">
            <MapPin className="w-5 h-5 text-primary" />
            <span>{PARLOUR_ADDRESS}</span>
          </div>
        </div>

        {/* Map Container - Clickable */}
        <div className="max-w-4xl mx-auto">
          <div
            onClick={handleMapClick}
            className="relative group cursor-pointer rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all duration-300"
          >
            {/* Embedded Map */}
            <div className="aspect-video w-full">
              <iframe
                src={EMBED_URL}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sri's Beauty Parlour Location"
                className="pointer-events-none"
              />
            </div>

            {/* Overlay on Hover */}
            <div className="absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="flex flex-col items-center gap-4 text-primary-foreground">
                <div className="w-16 h-16 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center border-2 border-primary-foreground/50">
                  <ExternalLink className="w-8 h-8" />
                </div>
                <div className="flex items-center gap-2 bg-primary-foreground/20 backdrop-blur-sm px-6 py-3 rounded-full">
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">Open in Google Maps</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile-friendly button */}
          <div className="mt-6 text-center md:hidden">
            <Button onClick={handleMapClick} className="gap-2">
              <MapPin className="w-4 h-4" />
              Get Directions
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
