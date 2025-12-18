import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/leaderboard", label: "Leaderboard" },
  { to: "/certificates", label: "Certificates" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center group-hover:scale-105 transition-transform">
              <Code2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl gradient-text">CodeFest</span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={`nav-link ${location.pathname === link.to ? "active" : ""}`}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <Button className="gradient-bg hover:opacity-90 transition-opacity text-primary-foreground font-medium px-6">
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
              <Button className="gradient-bg text-primary-foreground font-medium mt-2 mx-4">
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
