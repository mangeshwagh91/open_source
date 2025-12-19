import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import RoadmapStep from "./RoadmapStep";
import { Book, Clock } from "lucide-react";

const RoadmapCard = ({ roadmap }) => {
  const { title, description, duration, difficulty, steps } = roadmap;

  const difficultyColors = {
    Beginner: "bg-green-500/10 text-green-500 border-green-500/20",
    Intermediate: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    Advanced: "bg-red-500/10 text-red-500 border-red-500/20"
  };

  return (
    <Card className="glass-card border-border/50 hover:border-primary/50 transition-all duration-300">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
          <CardTitle className="text-2xl font-bold gradient-text">{title}</CardTitle>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {duration}
            </Badge>
            <Badge variant="outline" className={difficultyColors[difficulty]}>
              {difficulty}
            </Badge>
          </div>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            <Book className="w-4 h-4" />
            <span>Learning Path</span>
          </div>
          
          <div className="space-y-3">
            {steps.map((step, index) => (
              <RoadmapStep 
                key={index} 
                step={step} 
                stepNumber={index + 1}
                isLast={index === steps.length - 1}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoadmapCard;
