import {
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Twitter,
  Github,
  Linkedin,
  MessageCircle,
  HelpCircle,
  ArrowRight,
  Users,
  CheckCircle2
} from "lucide-react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ContactForm from "@/components/Contact/ContactForm";

const contactMethods = [
  {
    icon: Mail,
    title: "Email Support",
    value: "contact@geca.edu.in",
    description: "For platform inquiries",
    responseTime: "Within 2-3 business days"
  },
  {
    icon: MessageSquare,
    title: "Discord Community",
    value: "Join our server",
    description: "Real-time help & discussions",
    responseTime: "Community support"
  },
  {
    icon: Users,
    title: "Office Hours",
    value: "Mon-Fri, 9 AM - 6 PM",
    description: "Meet with faculty mentors",
    responseTime: "By appointment"
  },
  {
    icon: MapPin,
    title: "Visit Campus",
    value: "GECA Sector 28",
    description: "In-person meetings & events",
    responseTime: "College hours"
  }
];

const faqs = [
  {
    question: "Is GECA Platform new?",
    answer: "Yes, this is an early-stage platform developed by and for GECA students. We're building a collaborative environment for learning through real project work, and our processes may evolve as the community grows."
  },
  {
    question: "How are certificates evaluated and awarded?",
    answer: "Certificates are issued by faculty mentors based on contribution quality, consistency, and impact. We focus on meaningful participation rather than point accumulation."
  },
  {
    question: "Who runs and maintains the platform?",
    answer: "The platform is maintained by GECA faculty and student developers. It's designed as a learning tool for our college community, with faculty oversight to ensure quality and fairness."
  },
  {
    question: "Is this platform free to use?",
    answer: "Yes, the platform is completely free for all GECA students. We believe in providing accessible learning opportunities without financial barriers."
  },
  {
    question: "What stage is the GECA student community in?",
    answer: "We're in the early stages of building our community. As a new platform, we're focused on onboarding students, establishing best practices, and growing through collaborative projects."
  },
  {
    question: "How can I get involved in platform development?",
    answer: "If you're interested in contributing to the platform itself, reach out to faculty coordinators. We welcome student developers who want to help improve the tools we all use for learning."
  }
];

const socialLinks = [
  {
    icon: Twitter,
    name: "Twitter",
    handle: "@CodeFest",
    url: "https://twitter.com/codefest"
  },
  {
    icon: Github,
    name: "GitHub",
    handle: "CodeFest",
    url: "https://github.com/codefest"
  },
  {
    icon: Linkedin,
    name: "LinkedIn",
    handle: "CodeFest Official",
    url: "https://linkedin.com/company/codefest"
  },
  {
    icon: MessageCircle,
    name: "Discord",
    handle: "CodeFest Community",
    url: "https://discord.gg/codefest"
  }
];

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 pb-16">
        {/* Simple Header Section */}
        <section className="px-4 py-12">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Get in <span className="gradient-text">Touch</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Have questions? We're here to help. Choose how you'd like to reach out.
              </p>
            </div>

            {/* Contact Methods - Compact Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {contactMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <div
                    key={method.title}
                    className="glass-card-elevated p-6 hover-lift transition-all"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className="w-6 h-6 text-primary" />
                      <h3 className="font-semibold text-foreground">
                        {method.title}
                      </h3>
                    </div>
                    <p className="text-sm font-medium text-primary mb-1">
                      {method.value}
                    </p>
                    <p className="text-xs text-muted-foreground mb-2">
                      {method.description}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {method.responseTime}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="px-4 py-16 bg-muted/30">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {/* Form Column */}
              <div className="lg:col-span-2">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-foreground mb-3">
                    Send us a <span className="gradient-text">Message</span>
                  </h2>
                  <p className="text-muted-foreground">
                    Fill out the form and we'll respond within 24 hours.
                  </p>
                </div>
                <ContactForm />
              </div>

              {/* Quick Info Sidebar */}
              <div className="space-y-6">
                {/* Quick Links */}
                <div className="glass-card-elevated p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    Quick Help
                  </h3>
                  <div className="space-y-3">
                    {[
                      { title: "Technical Support", desc: "Platform issues" },
                      { title: "Mentor Matching", desc: "Project guidance" },
                      { title: "Partnership", desc: "Collaboration" }
                    ].map((item) => (
                      <div key={item.title} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-foreground text-sm">
                            {item.title}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Office Hours */}
                <div className="glass-card-elevated p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    Office Hours
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Mon - Fri</span>
                      <span className="font-medium text-foreground">9 AM - 6 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saturday</span>
                      <span className="font-medium text-foreground">10 AM - 4 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sunday</span>
                      <span className="font-medium text-foreground">Closed</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      Emergency support available 24/7
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-4 py-20">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Frequently Asked <span className="gradient-text">Questions</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Find answers to common questions about the platform and community.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="glass-card-elevated p-6 hover-lift transition-all"
                >
                  <div className="flex items-start gap-4">
                    <HelpCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Links Section */}
        <section className="px-4 py-16 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Join Our <span className="gradient-text">Community</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Follow us for updates and connect with other developers.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card-elevated p-6 hover-lift transition-all text-center group"
                  >
                    <Icon className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-foreground text-sm mb-1">
                      {social.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {social.handle}
                    </p>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;