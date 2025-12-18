import { NavLink } from "react-router-dom";
import { Code2, Github, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="gradient-dark-bg text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">CodeFest</span>
            </div>
            <p className="text-primary-foreground/70 max-w-md mb-6">
              Empowering developers through open-source contribution. Join our community
              and make an impact in the world of technology.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <NavLink to="/" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Home
              </NavLink>
              <NavLink to="/about" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                About
              </NavLink>
              <NavLink to="/leaderboard" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Leaderboard
              </NavLink>
              <NavLink to="/certificates" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Certificates
              </NavLink>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Resources</h4>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Documentation
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Guidelines
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                FAQs
              </a>
              <NavLink to="/contact" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Contact Us
              </NavLink>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © {currentYear} CodeFest. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;