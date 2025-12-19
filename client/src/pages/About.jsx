import {
  Target,
  Lightbulb,
  Users,
  Code2,
  Heart,
  Rocket,
  Award,
  Globe,
  TrendingUp,
  Calendar,
  Star,
  Zap,
  Shield,
  BookOpen,
  ChevronRight,
  CheckCircle
} from "lucide-react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const stats = [
  {
    icon: Users,
    value: "5000+",
    label: "Contributors",
    description: "From 80+ countries"
  },
  {
    icon: Code2,
    value: "50+",
    label: "Projects",
    description: "Real-world applications"
  },
  {
    icon: Award,
    value: "150+",
    label: "Mentors",
    description: "Industry experts"
  },
  {
    icon: TrendingUp,
    value: "10K+",
    label: "PRs Merged",
    description: "Successful contributions"
  }
];

const goals = [
  {
    icon: BookOpen,
    title: "Learn by Doing",
    description: "Gain hands-on experience contributing to real-world open-source projects with guidance from industry experts.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Users,
    title: "Build Connections",
    description: "Network with developers, mentors, and industry professionals from around the world in our global community.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Rocket,
    title: "Accelerate Growth",
    description: "Fast-track your career with meaningful contributions, skill development, and industry-recognized achievements.",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Heart,
    title: "Give Back",
    description: "Contribute to projects that benefit millions of developers and make a lasting impact on the open-source ecosystem.",
    color: "from-green-500 to-emerald-500"
  },
];

const participants = [
  {
    icon: Star,
    title: "Students",
    description: "University and college students looking to gain practical experience and build their portfolio.",
    gradient: "from-blue-500/20 to-cyan-500/20"
  },
  {
    icon: Zap,
    title: "Early Professionals",
    description: "Junior developers wanting to build their portfolio and advance their careers.",
    gradient: "from-purple-500/20 to-pink-500/20"
  },
  {
    icon: TrendingUp,
    title: "Career Changers",
    description: "Professionals transitioning into software development with structured guidance.",
    gradient: "from-orange-500/20 to-red-500/20"
  },
  {
    icon: Globe,
    title: "Open Source Enthusiasts",
    description: "Anyone passionate about contributing to open-source software and community building.",
    gradient: "from-green-500/20 to-emerald-500/20"
  },
];

const timeline = [
  {
    phase: "Registration",
    date: "April 1 - 30",
    description: "Sign up and select your preferred projects from our curated list of open-source initiatives.",
    icon: CheckCircle,
    status: "completed"
  },
  {
    phase: "Community Bonding",
    date: "May 1 - 15",
    description: "Meet your mentors and fellow contributors through virtual meetups and team introductions.",
    icon: Users,
    status: "completed"
  },
  {
    phase: "Coding Phase 1",
    date: "May 16 - June 30",
    description: "Start contributing to your assigned projects with regular check-ins and milestone tracking.",
    icon: Code2,
    status: "active"
  },
  {
    phase: "Coding Phase 2",
    date: "July 1 - August 15",
    description: "Continue development, implement advanced features, and prepare for final evaluations.",
    icon: Rocket,
    status: "upcoming"
  },
  {
    phase: "Final Evaluation",
    date: "August 16 - 31",
    description: "Final reviews, certificate distribution, and celebration of all achievements.",
    icon: Award,
    status: "upcoming"
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background main-bg-pattern">
      <Navbar />

      <main className="pt-24 pb-20">
        {/* Enhanced Hero Section */}
        <section className="px-4 py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5" />
          <div className="container mx-auto relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 hover-lift">
                <Target className="w-5 h-5 text-primary" />
                <span className="text-primary text-sm font-semibold">Our Mission</span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold gradient-text leading-tight mb-8">
                Empowering the Next Generation of
                <span className="block mt-2">Open Source Contributors</span>
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12">
                CodeFest is a transformative 3-month program that brings together developers worldwide to contribute to meaningful projects, learn from industry experts, and accelerate their careers in open-source development.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="gradient-bg text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover-lift hover:shadow-xl transition-all duration-300 flex items-center gap-2">
                  Join CodeFest 2024
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button className="glass-card px-8 py-4 rounded-xl font-semibold text-lg hover-lift transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Dashboard */}
        <section className="px-4 py-16">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Program <span className="gradient-text">Impact</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Real numbers that showcase our community's growth and contributions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="glass-card-elevated p-8 text-center hover-lift group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                  <div className="text-lg font-semibold text-foreground mb-1">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="px-4 py-16">
          <div className="container mx-auto">
            <div className="glass-card-elevated p-12 md:p-16 max-w-5xl mx-auto">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="lg:w-1/3">
                  <div className="w-24 h-24 rounded-3xl gradient-bg flex items-center justify-center mb-6">
                    <Lightbulb className="w-12 h-12 text-primary-foreground" />
                  </div>
                </div>
                <div className="lg:w-2/3">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                    Our Vision
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    We envision a world where open-source contribution is accessible to everyone, regardless of their background or experience level. Through CodeFest, we aim to democratize access to mentorship, create pathways for skill development, and foster a supportive community where every contributor can thrive and make meaningful impact on projects that matter.
                  </p>
                  <div className="flex items-center gap-4">
                    <Shield className="w-6 h-6 text-primary" />
                    <span className="text-sm font-medium text-primary">Trusted by 5000+ developers worldwide</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Goals Section */}
        <section className="px-4 py-20">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Program <span className="gradient-text">Goals</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                What we aim to achieve through CodeFest - creating opportunities for growth, learning, and meaningful contributions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {goals.map((goal, index) => (
                <div
                  key={goal.title}
                  className="glass-card-elevated p-8 hover-lift group relative overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${goal.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  <div className="flex items-start gap-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${goal.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <goal.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {goal.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {goal.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who Can Participate Section */}
        <section className="px-4 py-20 bg-muted/20">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Who Can <span className="gradient-text">Participate</span>?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                CodeFest welcomes developers at all skill levels and backgrounds. Whether you're just starting your journey or looking to make an impact, there's a place for you in our community.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {participants.map((participant, index) => (
                <div
                  key={participant.title}
                  className={`glass-card-elevated p-8 text-center hover-lift group relative overflow-hidden bg-gradient-to-br ${participant.gradient}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-20 h-20 rounded-3xl gradient-bg flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <participant.icon className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {participant.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {participant.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="px-4 py-20">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Program <span className="gradient-text">Timeline</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                A comprehensive 3-month journey designed to maximize learning and contribution opportunities
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-secondary opacity-30" />

                <div className="space-y-8">
                  {timeline.map((item, index) => (
                    <div
                      key={item.phase}
                      className="flex gap-8 group"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                          item.status === 'completed' ? 'gradient-bg' :
                          item.status === 'active' ? 'bg-primary text-primary-foreground animate-pulse' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          <item.icon className="w-8 h-8" />
                        </div>
                      </div>

                      <div className="flex-1 glass-card-elevated p-8 hover-lift group-hover:border-primary/50 transition-all duration-300">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                          <div>
                            <h4 className="text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                              {item.phase}
                            </h4>
                            <div className="text-primary font-semibold">{item.date}</div>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            item.status === 'completed' ? 'bg-green-500/20 text-green-700' :
                            item.status === 'active' ? 'bg-primary/20 text-primary' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            {item.status === 'completed' ? 'Completed' :
                             item.status === 'active' ? 'In Progress' : 'Upcoming'}
                          </div>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="px-4 py-20">
          <div className="container mx-auto">
            <div className="glass-card-elevated p-12 md:p-16 text-center max-w-4xl mx-auto">
              <div className="w-20 h-20 rounded-3xl gradient-bg flex items-center justify-center mx-auto mb-8">
                <Rocket className="w-10 h-10 text-primary-foreground" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of developers who have transformed their careers through CodeFest. Your next big opportunity awaits.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="gradient-bg text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover-lift hover:shadow-xl transition-all duration-300 flex items-center gap-2">
                  Apply Now
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button className="glass-card px-8 py-4 rounded-xl font-semibold text-lg hover-lift transition-all duration-300">
                  View Projects
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

export default About;