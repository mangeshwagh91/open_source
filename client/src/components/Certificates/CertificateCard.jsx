import { Download, Award, Star, Trophy, CheckCircle, Share2, Eye, ExternalLink, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const getTypeIcon = (type) => {
  switch (type) {
    case "participation":
      return <Award className="w-8 h-8" />;
    case "mentor":
      return <Star className="w-8 h-8" />;
    case "topper":
      return <Trophy className="w-8 h-8" />;
    case "completion":
      return <CheckCircle className="w-8 h-8" />;
    default:
      return <Award className="w-8 h-8" />;
  }
};

const getTypeGradient = (type) => {
  switch (type) {
    case "participation":
      return "from-blue-500 to-cyan-500";
    case "mentor":
      return "from-purple-500 to-pink-500";
    case "topper":
      return "from-amber-500 to-orange-500";
    case "completion":
      return "from-emerald-500 to-teal-500";
    default:
      return "from-primary to-accent";
  }
};

const getTypeLabel = (type) => {
  switch (type) {
    case "participation":
      return "Participation";
    case "mentor":
      return "Mentor";
    case "topper":
      return "Excellence";
    case "completion":
      return "Completion";
    default:
      return "Certificate";
  }
};

const CertificateCard = ({ certificate, delay = 0 }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleDownload = () => {
    console.log(`Downloading certificate: ${certificate.title} for ${certificate.recipient}`);
    // In a real app, this would trigger a download
  };

  const handleShare = () => {
    const shareData = {
      title: `CodeFest ${getTypeLabel(certificate.type)} Certificate`,
      text: `Check out my ${getTypeLabel(certificate.type)} Certificate from CodeFest!`,
      url: `https://codefest.dev/certificates/${certificate.id}`
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareData.url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleVerify = () => {
    console.log(`Verifying certificate: ${certificate.id}`);
    // In a real app, this would open verification modal or redirect
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(certificate.id);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div
      className="glass-card-elevated overflow-hidden hover-lift group opacity-0 animate-fade-in"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Certificate Preview */}
      <div className={`relative h-48 bg-gradient-to-br ${getTypeGradient(certificate.type)} p-6 flex flex-col justify-between overflow-hidden`}>
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-foreground/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-300" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-foreground/10 rounded-full translate-y-1/2 -translate-x-1/2 group-hover:scale-110 transition-transform duration-300" />

        {/* Certificate type badge */}
        <div className="relative z-10 flex justify-between items-start">
          <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 backdrop-blur-sm">
            {getTypeLabel(certificate.type)}
          </Badge>
          <div className="w-12 h-12 bg-primary-foreground/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-primary-foreground group-hover:scale-110 transition-transform duration-300">
            {getTypeIcon(certificate.type)}
          </div>
        </div>

        {/* Certificate title and recipient */}
        <div className="relative z-10">
          <h4 className="text-primary-foreground font-bold text-lg mb-1 leading-tight">
            {certificate.title}
          </h4>
          <p className="text-primary-foreground/80 text-sm">
            Awarded to {certificate.recipient}
          </p>
        </div>
      </div>

      {/* Certificate Details */}
      <div className="p-6">
        {/* Issue date and ID */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-muted-foreground">
            Issued: {certificate.issueDate}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>ID: {certificate.id.slice(0, 8)}...</span>
            <button
              onClick={handleCopyId}
              className="hover:text-primary transition-colors"
              title="Copy certificate ID"
            >
              {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleDownload}
            className="w-full gradient-bg text-primary-foreground hover:opacity-90 transition-all duration-300 group/btn"
          >
            <Download className="w-4 h-4 mr-2 group-hover/btn:animate-bounce" />
            Download Certificate
          </Button>

          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={handleVerify}
              variant="outline"
              size="sm"
              className="hover-lift"
            >
              <Eye className="w-3 h-3 mr-1" />
              Verify
            </Button>
            <Button
              onClick={handleShare}
              variant="outline"
              size="sm"
              className="hover-lift"
            >
              {isCopied ? (
                <>
                  <Check className="w-3 h-3 mr-1" />
                  Copied
                </>
              ) : (
                <>
                  <Share2 className="w-3 h-3 mr-1" />
                  Share
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Verification status */}
        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Verified & Authentic</span>
            <ExternalLink className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;
