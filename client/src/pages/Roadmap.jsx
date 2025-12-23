import { useState, useEffect } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import RoadmapCard from "@/components/Roadmap/RoadmapCard";
import { roadmapsAPI } from "@/lib/api";
import { Code2, Database, Cloud, Shield, Smartphone, Globe, ExternalLink, Github, BookOpen } from "lucide-react";

const Roadmap = () => {
  const [roadmapsData, setRoadmapsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const data = await roadmapsAPI.getAll();
        setRoadmapsData(Array.isArray(data) ? data : (data.roadmaps || []));
      } catch (error) {
        console.error("Error fetching roadmaps:", error);
        setRoadmapsData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmaps();
  }, []);

  // Expanded roadmap data for different tracks
  const learningTracks = [
    {
      id: "web-dev",
      title: "Web Development",
      icon: Globe,
      description: "Build modern web applications with HTML, CSS, JavaScript, and popular frameworks",
      difficulty: "Beginner to Advanced",
      duration: "6-12 months",
      color: "from-blue-500 to-cyan-500",
      steps: [
        { 
          title: "HTML & CSS Fundamentals", 
          description: "Learn semantic HTML and modern CSS techniques",
          resources: [
            { name: "MDN Web Docs", url: "https://developer.mozilla.org/" },
            { name: "CSS Tricks", url: "https://css-tricks.com/" }
          ]
        },
        { 
          title: "JavaScript Essentials", 
          description: "Master JavaScript programming and DOM manipulation",
          resources: [
            { name: "JavaScript.info", url: "https://javascript.info/" },
            { name: "freeCodeCamp JS", url: "https://www.freecodecamp.org/learn/javascript/" }
          ]
        },
        { 
          title: "Frontend Frameworks", 
          description: "React, Vue.js, or Angular development",
          resources: [
            { name: "React Docs", url: "https://react.dev/" },
            { name: "Vue Guide", url: "https://vuejs.org/guide/" }
          ]
        },
        { 
          title: "Backend Development", 
          description: "Node.js, Express, and API design",
          resources: [
            { name: "Node.js Docs", url: "https://nodejs.org/docs/" },
            { name: "Express Guide", url: "https://expressjs.com/" }
          ]
        },
        { 
          title: "Full-Stack Projects", 
          description: "Build complete web applications",
          resources: [
            { name: "The Odin Project", url: "https://www.theodinproject.com/" },
            { name: "Full Stack Open", url: "https://fullstackopen.com/" }
          ]
        },
        { 
          title: "Advanced Topics", 
          description: "Performance, security, and deployment",
          resources: [
            { name: "Web Dev Performance", url: "https://web.dev/" },
            { name: "OWASP Security", url: "https://owasp.org/" }
          ]
        }
      ]
    },
    {
      id: "mobile-dev",
      title: "Mobile App Development",
      icon: Smartphone,
      description: "Create native and cross-platform mobile applications",
      difficulty: "Intermediate",
      duration: "4-8 months",
      color: "from-green-500 to-emerald-500",
      steps: [
        { 
          title: "Mobile UI/UX Design", 
          description: "Design principles for mobile interfaces",
          resources: [
            { name: "Material Design", url: "https://material.io/" },
            { name: "Apple HIG", url: "https://developer.apple.com/design/human-interface-guidelines/" }
          ]
        },
        { 
          title: "React Native Basics", 
          description: "Cross-platform mobile development",
          resources: [
            { name: "React Native Docs", url: "https://reactnative.dev/" },
            { name: "Expo Docs", url: "https://docs.expo.dev/" }
          ]
        },
        { 
          title: "Native Android/iOS", 
          description: "Platform-specific development",
          resources: [
            { name: "Android Dev", url: "https://developer.android.com/" },
            { name: "iOS Dev", url: "https://developer.apple.com/swift/" }
          ]
        },
        { 
          title: "App Store Deployment", 
          description: "Publishing and distribution",
          resources: [
            { name: "Play Store Guide", url: "https://play.google.com/console/" },
            { name: "App Store Guide", url: "https://appstoreconnect.apple.com/" }
          ]
        },
        { 
          title: "Advanced Features", 
          description: "Push notifications, offline support",
          resources: [
            { name: "Firebase Docs", url: "https://firebase.google.com/docs" },
            { name: "React Query", url: "https://tanstack.com/query/" }
          ]
        },
        { 
          title: "Performance Optimization", 
          description: "App performance and user experience",
          resources: [
            { name: "Android Performance", url: "https://developer.android.com/topic/performance" },
            { name: "iOS Performance", url: "https://developer.apple.com/performance/" }
          ]
        }
      ]
    },
    {
      id: "data-science",
      title: "Data Science & ML",
      icon: Database,
      description: "Analyze data and build machine learning models",
      difficulty: "Intermediate to Advanced",
      duration: "6-12 months",
      color: "from-purple-500 to-pink-500",
      steps: [
        { 
          title: "Python for Data Science", 
          description: "Python programming and data manipulation",
          resources: [
            { name: "Python Docs", url: "https://docs.python.org/" },
            { name: "Pandas Docs", url: "https://pandas.pydata.org/docs/" }
          ]
        },
        { 
          title: "Statistics & Mathematics", 
          description: "Statistical analysis and probability",
          resources: [
            { name: "Khan Academy Stats", url: "https://www.khanacademy.org/math/statistics-probability" },
            { name: "3Blue1Brown", url: "https://www.3blue1brown.com/" }
          ]
        },
        { 
          title: "Machine Learning", 
          description: "Supervised and unsupervised learning",
          resources: [
            { name: "Scikit-learn", url: "https://scikit-learn.org/" },
            { name: "Google ML Crash Course", url: "https://developers.google.com/machine-learning/crash-course" }
          ]
        },
        { 
          title: "Deep Learning", 
          description: "Neural networks and AI models",
          resources: [
            { name: "TensorFlow", url: "https://www.tensorflow.org/" },
            { name: "PyTorch", url: "https://pytorch.org/" }
          ]
        },
        { 
          title: "Data Visualization", 
          description: "Creating insightful data visualizations",
          resources: [
            { name: "Matplotlib", url: "https://matplotlib.org/" },
            { name: "Plotly", url: "https://plotly.com/python/" }
          ]
        },
        { 
          title: "Real-world Projects", 
          description: "Applied data science projects",
          resources: [
            { name: "Kaggle", url: "https://www.kaggle.com/" },
            { name: "Hugging Face", url: "https://huggingface.co/" }
          ]
        }
      ]
    },
    {
      id: "devops",
      title: "DevOps & Cloud",
      icon: Cloud,
      description: "Master deployment, automation, and cloud infrastructure",
      difficulty: "Intermediate to Advanced",
      duration: "4-8 months",
      color: "from-orange-500 to-red-500",
      steps: [
        { 
          title: "Version Control & Git", 
          description: "Advanced Git workflows and collaboration",
          resources: [
            { name: "Git Documentation", url: "https://git-scm.com/doc" },
            { name: "Atlassian Git Tutorials", url: "https://www.atlassian.com/git/tutorials" }
          ]
        },
        { 
          title: "CI/CD Pipelines", 
          description: "Automated testing and deployment",
          resources: [
            { name: "GitHub Actions", url: "https://docs.github.com/en/actions" },
            { name: "Jenkins", url: "https://www.jenkins.io/" }
          ]
        },
        { 
          title: "Containerization", 
          description: "Docker and container orchestration",
          resources: [
            { name: "Docker Docs", url: "https://docs.docker.com/" },
            { name: "Kubernetes", url: "https://kubernetes.io/docs/" }
          ]
        },
        { 
          title: "Cloud Platforms", 
          description: "AWS, Azure, or GCP fundamentals",
          resources: [
            { name: "AWS Free Tier", url: "https://aws.amazon.com/free/" },
            { name: "Google Cloud", url: "https://cloud.google.com/docs" }
          ]
        },
        { 
          title: "Infrastructure as Code", 
          description: "Automated infrastructure management",
          resources: [
            { name: "Terraform", url: "https://www.terraform.io/" },
            { name: "Ansible", url: "https://docs.ansible.com/" }
          ]
        },
        { 
          title: "Monitoring & Security", 
          description: "System monitoring and security practices",
          resources: [
            { name: "Prometheus", url: "https://prometheus.io/" },
            { name: "OWASP DevOps", url: "https://owasp.org/" }
          ]
        }
      ]
    },
    {
      id: "cybersecurity",
      title: "Cybersecurity",
      icon: Shield,
      description: "Learn ethical hacking, security practices, and threat prevention",
      difficulty: "Intermediate to Advanced",
      duration: "6-12 months",
      color: "from-red-500 to-pink-500",
      steps: [
        { 
          title: "Security Fundamentals", 
          description: "Basic security concepts and principles",
          resources: [
            { name: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten/" },
            { name: "Security Academy", url: "https://www.cybrary.it/" }
          ]
        },
        { 
          title: "Network Security", 
          description: "Network protocols and security measures",
          resources: [
            { name: "Wireshark", url: "https://www.wireshark.org/" },
            { name: "TryHackMe", url: "https://tryhackme.com/" }
          ]
        },
        { 
          title: "Web Application Security", 
          description: "OWASP top 10 and secure coding",
          resources: [
            { name: "OWASP WebGoat", url: "https://owasp.org/www-project-webgoat/" },
            { name: "HackTheBox", url: "https://www.hackthebox.com/" }
          ]
        },
        { 
          title: "Ethical Hacking", 
          description: "Penetration testing and vulnerability assessment",
          resources: [
            { name: "CEH Prep", url: "https://www.eccouncil.org/" },
            { name: "Metasploit", url: "https://www.metasploit.com/" }
          ]
        },
        { 
          title: "Cryptography", 
          description: "Encryption and secure communication",
          resources: [
            { name: "Crypto101", url: "https://www.crypto101.io/" },
            { name: "Khan Academy Crypto", url: "https://www.khanacademy.org/" }
          ]
        },
        { 
          title: "Incident Response", 
          description: "Security incident handling and recovery",
          resources: [
            { name: "NIST Incident Response", url: "https://csrc.nist.gov/" },
            { name: "IR Best Practices", url: "https://www.sans.org/" }
          ]
        }
      ]
    },
    {
      id: "software-eng",
      title: "Software Engineering",
      icon: Code2,
      description: "Professional software development practices and methodologies",
      difficulty: "Intermediate",
      duration: "4-8 months",
      color: "from-indigo-500 to-purple-500",
      steps: [
        { 
          title: "Software Design Patterns", 
          description: "Common design patterns and architecture",
          resources: [
            { name: "Refactoring.Guru", url: "https://refactoring.guru/" },
            { name: "Design Patterns", url: "https://www.patterns.dev/" }
          ]
        },
        { 
          title: "Testing & Quality Assurance", 
          description: "Unit testing, integration testing",
          resources: [
            { name: "Jest Testing", url: "https://jestjs.io/" },
            { name: "Testing Library", url: "https://testing-library.com/" }
          ]
        },
        { 
          title: "Agile Methodologies", 
          description: "Scrum, Kanban, and agile practices",
          resources: [
            { name: "Scrum Guide", url: "https://scrumguides.org/" },
            { name: "Atlassian Agile", url: "https://www.atlassian.com/agile" }
          ]
        },
        { 
          title: "Code Quality", 
          description: "Clean code, refactoring, and best practices",
          resources: [
            { name: "Clean Code", url: "https://www.oreilly.com/" },
            { name: "Code Review Best Practices", url: "https://google.github.io/eng-practices/" }
          ]
        },
        { 
          title: "API Design", 
          description: "RESTful APIs and microservices",
          resources: [
            { name: "REST Guidelines", url: "https://restfulapi.net/" },
            { name: "API Design Patterns", url: "https://microservices.io/" }
          ]
        },
        { 
          title: "Project Management", 
          description: "Leading development teams and projects",
          resources: [
            { name: "Project Management Institute", url: "https://www.pmi.org/" },
            { name: "Agile Alliance", url: "https://www.agilealliance.org/" }
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background main-bg-pattern">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Header Section */}
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6 animate-fade-in">
            <Code2 className="w-5 h-5 text-primary" />
            <span className="text-primary text-sm font-medium">Learning Paths</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold gradient-text leading-tight animate-fade-in">
            Learning Roadmaps
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed animate-fade-in">
            Comprehensive learning paths designed for GECA students. Each track includes curated resources,
            practical projects, and milestones to guide your development journey.
          </p>
          
          {/* Add a subtle divider */}
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-full mx-auto mt-8 animate-fade-in" />
        </div>

        {/* Learning Tracks Grid */}
        <div className="space-y-12">
          {learningTracks.map((track, index) => (
            <div key={track.id} className="opacity-0 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="glass-card-elevated p-8 md:p-12">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Track Header */}
                  <div className="lg:w-1/3">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${track.color} flex items-center justify-center mb-6`}>
                      <track.icon className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold gradient-text mb-4">{track.title}</h2>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{track.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Difficulty:</span>
                        <span className="text-sm text-muted-foreground">{track.difficulty}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Duration:</span>
                        <span className="text-sm text-muted-foreground">{track.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Learning Steps */}
                  <div className="lg:w-2/3">
                    <h3 className="text-xl font-semibold mb-6">Learning Path</h3>
                    <div className="space-y-4">
                      {track.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${track.color} flex items-center justify-center text-white font-bold text-sm`}>
                              {stepIndex + 1}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold mb-2">{step.title}</h4>
                            <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                            {step.resources && step.resources.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {step.resources.map((resource) => (
                                  <a
                                    key={resource.url}
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 rounded-md text-xs text-primary transition-colors"
                                  >
                                    <ExternalLink className="w-3 h-3" />
                                    {resource.name}
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        <strong>Note:</strong> These are curated learning paths, not proprietary courses.
                        Resources include free online tutorials, documentation, and community-contributed materials.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub Tutorials Section (keeping existing) */}
        {roadmapsData.length > 0 && (
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold gradient-text mb-4">GitHub Learning Tracks</h2>
              <p className="text-muted-foreground">Hands-on tutorials for mastering GitHub workflows</p>
            </div>
            <div className="space-y-8">
              {roadmapsData.map((roadmap, index) => (
                <div key={index} className="opacity-0 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <RoadmapCard roadmap={roadmap} />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Roadmap;
