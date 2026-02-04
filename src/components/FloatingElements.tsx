import { Sparkles, Star, Heart } from "lucide-react";

const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating sparkles */}
      <div className="absolute top-1/4 left-10 animate-pulse">
        <Sparkles className="w-4 h-4 text-primary/20" />
      </div>
      <div className="absolute top-1/3 right-20 animate-pulse delay-500">
        <Star className="w-3 h-3 text-primary/15" />
      </div>
      <div className="absolute top-2/3 left-1/4 animate-pulse delay-1000">
        <Heart className="w-4 h-4 text-accent-foreground/10" />
      </div>
      <div className="absolute bottom-1/4 right-1/4 animate-pulse delay-700">
        <Sparkles className="w-5 h-5 text-primary/10" />
      </div>
      <div className="absolute top-1/2 right-10 animate-pulse delay-300">
        <Star className="w-4 h-4 text-primary/15" />
      </div>
    </div>
  );
};

export default FloatingElements;
