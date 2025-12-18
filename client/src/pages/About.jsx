import { Target, Lightbulb, Users, Code2, Heart, Rocket } from "lucide-react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const goals = [
  {
    icon: Code2,
    title: "Learn by Doing",
    description: "Gain hands-on experience contributing to real-world open-source projects.",
  },
  {
    icon: Users,
    title: "Build Connections",
    description: "Network with developers, mentors, and industry professionals worldwide.",
  },
  {
    icon: Rocket,
    title: "Accelerate Growth",
    description: "Fast-track your career with meaningful contributions and recognition.",
  },
  {
    icon: Heart,
    title: "Give Back",
    description: "Contribute to projects that benefit the global developer community.",
  },
];

const participants = [
  {
    title: "Students",
    description: "University and college students looking to gain practical experience.",
  },
  {
    title: "Early Professionals",
    description: "Junior developers wanting to build their portfolio and skills.",
  },
  {
    title: "Career Changers",
    description: "Professionals transitioning into software development.",
  },
  {
    title: "Open Source Enthusiasts",
    description: "Anyone passionate about contributing to open-source software.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="px-4 py-16">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <div 
                className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6 opacity-0 animate-fade-in"
              >
                <Target className="w-4 h-4 text-primary" />
                <span className="text-primary text-sm font-medium">Our Mission</span>
              </div>
              
              <h1 
                className="text-4xl md:text-5xl font-bold text-foreground mb-6 opacity-0 animate-fade-in"
                style={{ animationDelay: "0.1s" }}
              >
                Empowering the Next Generation of
                <span className="gradient-text"> Open Source Contributors</span>
              </h1>
              
              <p 
                className="text-lg text-muted-foreground opacity-0 animate-fade-in"
                style={{ animationDelay: "0.2s" }}
              >
                CodeFest is a 3-month long open-source program designed to bring together
                developers from around the world to contribute to meaningful projects,
                learn from industry experts, and grow their skills.
              </p>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="px-4 py-16">
          <div className="container mx-auto">
            <div className="glass-card p-8 md:p-12 max-w-4xl mx-auto">
              <div className="flex items-start gap-6">
                <div className="hidden md:flex w-16 h-16 rounded-2xl gradient-bg items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    Our Vision
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    We envision a world where open-source contribution is accessible to everyone,
                    regardless of their background or experience level. Through CodeFest, we aim to
                    democratize access to mentorship, create pathways for skill development, and
                    foster a supportive community where every contributor can thrive and make
                    meaningful impact on projects that matter.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Goals Section */}
        <section className="px-4 py-16">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Program <span className="gradient-text">Goals</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                What we aim to achieve through CodeFest
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {goals.map((goal, index) => (
                <div
                  key={goal.title}
                  className="glass-card p-6 hover-lift opacity-0 animate-fade-in"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                      <goal.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {goal.title}
                      </h3>
                      <p className="text-muted-foreground">
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
        <section className="px-4 py-16">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Who Can <span className="gradient-text">Participate</span>?
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                CodeFest is open to developers at all skill levels
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {participants.map((participant, index) => (
                <div
                  key={participant.title}
                  className="glass-card p-6 text-center hover-lift opacity-0 animate-fade-in"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {participant.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {participant.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="px-4 py-16">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Program <span className="gradient-text">Timeline</span>
              </h2>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="space-y-0">
                {[
                  { phase: "Registration", date: "April 1 - 30", description: "Sign up and select your preferred projects" },
                  { phase: "Community Bonding", date: "May 1 - 15", description: "Meet your mentors and fellow contributors" },
                  { phase: "Coding Phase 1", date: "May 16 - June 30", description: "Start contributing to your assigned projects" },
                  { phase: "Coding Phase 2", date: "July 1 - August 15", description: "Continue development and complete milestones" },
                  { phase: "Final Evaluation", date: "August 16 - 31", description: "Final reviews and certificate distribution" },
                ].map((item, index) => (
                  <div 
                    key={item.phase} 
                    className="flex gap-6 opacity-0 animate-fade-in"
                    style={{ animationDelay: `${0.1 * index}s` }}
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full gradient-bg" />
                      {index < 4 && <div className="w-0.5 h-24 bg-border" />}
                    </div>
                    <div className="pb-8">
                      <div className="text-sm text-primary font-medium mb-1">{item.date}</div>
                      <h4 className="text-lg font-semibold text-foreground mb-1">{item.phase}</h4>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
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