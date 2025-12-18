import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const RoadmapStep = ({ step, stepNumber, isLast }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { title, description, resources } = step;

  return (
    <div className="relative pl-8 pb-4">
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-border" />
      )}
      
      {/* Step Number Badge */}
      <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary text-xs font-bold text-primary">
        {stepNumber}
      </div>

      {/* Step Content */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h4 className="font-semibold text-foreground">{title}</h4>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary hover:text-primary/80"
          >
            {isExpanded ? "Hide" : "View"} Resources
          </Button>
        </div>

        {/* Resources - Expandable */}
        {isExpanded && resources && resources.length > 0 && (
          <div className="mt-3 space-y-2 p-3 rounded-lg bg-muted/50 border border-border/50">
            <p className="text-xs font-semibold text-muted-foreground mb-2">Learning Resources:</p>
            {resources.map((resource, idx) => (
              <a
                key={idx}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-sm text-primary hover:text-primary/80 hover:underline group"
              >
                <ExternalLink className="w-3 h-3 mt-0.5 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                <span>{resource.title}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoadmapStep;
