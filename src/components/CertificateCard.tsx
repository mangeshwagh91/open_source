import { Download, Award, Star, Trophy, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Certificate } from "@/data/certificatesData";

interface CertificateCardProps {
  certificate: Certificate;
  delay?: number;
}

const getTypeIcon = (type: Certificate["type"]) => {
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

const getTypeGradient = (type: Certificate["type"]) => {
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

const CertificateCard = ({ certificate, delay = 0 }: CertificateCardProps) => {
  const handleDownload = () => {
    console.log(`Downloading certificate: ${certificate.title} for ${certificate.recipient}`);
    // In a real app, this would trigger a file download
  };

  return (
    <div 
      className="glass-card overflow-hidden hover-lift group opacity-0 animate-fade-in"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Certificate Preview */}
      <div className={`relative h-48 bg-gradient-to-br ${getTypeGradient(certificate.type)} p-6 flex flex-col justify-between`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-foreground/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-foreground/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10">
          <div className="w-12 h-12 bg-primary-foreground/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-primary-foreground mb-3">
            {getTypeIcon(certificate.type)}
          </div>
        </div>
        
        <div className="relative z-10">
          <p className="text-primary-foreground/80 text-sm font-medium uppercase tracking-wider">
            {certificate.type} Certificate
          </p>
        </div>
      </div>

      {/* Certificate Details */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {certificate.title}
        </h3>
        <p className="text-muted-foreground mb-1">
          Issued to: <span className="text-foreground font-medium">{certificate.recipient}</span>
        </p>
        <p className="text-muted-foreground text-sm mb-4">
          {certificate.issueDate}
        </p>
        
        <Button
          onClick={handleDownload}
          className="w-full gradient-bg text-primary-foreground hover:opacity-90 transition-opacity group"
        >
          <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
          Download Certificate
        </Button>
      </div>
    </div>
  );
};

export default CertificateCard;