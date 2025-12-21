import { useState } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Users,
  Award,
  CheckCircle,
  AlertTriangle,
  Heart,
  Code2,
  MessageSquare,
  BookOpen,
  Target
} from "lucide-react";

const Guidelines = () => {
  const [activeSection, setActiveSection] = useState("principles");

  const sections = [
    { id: "principles", title: "Contribution Principles", icon: Shield },
    { id: "conduct", title: "Code of Conduct", icon: Users },
    { id: "eligibility", title: "Recognition Eligibility", icon: Award },
    { id: "transparency", title: "Transparency", icon: CheckCircle }
  ];

  return (
    <div className="min-h-screen bg-background main-bg-pattern">
      <Navbar />

      <main className="pt-24 pb-20">
        {/* Header Section */}
        <section className="px-4 py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5" />
          <div className="container mx-auto relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-primary text-sm font-semibold">Community Guidelines</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold gradient-text leading-tight mb-8">
                Building Together with <span className="block mt-2">Integrity</span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Our guidelines ensure a fair, collaborative, and positive environment for all GECA students.
                These principles guide our growing community as we build real projects together.
              </p>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="px-4 py-8">
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "default" : "outline"}
                  onClick={() => setActiveSection(section.id)}
                  className="flex items-center gap-2"
                >
                  <section.icon className="w-4 h-4" />
                  {section.title}
                </Button>
              ))}
            </div>

            {/* Content Sections */}
            <div className="max-w-4xl mx-auto">
              {activeSection === "principles" && (
                <div className="space-y-8">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold gradient-text mb-4">Contribution Principles</h2>
                    <p className="text-muted-foreground">The foundation of our collaborative platform</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        icon: Code2,
                        title: "Quality First",
                        description: "Focus on meaningful contributions that add value to projects and help others learn."
                      },
                      {
                        icon: Users,
                        title: "Collaborative Spirit",
                        description: "Work together, share knowledge, and support fellow students in their learning journey."
                      },
                      {
                        icon: BookOpen,
                        title: "Continuous Learning",
                        description: "Embrace opportunities to learn new technologies and improve your skills through practice."
                      },
                      {
                        icon: Target,
                        title: "Project Impact",
                        description: "Contribute to projects that benefit the GECA community and demonstrate real-world application."
                      }
                    ].map((principle, index) => (
                      <div key={index} className="glass-card-elevated p-6">
                        <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4">
                          <principle.icon className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{principle.title}</h3>
                        <p className="text-muted-foreground">{principle.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === "conduct" && (
                <div className="space-y-8">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold gradient-text mb-4">Code of Conduct</h2>
                    <p className="text-muted-foreground">Maintaining a respectful and productive environment</p>
                  </div>

                  <div className="space-y-6">
                    {[
                      {
                        type: "positive",
                        title: "Do",
                        items: [
                          "Be respectful and supportive of all community members",
                          "Provide constructive feedback on contributions",
                          "Share knowledge and help others learn",
                          "Follow project contribution guidelines",
                          "Communicate clearly and professionally"
                        ]
                      },
                      {
                        type: "negative",
                        title: "Don't",
                        items: [
                          "Post disrespectful or harmful content",
                          "Discriminate based on any personal characteristics",
                          "Spam or make irrelevant contributions",
                          "Claim credit for others' work",
                          "Violate academic integrity policies"
                        ]
                      }
                    ].map((section, index) => (
                      <div key={index} className="glass-card-elevated p-8">
                        <div className="flex items-center gap-3 mb-6">
                          {section.type === "positive" ? (
                            <CheckCircle className="w-6 h-6 text-green-500" />
                          ) : (
                            <AlertTriangle className="w-6 h-6 text-red-500" />
                          )}
                          <h3 className="text-2xl font-semibold">{section.title}</h3>
                        </div>
                        <ul className="space-y-3">
                          {section.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                                section.type === "positive" ? "bg-green-500" : "bg-red-500"
                              }`} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === "eligibility" && (
                <div className="space-y-8">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold gradient-text mb-4">Recognition Eligibility</h2>
                    <p className="text-muted-foreground">How community recognition works</p>
                  </div>

                  <div className="space-y-6">
                    <div className="glass-card-elevated p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <Award className="w-6 h-6 text-primary" />
                        <h3 className="text-2xl font-semibold">Certificate Types</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          {
                            title: "Contributor Certificate",
                            description: "For students who make successful project contributions",
                            criteria: ["Complete approved contributions", "Follow project guidelines", "Maintain quality standards"]
                          },
                          {
                            title: "Project Admin Certificate",
                            description: "For students who lead and manage approved projects",
                            criteria: ["Successfully propose and lead projects", "Mentor team members", "Deliver project milestones"]
                          },
                          {
                            title: "Excellence Certificate",
                            description: "For outstanding contributions and leadership",
                            criteria: ["Demonstrate exceptional impact", "Show consistent high-quality work", "Support community growth"]
                          },
                          {
                            title: "Milestone Certificate",
                            description: "For achieving significant learning milestones",
                            criteria: ["Complete major project phases", "Master new technologies", "Achieve learning goals"]
                          }
                        ].map((cert, index) => (
                          <div key={index} className="border border-border/50 rounded-lg p-4">
                            <h4 className="font-semibold mb-2">{cert.title}</h4>
                            <p className="text-sm text-muted-foreground mb-3">{cert.description}</p>
                            <div className="space-y-1">
                              <p className="text-xs font-medium">Criteria:</p>
                              {cert.criteria.map((criterion, i) => (
                                <p key={i} className="text-xs text-muted-foreground">• {criterion}</p>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="glass-card-elevated p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <Target className="w-6 h-6 text-primary" />
                        <h3 className="text-2xl font-semibold">Recognition Process</h3>
                      </div>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Recognition is evaluated based on contribution quality, consistency, and community impact.
                          Our faculty mentors review contributions regularly to ensure fair and meaningful recognition.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {[
                            { step: "1", title: "Contribute", desc: "Make meaningful contributions to projects" },
                            { step: "2", title: "Review", desc: "Faculty evaluation of impact and quality" },
                            { step: "3", title: "Recognize", desc: "Receive appropriate certificates and acknowledgment" }
                          ].map((step, index) => (
                            <div key={index} className="text-center">
                              <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center mx-auto mb-2">
                                <span className="text-primary-foreground font-bold text-sm">{step.step}</span>
                              </div>
                              <h4 className="font-semibold">{step.title}</h4>
                              <p className="text-xs text-muted-foreground">{step.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "transparency" && (
                <div className="space-y-8">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold gradient-text mb-4">Transparency & Fairness</h2>
                    <p className="text-muted-foreground">Building trust through open processes</p>
                  </div>

                  <div className="space-y-6">
                    <div className="glass-card-elevated p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <CheckCircle className="w-6 h-6 text-primary" />
                        <h3 className="text-2xl font-semibold">Our Commitments</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          {
                            title: "Fair Evaluation",
                            description: "All contributions are evaluated consistently using clear, published criteria."
                          },
                          {
                            title: "Regular Reviews",
                            description: "Faculty mentors review contributions regularly to ensure timely recognition."
                          },
                          {
                            title: "Open Communication",
                            description: "We maintain transparent communication about platform updates and changes."
                          },
                          {
                            title: "Community Input",
                            description: "Student feedback helps shape our guidelines and recognition processes."
                          }
                        ].map((commitment, index) => (
                          <div key={index} className="flex gap-4">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <div>
                              <h4 className="font-semibold mb-1">{commitment.title}</h4>
                              <p className="text-sm text-muted-foreground">{commitment.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="glass-card-elevated p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <Heart className="w-6 h-6 text-primary" />
                        <h3 className="text-2xl font-semibold">Early-Stage Platform</h3>
                      </div>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          As a new platform, we're committed to transparency about our current stage and future development.
                          Our processes may evolve as the community grows.
                        </p>
                        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                          <p className="text-sm">
                            <strong>Current Status:</strong> We're an early-stage platform focused on GECA students.
                            Recognition criteria and processes are designed to be fair and may be refined based on community feedback and growth.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="px-4 py-20">
          <div className="container mx-auto">
            <div className="glass-card-elevated p-12 md:p-16 text-center max-w-4xl mx-auto">
              <div className="w-20 h-20 rounded-3xl gradient-bg flex items-center justify-center mx-auto mb-8">
                <MessageSquare className="w-10 h-10 text-primary-foreground" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Questions or Concerns?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Our community guidelines are designed to evolve with your feedback.
                Reach out if you have questions about contributing or recognition.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="gradient-bg text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover-lift hover:shadow-xl transition-all duration-300">
                  Contact Us
                </Button>
                <Button variant="outline" className="px-8 py-4 rounded-xl font-semibold text-lg hover-lift transition-all duration-300">
                  View Leaderboard
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Guidelines;