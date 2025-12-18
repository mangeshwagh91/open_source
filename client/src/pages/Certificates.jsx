import { Award, FileCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CertificateCard from "@/components/CertificateCard";
import { certificatesData } from "@/data/certificatesData";

const Certificates = () => {
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
                <Award className="w-4 h-4 text-primary" />
                <span className="text-primary text-sm font-medium">Recognition</span>
              </div>
              
              <h1 
                className="text-4xl md:text-5xl font-bold text-foreground mb-6 opacity-0 animate-fade-in"
                style={{ animationDelay: "0.1s" }}
              >
                <span className="gradient-text">Certificates</span>
              </h1>
              
              <p 
                className="text-lg text-muted-foreground opacity-0 animate-fade-in"
                style={{ animationDelay: "0.2s" }}
              >
                Celebrate your achievements with official CodeFest certificates.
                Download and share your accomplishments with the world.
              </p>
            </div>
          </div>
        </section>

        {/* Info Card */}
        <section className="px-4 pb-12">
          <div className="container mx-auto max-w-4xl">
            <div 
              className="glass-card p-6 flex items-start gap-4 opacity-0 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                <FileCheck className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Certificate Verification
                </h3>
                <p className="text-muted-foreground text-sm">
                  All certificates are digitally signed and can be verified using
                  the unique certificate ID. Share your certificate link with potential
                  employers to validate your achievements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Certificate Grid */}
        <section className="px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {certificatesData.map((certificate, index) => (
                <CertificateCard
                  key={certificate.id}
                  certificate={certificate}
                  delay={0.4 + index * 0.1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Types of Certificates */}
        <section className="px-4 py-20">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Types of <span className="gradient-text">Certificates</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Earn different certificates based on your participation and achievements
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                {
                  type: "Participation",
                  description: "Awarded to all contributors who complete at least one successful PR",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  type: "Completion",
                  description: "For contributors who complete all program milestones",
                  color: "from-emerald-500 to-teal-500",
                },
                {
                  type: "Excellence",
                  description: "For top performers in each project category",
                  color: "from-amber-500 to-orange-500",
                },
                {
                  type: "Mentor",
                  description: "Special recognition for project mentors and guides",
                  color: "from-purple-500 to-pink-500",
                },
              ].map((item, index) => (
                <div
                  key={item.type}
                  className="glass-card p-6 text-center hover-lift opacity-0 animate-fade-in"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-4`}>
                    <Award className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.type}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Certificates;