import {
  Mail,
  MapPin,
  Phone,
  MessageSquare,
  Clock,
  Globe,
  Twitter,
  Github,
  Linkedin,
  MessageCircle,
  HelpCircle,
  Send,
  CheckCircle,
  ArrowRight,
  Users,
  Zap,
  Shield,
  Heart
} from "lucide-react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ContactForm from "@/components/Contact/ContactForm";

const contactMethods = [
  {
    icon: Mail,
    title: "Email Support",
    primary: "contact@geca.edu.in",
    secondary: "For platform inquiries",
    description: "Send us an email for questions about the platform, projects, or general support",
    color: "from-blue-500 to-cyan-500",
    available: "Within 2-3 business days"
  },
  {
    icon: MessageSquare,
    title: "Community Discord",
    primary: "GECA Dev Community",
    secondary: "Join our Discord server",
    description: "Connect with fellow students, get real-time help, and participate in discussions",
    color: "from-purple-500 to-pink-500",
    available: "Community-driven support"
  },
  {
    icon: Users,
    title: "Faculty Office Hours",
    primary: "Department Coordinators",
    secondary: "Scheduled meetings",
    description: "Meet with faculty mentors during designated office hours for project guidance",
    color: "from-green-500 to-emerald-500",
    available: "By appointment"
  },
  {
    icon: MapPin,
    title: "GECA Campus",
    primary: "Government Engineering College",
    secondary: "Sector 28, Gandhinagar",
    description: "Visit our campus for in-person meetings and events",
    color: "from-orange-500 to-red-500",
    available: "During college hours"
  }
];

const faqs = [
  {
    question: "Is GECA Platform new?",
    answer: "Yes, this is an early-stage platform developed by and for GECA students. We're building a collaborative environment for learning through real project work, and our processes may evolve as the community grows."
  },
  {
    question: "How are certificates evaluated and awarded?",
    answer: "Certificates are issued by faculty mentors based on contribution quality, consistency, and impact. We focus on meaningful participation rather than point accumulation. Recognition criteria are transparent and may be refined based on community feedback."
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
    answer: "We're in the early stages of building our community. As a new platform, we're focused on onboarding students, establishing best practices, and growing through collaborative projects. Your participation helps shape its future."
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
    description: "Follow us for updates and announcements",
    color: "hover:text-blue-500",
    url: "https://twitter.com/codefest"
  },
  {
    icon: Github,
    name: "GitHub",
    handle: "CodeFest",
    description: "Explore our open-source projects",
    color: "hover:text-gray-900",
    url: "https://github.com/codefest"
  },
  {
    icon: Linkedin,
    name: "LinkedIn",
    handle: "CodeFest Official",
    description: "Connect with our professional network",
    color: "hover:text-blue-700",
    url: "https://linkedin.com/company/codefest"
  },
  {
    icon: MessageCircle,
    name: "Discord",
    handle: "CodeFest Community",
    description: "Join our developer community",
    color: "hover:text-indigo-600",
    url: "https://discord.gg/codefest"
  }
];

const Contact = () => {
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
                <MessageSquare className="w-5 h-5 text-primary" />
                <span className="text-primary text-sm font-semibold">Get in Touch</span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold gradient-text leading-tight mb-8">
                Let's Build Something
                <span className="block mt-2">Amazing Together</span>
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12">
                Have questions about CodeFest? Want to partner with us? Need technical support? We're here to help you succeed in your open-source journey.
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-8 mb-12">
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">Community</div>
                  <div className="text-sm text-muted-foreground">Driven Support</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">2-3 Days</div>
                  <div className="text-sm text-muted-foreground">Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text">Growing</div>
                  <div className="text-sm text-muted-foreground">Student Community</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Methods Grid */}
        <section className="px-4 py-16">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Multiple Ways to <span className="gradient-text">Connect</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Choose the contact method that works best for you. Our team is ready to assist with any questions or concerns.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {contactMethods.map((method, index) => (
                <div
                  key={method.title}
                  className="glass-card-elevated p-8 hover-lift group relative overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  <div className="flex items-start gap-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${method.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <method.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {method.title}
                      </h3>
                      <div className="space-y-1 mb-3">
                        <div className="font-semibold text-foreground">{method.primary}</div>
                        <div className="text-muted-foreground">{method.secondary}</div>
                      </div>
                      <p className="text-muted-foreground mb-3">{method.description}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-primary font-medium">{method.available}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="px-4 py-16 bg-muted/20">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Contact Form */}
              <div className="lg:col-span-3">
                <div className="mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Send us a <span className="gradient-text">Message</span>
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Fill out the form below and we'll get back to you within 24 hours. For urgent matters, please use our live chat or phone support.
                  </p>
                </div>
                <ContactForm />
              </div>

              {/* Additional Info */}
              <div className="lg:col-span-2 space-y-8">
                {/* Quick Help */}
                <div className="glass-card-elevated p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                      <Zap className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Quick Help</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-foreground">Technical Support</div>
                        <div className="text-sm text-muted-foreground">Get help with platform issues</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-foreground">Mentor Matching</div>
                        <div className="text-sm text-muted-foreground">Find the right mentor for your project</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-foreground">Partnership Inquiries</div>
                        <div className="text-sm text-muted-foreground">Collaborate with CodeFest</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="glass-card-elevated p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Office Hours</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Monday - Friday</span>
                      <span className="font-semibold text-foreground">9:00 AM - 6:00 PM EST</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Saturday</span>
                      <span className="font-semibold text-foreground">10:00 AM - 4:00 PM EST</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Sunday</span>
                      <span className="font-semibold text-foreground">Closed</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                    <div className="flex items-center gap-2 text-primary font-medium">
                      <Shield className="w-4 h-4" />
                      Emergency support available 24/7
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-4 py-20">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Frequently Asked <span className="gradient-text">Questions</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Find quick answers to common questions about CodeFest. Can't find what you're looking for? Contact us directly.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="glass-card-elevated p-8 hover-lift"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0 mt-1">
                      <HelpCircle className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-3">
                        {faq.question}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Media Section */}
        <section className="px-4 py-16 bg-muted/20">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Join Our <span className="gradient-text">Community</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Connect with thousands of developers worldwide. Follow us for updates, share your progress, and be part of the conversation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card-elevated p-6 hover-lift group text-center"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <social.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {social.name}
                  </h3>
                  <div className="text-primary font-medium mb-2">{social.handle}</div>
                  <p className="text-muted-foreground text-sm mb-4">{social.description}</p>
                  <div className="flex items-center justify-center gap-2 text-primary font-medium group-hover:gap-3 transition-all duration-300">
                    <span>Follow us</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="px-4 py-20">
          <div className="container mx-auto">
            <div className="glass-card-elevated p-12 md:p-16 text-center max-w-4xl mx-auto">
              <div className="w-20 h-20 rounded-3xl gradient-bg flex items-center justify-center mx-auto mb-8">
                <Heart className="w-10 h-10 text-primary-foreground" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join CodeFest today and become part of a global community of developers making a difference through open-source contributions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="gradient-bg text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg hover-lift hover:shadow-xl transition-all duration-300 flex items-center gap-2">
                  Apply Now
                  <ArrowRight className="w-5 h-5" />
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

export default Contact;