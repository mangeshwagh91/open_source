import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-bg opacity-95" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-foreground/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-primary-foreground" />
          <span className="text-primary-foreground text-sm font-medium">
            Season 2024 Now Open
          </span>
        </div>

        <h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight opacity-0 animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          Code. Collaborate.
          <br />
          <span className="relative">
            Create Impact.
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
              <path d="M2 10C50 4 100 2 150 6C200 10 250 8 298 4" stroke="rgba(255,255,255,0.4)" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </span>
        </h1>

        <p 
          className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          Join thousands of developers in the biggest open-source program of the year.
          Contribute to real projects, learn from mentors, and win amazing prizes.
        </p>

        <div 
          className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <Button 
            size="lg" 
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold px-8 py-6 text-lg group"
          >
            Get Started
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <NavLink to="/about">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold px-8 py-6 text-lg bg-transparent"
            >
              Learn More
            </Button>
          </NavLink>
        </div>

        {/* Stats Preview */}
        <div 
          className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto opacity-0 animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary-foreground">50+</div>
            <div className="text-primary-foreground/70 text-sm">Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary-foreground">5K+</div>
            <div className="text-primary-foreground/70 text-sm">Contributors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary-foreground">100+</div>
            <div className="text-primary-foreground/70 text-sm">Mentors</div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full">
          <path 
            d="M0 120V60C240 20 480 0 720 20C960 40 1200 80 1440 60V120H0Z" 
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
