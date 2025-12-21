import { ArrowRight, Sparkles, Play, Star, Zap, Globe, Users, Code2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ["Build", "Contribute", "Lead"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Multi-layered Background */}
      <div className="absolute inset-0">
        {/* Primary gradient background */}
        <div className="absolute inset-0 gradient-bg opacity-95" />

        {/* Animated geometric shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large floating orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float opacity-60" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/15 rounded-full blur-3xl animate-float-delayed opacity-50" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-3xl animate-pulse-soft opacity-40" />

          {/* Medium floating elements */}
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-primary/30 rounded-full blur-2xl animate-float" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-accent/25 rounded-full blur-3xl animate-float-delayed" style={{ animationDelay: '1s' }} />
          <div className="absolute top-2/3 right-1/4 w-32 h-32 bg-secondary/20 rounded-full blur-2xl animate-pulse-soft" style={{ animationDelay: '1.5s' }} />

          {/* Small accent elements */}
          <div className="absolute top-1/6 left-1/6 w-24 h-24 bg-primary/40 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-1/6 right-1/6 w-16 h-16 bg-accent/35 rounded-full blur-lg animate-float-delayed" style={{ animationDelay: '2.5s' }} />

          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary)) 1px, transparent 1px),
                               radial-gradient(circle at 75% 75%, hsl(var(--accent)) 1px, transparent 1px)`,
              backgroundSize: '60px 60px, 40px 40px'
            }} />
          </div>
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-md rounded-full px-6 py-3 mb-8 animate-fade-in border border-primary-foreground/20 shadow-lg">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <Sparkles className="w-5 h-5 text-primary-foreground animate-pulse" />
          <span className="text-primary-foreground text-sm font-semibold">
            GECA Student Platform - Now Live & Accepting Projects
          </span>
        </div>

        {/* Main Heading */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-4 leading-tight opacity-0 animate-fade-in">
            <span className="relative inline-block">
              {words[currentWord]}
              <svg className="absolute -bottom-4 left-0 w-full h-2" viewBox="0 0 300 12" fill="none">
                <path
                  d="M2 8C50 4 100 2 150 6C200 10 250 8 298 4"
                  stroke="rgba(255,255,255,0.6)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  className="animate-pulse"
                />
              </svg>
            </span>
            <br />
            <span className="text-4xl md:text-6xl lg:text-7xl opacity-80">with Impact</span>
          </h1>

          {/* Animated subtitle */}
          <div className="text-xl md:text-2xl text-primary-foreground/90 max-w-4xl mx-auto leading-relaxed opacity-0 animate-fade-in font-light">
            Government Engineering College's official project platform.
            <span className="font-semibold text-primary-foreground"> Propose projects</span>,
            <span className="font-semibold text-primary-foreground"> contribute code</span>, and
            <span className="font-semibold text-primary-foreground"> earn recognition</span>.
          </div>
        </div>

        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 opacity-0 animate-fade-in">
          <Button
            size="lg"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold px-10 py-6 text-lg hover-lift hover:shadow-2xl transition-all duration-300 group border-2 border-primary-foreground/20"
          >
            <Zap className="mr-3 w-6 h-6 group-hover:animate-pulse" />
            Start Your Journey
            <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          <NavLink to="/about">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 font-bold px-10 py-6 text-lg bg-transparent hover-lift transition-all duration-300 group"
            >
              <Play className="mr-3 w-6 h-6 group-hover:scale-110 transition-transform" />
              Watch Our Story
            </Button>
          </NavLink>
        </div>

        {/* Live Stats Preview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-12 opacity-0 animate-fade-in">
          {[
            { icon: Users, value: "Growing", label: "Community" },
            { icon: Code2, value: "Active", label: "Projects" },
            { icon: Globe, value: "GitHub", label: "Workflow" },
            { icon: Star, value: "Merit", label: "Recognition" }
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="glass-card p-4 text-center hover-lift group"
              style={{ animationDelay: `${0.5 + index * 0.1}s` }}
            >
              <stat.icon className="w-6 h-6 text-primary-foreground mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xl font-bold text-primary-foreground">{stat.value}</div>
              <div className="text-xs text-primary-foreground/70">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Social Proof */}
        <div className="flex flex-col items-center gap-4 opacity-0 animate-fade-in">
          <p className="text-primary-foreground/60 text-sm">Supporting departments</p>
          <div className="flex flex-wrap justify-center gap-6 opacity-70">
            {["Computer Science", "Information Technology", "Electronics", "Mechanical", "Civil", "Electrical"].map((dept, index) => (
              <div
                key={dept}
                className="text-primary-foreground font-bold text-sm hover:text-primary transition-colors cursor-default"
                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
              >
                {dept}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in">
        <div className="flex flex-col items-center gap-2 text-primary-foreground/60">
          <span className="text-xs font-medium">Scroll to explore</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </div>

      {/* Bottom Wave with Enhanced Design */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--background))" />
              <stop offset="50%" stopColor="hsl(var(--background))" stopOpacity="0.8" />
              <stop offset="100%" stopColor="hsl(var(--background))" />
            </linearGradient>
          </defs>
          <path
            d="M0 120V60C240 20 480 0 720 20C960 40 1200 80 1440 60V120H0Z"
            fill="url(#waveGradient)"
          />
          <path
            d="M0 120V80C240 40 480 20 720 40C960 60 1200 100 1440 80V120H0Z"
            fill="hsl(var(--background))"
            opacity="0.3"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
