import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/leaderboard", label: "Leaderboard" },
  { to: "/certificates", label: "Certificates" },
  { to: "/roadmap", label: "Roadmap" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/30 shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-white/90 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-105 transition-all duration-300 shadow-lg">
                <Code2 className="w-6 h-6 text-white drop-shadow-sm" />
              </div>
              <div className="absolute inset-0 w-11 h-11 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
            </div>
            <span className="font-bold text-2xl gradient-text group-hover:scale-105 transition-transform duration-300">CodeFest</span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={`nav-link relative px-3 py-2 rounded-lg transition-all duration-300 group ${
                  location.pathname === link.to ? "active" : "hover:bg-muted/50"
                }`}
              >
                {link.label}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full" />
              </NavLink>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <Button className="btn-gradient hover:opacity-90 transition-opacity text-primary-foreground font-medium px-6 shadow-lg">
              Register Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === link.to
                      ? "bg-primary/10 text-primary font-medium"
                      : "hover:bg-muted"
                  }`}
                >
                  {link.label}
                </NavLink>
              ))}
              <Button className="btn-gradient text-primary-foreground font-medium mt-2 mx-4 shadow-lg">
                Register Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
