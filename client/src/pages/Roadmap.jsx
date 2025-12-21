import { useState, useEffect } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import RoadmapCard from "@/components/Roadmap/RoadmapCard";
import { roadmapsAPI } from "@/lib/api";
import { Code2, Database, Cloud, Shield, Smartphone, Globe } from "lucide-react";

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
        { title: "HTML & CSS Fundamentals", description: "Learn semantic HTML and modern CSS techniques" },
        { title: "JavaScript Essentials", description: "Master JavaScript programming and DOM manipulation" },
        { title: "Frontend Frameworks", description: "React, Vue.js, or Angular development" },
        { title: "Backend Development", description: "Node.js, Express, and API design" },
        { title: "Full-Stack Projects", description: "Build complete web applications" },
        { title: "Advanced Topics", description: "Performance, security, and deployment" }
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
        { title: "Mobile UI/UX Design", description: "Design principles for mobile interfaces" },
        { title: "React Native Basics", description: "Cross-platform mobile development" },
        { title: "Native Android/iOS", description: "Platform-specific development" },
        { title: "App Store Deployment", description: "Publishing and distribution" },
        { title: "Advanced Features", description: "Push notifications, offline support" },
        { title: "Performance Optimization", description: "App performance and user experience" }
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
        { title: "Python for Data Science", description: "Python programming and data manipulation" },
        { title: "Statistics & Mathematics", description: "Statistical analysis and probability" },
        { title: "Machine Learning", description: "Supervised and unsupervised learning" },
        { title: "Deep Learning", description: "Neural networks and AI models" },
        { title: "Data Visualization", description: "Creating insightful data visualizations" },
        { title: "Real-world Projects", description: "Applied data science projects" }
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
        { title: "Version Control & Git", description: "Advanced Git workflows and collaboration" },
        { title: "CI/CD Pipelines", description: "Automated testing and deployment" },
        { title: "Containerization", description: "Docker and container orchestration" },
        { title: "Cloud Platforms", description: "AWS, Azure, or GCP fundamentals" },
        { title: "Infrastructure as Code", description: "Automated infrastructure management" },
        { title: "Monitoring & Security", description: "System monitoring and security practices" }
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
        { title: "Security Fundamentals", description: "Basic security concepts and principles" },
        { title: "Network Security", description: "Network protocols and security measures" },
        { title: "Web Application Security", description: "OWASP top 10 and secure coding" },
        { title: "Ethical Hacking", description: "Penetration testing and vulnerability assessment" },
        { title: "Cryptography", description: "Encryption and secure communication" },
        { title: "Incident Response", description: "Security incident handling and recovery" }
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
        { title: "Software Design Patterns", description: "Common design patterns and architecture" },
        { title: "Testing & Quality Assurance", description: "Unit testing, integration testing" },
        { title: "Agile Methodologies", description: "Scrum, Kanban, and agile practices" },
        { title: "Code Quality", description: "Clean code, refactoring, and best practices" },
        { title: "API Design", description: "RESTful APIs and microservices" },
        { title: "Project Management", description: "Leading development teams and projects" }
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
                            <h4 className="font-semibold mb-1">{step.title}</h4>
                            <p className="text-sm text-muted-foreground">{step.description}</p>
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
