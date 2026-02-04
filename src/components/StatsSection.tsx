import { useScrollAnimation, useCountUp } from "@/hooks/useScrollAnimation";
import { useEffect } from "react";
import { Sparkles, Users, Calendar, Heart } from "lucide-react";

const stats = [
  { icon: Users, value: 5000, suffix: "+", label: "Happy Clients" },
  { icon: Calendar, value: 15, suffix: "+", label: "Years Experience" },
  { icon: Sparkles, value: 1000, suffix: "+", label: "Bridal Makeovers" },
  { icon: Heart, value: 100, suffix: "%", label: "Satisfaction" },
];

const StatItem = ({ stat, isVisible }: { stat: typeof stats[0]; isVisible: boolean }) => {
  const { count, trigger } = useCountUp(stat.value);
  const Icon = stat.icon;

  useEffect(() => {
    if (isVisible) trigger();
  }, [isVisible, trigger]);

  return (
    <div className="text-center group">
      <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
        <Icon className="w-8 h-8 text-primary" />
      </div>
      <div className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-2">
        {count}{stat.suffix}
      </div>
      <p className="text-muted-foreground">{stat.label}</p>
    </div>
  );
};

const StatsSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.3);

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/30 rounded-full blur-3xl" />
      
      <div ref={ref} className="container mx-auto px-6 relative">
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {stats.map((stat, index) => (
            <StatItem key={index} stat={stat} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
