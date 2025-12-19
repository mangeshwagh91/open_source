import { useState } from "react";
import { Send, CheckCircle, User, Mail, MessageSquare, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { contactAPI } from "@/lib/api";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await contactAPI.create(formData);
      
      setIsSubmitted(true);

      toast({
        title: "Message Sent Successfully! 🎉",
        description: "Thank you for reaching out. We'll get back to you within 24 hours.",
      });

      setTimeout(() => {
        setFormData({ name: "", email: "", subject: "", message: "" });
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="glass-card-elevated p-12 text-center animate-scale-in">
        <div className="w-20 h-20 rounded-3xl gradient-bg flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-primary-foreground" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-4">
          Message Sent Successfully!
        </h3>
        <p className="text-muted-foreground text-lg leading-relaxed mb-6">
          Thank you for reaching out to CodeFest. We've received your message and will get back to you within 24 hours.
        </p>
        <div className="flex items-center justify-center gap-2 text-primary font-medium">
          <CheckCircle className="w-5 h-5" />
          <span>Your message has been delivered to our support team</span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card-elevated p-8 md:p-10">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-2">Get in Touch</h3>
          <p className="text-muted-foreground">
            We'd love to hear from you. Fill out the form below and we'll respond as soon as possible.
          </p>
        </div>

        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-3">
            Full Name *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="w-5 h-5 text-muted-foreground" />
            </div>
            <Input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`pl-12 bg-background/50 border-border/50 focus:border-primary transition-all duration-300 ${
                errors.name ? "border-red-500 focus:border-red-500" : ""
              }`}
            />
          </div>
          {errors.name && (
            <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{errors.name}</span>
            </div>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-3">
            Email Address *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="w-5 h-5 text-muted-foreground" />
            </div>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className={`pl-12 bg-background/50 border-border/50 focus:border-primary transition-all duration-300 ${
                errors.email ? "border-red-500 focus:border-red-500" : ""
              }`}
            />
          </div>
          {errors.email && (
            <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{errors.email}</span>
            </div>
          )}
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor="subject" className="block text-sm font-semibold text-foreground mb-3">
            Subject *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MessageSquare className="w-5 h-5 text-muted-foreground" />
            </div>
            <Input
              id="subject"
              name="subject"
              type="text"
              required
              value={formData.subject}
              onChange={handleChange}
              placeholder="What's this about?"
              className={`pl-12 bg-background/50 border-border/50 focus:border-primary transition-all duration-300 ${
                errors.subject ? "border-red-500 focus:border-red-500" : ""
              }`}
            />
          </div>
          {errors.subject && (
            <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{errors.subject}</span>
            </div>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-3">
            Message *
          </label>
          <Textarea
            id="message"
            name="message"
            required
            rows={6}
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us how we can help you..."
            className={`bg-background/50 border-border/50 focus:border-primary transition-all duration-300 resize-none ${
              errors.message ? "border-red-500 focus:border-red-500" : ""
            }`}
          />
          <div className="flex justify-between items-center mt-2">
            {errors.message ? (
              <div className="flex items-center gap-2 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.message}</span>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                Minimum 10 characters required
              </div>
            )}
            <div className="text-sm text-muted-foreground">
              {formData.message.length}/500
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full gradient-bg text-primary-foreground hover:opacity-90 transition-all duration-300 font-semibold py-6 text-lg hover-lift hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-3">
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Sending your message...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-3">
              <Send className="w-5 h-5" />
              Send Message
            </span>
          )}
        </Button>

        {/* Privacy Notice */}
        <div className="text-center pt-4 border-t border-border/30">
          <p className="text-sm text-muted-foreground">
            We respect your privacy. Your information will only be used to respond to your inquiry and will never be shared with third parties.
          </p>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
