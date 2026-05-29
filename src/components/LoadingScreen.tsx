import { useState, useEffect } from "react";
import logo from "@/assets/sris-logo-only.png";

interface LoadingScreenProps {
  onComplete?: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const duration = 2000;
    const interval = 16;
    const increment = 100 / (duration / interval);
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => onComplete?.(), 600);
          }, 200);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-all duration-600 ease-out ${
        isExiting ? "opacity-0 pointer-events-none scale-105" : "opacity-100"
      }`}
    >
      {/* Decorative blurred orbs matching site aesthetic */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/8 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/30 rounded-full blur-3xl animate-pulse delay-700" />

      {/* Center content */}
      <div className="relative flex flex-col items-center">
        {/* Logo with spinning ring */}
        <div className="relative w-28 h-28 mb-8">
          {/* Outer spinning ring */}
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent"
            style={{
              borderTopColor: "hsl(var(--primary))",
              borderRightColor: "hsl(var(--primary) / 0.3)",
              animation: "loading-spin 1.2s linear infinite",
            }}
          />
          {/* Inner ring */}
          <div
            className="absolute inset-2 rounded-full border-2 border-transparent"
            style={{
              borderBottomColor: "hsl(var(--primary) / 0.5)",
              borderLeftColor: "hsl(var(--primary) / 0.15)",
              animation: "loading-spin-reverse 1.8s linear infinite",
            }}
          />
          {/* Logo centered */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={logo}
              alt="Sri's Beauty Parlour"
              className={`w-16 h-16 object-contain transition-all duration-500 ${
                progress > 20 ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
            />
          </div>
          {/* Glow */}
          <div className="absolute -inset-4 bg-primary/10 rounded-full blur-xl animate-pulse" />
        </div>

        {/* Brand text */}
        <h2
          className={`font-serif text-2xl font-bold text-foreground mb-2 transition-all duration-500 ${
            progress > 30 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          Sri's Beauty Parlour
        </h2>
        <p
          className={`text-sm text-muted-foreground tracking-widest uppercase transition-all duration-500 delay-100 ${
            progress > 45 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          Your Beauty, Our Passion
        </p>

        {/* Progress bar */}
        <div className="mt-8 w-48 h-1 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-100 ease-out"
            style={{
              width: `${progress}%`,
              boxShadow: "0 0 12px hsl(var(--primary) / 0.5)",
            }}
          />
        </div>

        {/* Percentage */}
        <p
          className={`mt-3 text-xs text-muted-foreground font-mono transition-all duration-300 ${
            progress > 60 ? "opacity-100" : "opacity-0"
          }`}
        >
          {Math.round(progress)}%
        </p>
      </div>

      {/* Keyframe styles */}
      <style>{`
        @keyframes loading-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes loading-spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
