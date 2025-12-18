import { Mail, MapPin, Phone, MessageSquare } from "lucide-react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ContactForm from "@/components/Contact/ContactForm";

const Contact = () => {
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
                <MessageSquare className="w-4 h-4 text-primary" />
                <span className="text-primary text-sm font-medium">Get in Touch</span>
              </div>
              
              <h1 
                className="text-4xl md:text-5xl font-bold text-foreground mb-6 opacity-0 animate-fade-in"
                style={{ animationDelay: "0.1s" }}
              >
                <span className="gradient-text">Contact Us</span>
              </h1>
              
              <p 
                className="text-lg text-muted-foreground opacity-0 animate-fade-in"
                style={{ animationDelay: "0.2s" }}
              >
                Have questions about CodeFest? We'd love to hear from you.
                Send us a message and we'll respond as soon as possible.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Contact Info */}
              <div className="lg:col-span-2 space-y-6">
                <div 
                  className="glass-card p-6 hover-lift opacity-0 animate-fade-in"
                  style={{ animationDelay: "0.3s" }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Email</h3>
                      <p className="text-muted-foreground">contact@codefest.dev</p>
                      <p className="text-muted-foreground">support@codefest.dev</p>
                    </div>
                  </div>
                </div>

                <div 
                  className="glass-card p-6 hover-lift opacity-0 animate-fade-in"
                  style={{ animationDelay: "0.4s" }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                      <p className="text-muted-foreground text-sm">Mon-Fri, 9AM-6PM EST</p>
                    </div>
                  </div>
                </div>

                <div 
                  className="glass-card p-6 hover-lift opacity-0 animate-fade-in"
                  style={{ animationDelay: "0.5s" }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Location</h3>
                      <p className="text-muted-foreground">123 Developer Lane</p>
                      <p className="text-muted-foreground">San Francisco, CA 94102</p>
                    </div>
                  </div>
                </div>

                {/* FAQ Link */}
                <div 
                  className="glass-card-dark p-6 opacity-0 animate-fade-in"
                  style={{ animationDelay: "0.6s" }}
                >
                  <h3 className="font-semibold mb-2">Have Common Questions?</h3>
                  <p className="text-primary-foreground/70 text-sm mb-4">
                    Check out our FAQ section for quick answers to frequently asked questions.
                  </p>
                  <button className="text-primary-foreground underline underline-offset-4 text-sm font-medium hover:opacity-80 transition-opacity">
                    Visit FAQ →
                  </button>
                </div>
              </div>

              {/* Contact Form */}
              <div 
                className="lg:col-span-3 opacity-0 animate-fade-in"
                style={{ animationDelay: "0.4s" }}
              >
                <ContactForm />
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