import {
  Calendar,
  Users,
  Award,
  GitBranch,
  Code2,
  Rocket,
  Star,
  TrendingUp,
  Globe,
  Zap,
  Target,
  Heart,
  ChevronRight,
  Play,
  Sparkles,
  Trophy,
  BookOpen,
  MessageCircle,
  ArrowUpRight,
  CheckCircle,
  Clock,
  MapPin,
  DollarSign
} from "lucide-react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import HeroSection from "@/components/Home/HeroSection";
import HighlightCard from "@/components/Home/HighlightCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

const highlights = [
  {
    icon: Users,
    title: "GECA Students",
    value: "2000+",
    description: "Active students from Government Engineering College contributing to real projects.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: GitBranch,
    title: "Live Projects",
    value: "50+",
    description: "Student-led projects spanning web development, AI/ML, mobile apps, and more.",
    color: "from-emerald-500 to-teal-500"
  },
  {
    icon: Award,
    title: "Faculty Mentors",
    value: "30+",
    description: "Experienced teachers and industry mentors guiding student projects.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Code2,
    title: "Contributions",
    value: "5K+",
    description: "GitHub pull requests merged through collaborative student contributions.",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Trophy,
    title: "Total Points",
    value: "100K+",
    description: "Points earned by students through Level 1, 2, and 3 contributions.",
    color: "from-indigo-500 to-purple-500"
  },
  {
    icon: Star,
    title: "Certificates",
    value: "1000+",
    description: "Recognition certificates awarded to top performers and contributors.",
    color: "from-amber-500 to-orange-500"
  },
];

const features = [
  {
    icon: BookOpen,
    title: "Real Project Experience",
    description: "Work on actual projects with GitHub-based workflows, code reviews, and production-ready code.",
    benefits: ["Industry workflows", "GitHub expertise", "Portfolio building"]
  },
  {
    icon: Users,
    title: "Collaborate & Lead",
    description: "Propose your own projects, become a Project Admin, or contribute to peers' innovative ideas.",
    benefits: ["Project ownership", "Team collaboration", "Leadership skills"]
  },
  {
    icon: Trophy,
    title: "Earn Recognition",
    description: "Gain points through contributions, compete on the leaderboard, and earn certificates each season.",
    benefits: ["Points system", "Leaderboard ranking", "Certificates & trophies"]
  }
];

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Final Year CSE",
    company: "GECA",
    avatar: "RS",
    content: "Contributing to real projects on this platform gave me the confidence and skills to crack my campus placements. The points system kept me motivated!",
    rating: 5,
    achievement: "Leaderboard Rank #1"
  },
  {
    name: "Ananya Verma",
    role: "Third Year IT",
    company: "GECA",
    avatar: "AV",
    content: "I proposed a mobile app project and became a Project Admin. Leading my team and reviewing PRs taught me more than any textbook.",
    rating: 5,
    achievement: "Best Project Award"
  },
  {
    name: "Arjun Patel",
    role: "Second Year ECE",
    company: "GECA",
    avatar: "AP",
    content: "The GitHub-based workflow and faculty mentorship prepared me for real industry experience. Got my first internship because of this!",
    rating: 5,
    achievement: "Top 3 Contributor"
  }
];

const stats = [
  { label: "Active Students", value: 2000, suffix: "+", icon: Users },
  { label: "Live Projects", value: 50, suffix: "+", icon: GitBranch },
  { label: "Pull Requests", value: 5000, suffix: "+", icon: Code2 },
  { label: "Contribution Rate", value: 92, suffix: "%", icon: TrendingUp }
];

const Counter = ({ value, suffix, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [value, duration]);

  return <span>{count}{suffix}</span>;
};

const Home = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background main-bg-pattern">
      <Navbar />

      <main className="relative">
        <HeroSection />

        {/* Live Statistics Dashboard */}
        <section className="py-16 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5" />
          <div className="container mx-auto relative">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                <Zap className="w-4 h-4 mr-2" />
                Platform Statistics
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                GECA Platform by the <span className="gradient-text">Numbers</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="glass-card-elevated p-6 text-center hover-lift group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="text-3xl font-bold gradient-text mb-1">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Join CodeFest - Enhanced */}
        <section className="py-20 px-4 bg-muted/20">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
                <Star className="w-5 h-5 text-primary" />
                <span className="text-primary text-sm font-semibold">Why Join GECA Platform</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Build Your <span className="gradient-text">Career Foundation</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                GECA's official project platform where students gain real development experience.
                Work on live projects, collaborate with peers, and build a portfolio that stands out.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {highlights.map((highlight, index) => (
                <div
                  key={highlight.title}
                  className="glass-card-elevated p-8 hover-lift group relative overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${highlight.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  <div className="relative z-10">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${highlight.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <highlight.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-4xl font-bold gradient-text mb-2 group-hover:scale-105 transition-transform duration-300">
                      {highlight.value}
                    </div>
                    <div className="text-xl font-semibold text-foreground mb-3">{highlight.title}</div>
                    <p className="text-muted-foreground leading-relaxed">{highlight.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                How It <span className="gradient-text">Works</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                A simple yet powerful system designed for student growth and collaboration
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="glass-card-elevated p-8 hover-lift group"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-primary-foreground" />
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4 bg-muted/20">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Success <span className="gradient-text">Stories</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Hear from developers who transformed their careers through CodeFest
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="glass-card-elevated p-8 md:p-12 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />

                <div className="relative z-10">
                  {/* Testimonial content */}
                  <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                      ))}
                    </div>

                    <blockquote className="text-xl md:text-2xl text-foreground mb-8 italic leading-relaxed">
                      "{testimonials[activeTestimonial].content}"
                    </blockquote>

                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-primary-foreground font-bold">
                        {testimonials[activeTestimonial].avatar}
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-foreground">{testimonials[activeTestimonial].name}</div>
                        <div className="text-sm text-muted-foreground">{testimonials[activeTestimonial].role} at {testimonials[activeTestimonial].company}</div>
                      </div>
                    </div>

                    <Badge variant="secondary" className="text-xs">
                      <Trophy className="w-3 h-3 mr-1" />
                      {testimonials[activeTestimonial].achievement}
                    </Badge>
                  </div>

                  {/* Testimonial navigation */}
                  <div className="flex justify-center gap-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveTestimonial(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === activeTestimonial
                            ? 'bg-primary scale-125'
                            : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Program Timeline Preview */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Your <span className="gradient-text">Journey</span> Awaits
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                A structured 3-month program designed to maximize your growth and success
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    phase: "Month 1",
                    title: "Foundation & Learning",
                    description: "Get onboarded, learn best practices, and start contributing to beginner-friendly issues.",
                    icon: BookOpen,
                    color: "from-blue-500 to-cyan-500"
                  },
                  {
                    phase: "Month 2",
                    title: "Deep Contribution",
                    description: "Take on complex features, collaborate with teams, and receive personalized mentorship.",
                    icon: Code2,
                    color: "from-emerald-500 to-teal-500"
                  },
                  {
                    phase: "Month 3",
                    title: "Leadership & Impact",
                    description: "Lead initiatives, mentor others, and showcase your portfolio to potential employers.",
                    icon: Rocket,
                    color: "from-purple-500 to-pink-500"
                  }
                ].map((phase, index) => (
                  <div
                    key={phase.phase}
                    className="glass-card-elevated p-8 text-center hover-lift group relative"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${phase.color} flex items-center justify-center shadow-lg`}>
                        <phase.icon className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    <div className="pt-4">
                      <Badge variant="outline" className="mb-4">{phase.phase}</Badge>
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {phase.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {phase.description}
                      </p>
                    </div>

                    {index < 2 && (
                      <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-transparent transform -translate-y-1/2" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced CTA Section */}
        <section className="py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10" />
          <div className="container mx-auto relative">
            <div className="max-w-5xl mx-auto">
              <div className="glass-card-elevated p-12 md:p-16 text-center relative overflow-hidden">
                {/* Background elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/20 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-secondary/20 rounded-full blur-2xl" />

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="text-primary text-sm font-semibold">Limited Time Offer</span>
                  </div>

                  <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                    Ready to Start Your <span className="gradient-text">Journey</span>?
                  </h2>

                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
                    Join thousands of developers who are already transforming their careers.
                    Applications close soon - don't miss your chance to be part of something extraordinary.
                  </p>

                  {/* Key benefits */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-4xl mx-auto">
                    {[
                      { icon: DollarSign, text: "$50K+ in prizes" },
                      { icon: Award, text: "Industry recognition" },
                      { icon: Heart, text: "Lifetime community" }
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-center justify-center gap-3 text-foreground">
                        <benefit.icon className="w-5 h-5 text-primary" />
                        <span className="font-medium">{benefit.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="gradient-bg text-primary-foreground px-10 py-5 rounded-2xl font-bold text-lg hover-lift hover:shadow-2xl transition-all duration-300 flex items-center gap-3 group">
                      <Sparkles className="w-6 h-6 group-hover:animate-spin" />
                      Register Now
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button className="glass-card px-10 py-5 rounded-2xl font-bold text-lg hover-lift transition-all duration-300 flex items-center gap-3">
                      <Play className="w-6 h-6" />
                      Watch Demo
                    </button>
                  </div>

                  {/* Social proof */}
                  <div className="mt-12 pt-8 border-t border-border/50">
                    <p className="text-sm text-muted-foreground mb-4">Trusted by developers from</p>
                    <div className="flex flex-wrap justify-center gap-8 opacity-60">
                      {["Google", "Microsoft", "Meta", "Amazon", "Netflix", "Spotify"].map((company) => (
                        <div key={company} className="text-foreground font-semibold text-sm">
                          {company}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;