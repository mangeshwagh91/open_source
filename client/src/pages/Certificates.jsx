import {
  Award,
  FileCheck,
  Download,
  Share2,
  Search,
  Filter,
  Trophy,
  Star,
  CheckCircle,
  Shield,
  Eye,
  Calendar,
  Users,
  TrendingUp,
  Medal,
  Crown,
  Zap,
  Target,
  ChevronRight,
  ExternalLink,
  Copy,
  Check
} from "lucide-react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import CertificateCard from "@/components/Certificates/CertificateCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useMemo, useEffect } from "react";
import { certificatesAPI } from "@/lib/api";

const stats = [
  {
    icon: Award,
    value: "Community-Issued",
    label: "Certificates",
    description: "Earned through project contributions and learning milestones"
  },
  {
    icon: Users,
    value: "Transparent",
    label: "Evaluation",
    description: "Clear criteria for earning recognition and certificates"
  },
  {
    icon: TrendingUp,
    value: "Growing",
    label: "Recognition",
    description: "Expanding opportunities for student achievements"
  },
  {
    icon: Target,
    value: "Portfolio-Ready",
    label: "Credentials",
    description: "Professional certificates for your academic and career development"
  }
];

const Certificates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [certificatesData, setCertificatesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const data = await certificatesAPI.getAll();
        setCertificatesData(Array.isArray(data) ? data : (data.certificates || []));
      } catch (error) {
        console.error("Error fetching certificates:", error);
        setCertificatesData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const certificateTypes = useMemo(() => [
    {
      type: "participation",
      title: "Contributor Certificate",
      description: "Awarded to all GECA students who make successful contributions to projects",
      icon: CheckCircle,
      color: "from-blue-500 to-cyan-500",
      count: Array.isArray(certificatesData) ? certificatesData.filter(cert => cert.type === "participation").length : 0
    },
    {
      type: "excellence",
      title: "Excellence Certificate",
      description: "Special recognition for outstanding contributions and leadership in platform activities",
      icon: Crown,
      color: "from-amber-500 to-orange-500",
      count: Array.isArray(certificatesData) ? certificatesData.filter(cert => cert.type === "excellence").length : 0
    },
    {
      type: "admin",
      title: "Project Admin Certificate",
      description: "Recognition for students who successfully led and managed approved projects",
      icon: Star,
      color: "from-purple-500 to-pink-500",
      count: Array.isArray(certificatesData) ? certificatesData.filter(cert => cert.type === "admin").length : 0
    },
    {
      type: "completion",
      title: "Milestone Certificate",
      description: "For students who achieve significant learning milestones and project completions",
      icon: Trophy,
      color: "from-emerald-500 to-teal-500",
      count: Array.isArray(certificatesData) ? certificatesData.filter(cert => cert.type === "completion").length : 0
    }
  ], [certificatesData]);

  // Filter certificates based on search and type
  const filteredCertificates = useMemo(() => {
    if (!Array.isArray(certificatesData)) return [];
    return certificatesData.filter(certificate => {
      const matchesSearch = certificate.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           certificate.recipient.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === "all" || certificate.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [searchQuery, selectedType]);

  return (
    <div className="min-h-screen bg-background main-bg-pattern">
      <Navbar />

      <main className="pt-24 pb-20">
        {/* Statistics Dashboard */}
        <section className="px-4 py-16">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6 animate-fade-in">
                <Award className="w-5 h-5 text-primary" />
                <span className="text-primary text-sm font-medium">Achievement Recognition</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in">
                Student <span className="gradient-text">Recognition</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in">
                Celebrating GECA students' achievements through certificates and trophies for their project contributions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="glass-card-elevated p-8 text-center hover-lift group opacity-0 animate-fade-in"
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

        {/* Certificate Types Overview */}
        <section className="px-4 py-16 bg-muted/20">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in">
                Certificate <span className="gradient-text">Types</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in">
                Different levels of recognition based on your contributions and achievements on the GECA platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {certificateTypes.map((certType, index) => (
                <div
                  key={certType.type}
                  className="glass-card-elevated p-8 hover-lift group relative overflow-hidden opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${certType.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  <div className="flex items-start gap-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${certType.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <certType.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {certType.title}
                        </h3>
                        <Badge variant="secondary" className="text-sm">
                          {certType.count} issued
                        </Badge>
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {certType.description}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-primary font-medium">
                        <Shield className="w-4 h-4" />
                        <span>Verifiable & Shareable</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certificate Gallery */}
        <section className="px-4 py-20">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in">
                Certificate <span className="gradient-text">Gallery</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in">
                Browse through our collection of achievement certificates. Each certificate represents dedication, skill, and contribution to the open-source community.
              </p>
            </div>

            {/* Search and Filter Controls */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search certificates by name or recipient..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-background/50 border-border/50 focus:border-primary"
                  />
                </div>

                {/* Type Filter */}
                <div className="flex gap-2">
                  <Button
                    variant={selectedType === "all" ? "default" : "outline"}
                    onClick={() => setSelectedType("all")}
                    className="whitespace-nowrap"
                  >
                    All Types
                  </Button>
                  {certificateTypes.map((type) => (
                    <Button
                      key={type.type}
                      variant={selectedType === type.type ? "default" : "outline"}
                      onClick={() => setSelectedType(type.type)}
                      className="whitespace-nowrap"
                    >
                      {type.title.split(' ')[0]}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="text-center mb-8">
              <p className="text-muted-foreground">
                Showing {filteredCertificates.length} of {certificatesData.length} certificates
              </p>
            </div>

            {/* Certificate Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {filteredCertificates.map((certificate, index) => (
                <CertificateCard
                  key={certificate.id}
                  certificate={certificate}
                  delay={0.1 * index}
                />
              ))}
            </div>

            {filteredCertificates.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No certificates found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </section>

        {/* Verification Section */}
        <section className="px-4 py-16 bg-muted/20">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Certificate <span className="gradient-text">Verification</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  All CodeFest certificates are digitally signed and can be verified instantly
                </p>
              </div>

              <div className="glass-card-elevated p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Digital Signature</h3>
                    <p className="text-sm text-muted-foreground">
                      Each certificate is cryptographically signed to prevent forgery
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
                      <Eye className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Instant Verification</h3>
                    <p className="text-sm text-muted-foreground">
                      Verify any certificate using our online verification portal
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
                      <ExternalLink className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Share & Showcase</h3>
                    <p className="text-sm text-muted-foreground">
                      Share your verified certificates on LinkedIn and other platforms
                    </p>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-primary/5 rounded-xl border border-primary/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Verify a Certificate</h4>
                      <p className="text-sm text-muted-foreground">Enter the certificate ID to verify its authenticity</p>
                    </div>
                    <Button variant="outline" className="hover-lift">
                      Verify Now
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
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
                <Trophy className="w-10 h-10 text-primary-foreground" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ready to Earn Your Certificate?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join CodeFest today and start your journey towards earning a recognized certificate that showcases your open-source contributions and skills.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="gradient-bg text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover-lift hover:shadow-xl transition-all duration-300 flex items-center gap-2">
                  Join CodeFest
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

export default Certificates;