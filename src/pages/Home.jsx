import { Calendar, Users, Award, GitBranch, Code2, Rocket } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import HighlightCard from "@/components/HighlightCard";

const highlights = [
  {
    icon: Calendar,
    title: "Program Duration",
    value: "3 Months",
    description: "Intensive open-source contribution period from May to August 2024.",
  },
  {
    icon: Users,
    title: "Participants",
    value: "5000+",
    description: "Developers from around the world joining our community.",
  },
  {
    icon: Award,
    title: "Mentors",
    value: "150+",
    description: "Industry experts guiding contributors throughout the journey.",
  },
  {
    icon: GitBranch,
    title: "Projects",
    value: "50+",
    description: "Open-source projects across various domains and technologies.",
  },
  {
    icon: Code2,
    title: "PRs Merged",
    value: "10K+",
    description: "Contributions successfully merged into production codebases.",
  },
  {
    icon: Rocket,
    title: "Prize Pool",
    value: "$50K",
    description: "Amazing prizes, swag, and goodies for top contributors.",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        <HeroSection />
        
        {/* Highlights Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Join <span className="gradient-text">CodeFest</span>?
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Be part of an incredible journey that will transform your development skills
                and connect you with a global community of passionate developers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {highlights.map((highlight, index) => (
                <HighlightCard
                  key={highlight.title}
                  icon={highlight.icon}
                  title={highlight.title}
                  value={highlight.value}
                  description={highlight.description}
                  delay={0.1 * index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="glass-card-dark p-8 md:p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/20 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Make an Impact?
                </h2>
                <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
                  Join thousands of developers contributing to open-source projects.
                  Start your journey today and become part of something bigger.
                </p>
                <button className="px-8 py-4 bg-primary-foreground text-primary font-semibold rounded-xl hover:bg-primary-foreground/90 transition-colors">
                  Register for CodeFest 2024
                </button>
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