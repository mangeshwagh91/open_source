import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, User } from "lucide-react";

const ProjectCard = ({ project }) => {
  const { name, description, techStack, adminName, githubRepo } = project;

  const handleGithubClick = () => {
    window.open(githubRepo, "_blank", "noopener,noreferrer");
  };

  return (
    <Card className="glass-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg flex flex-col h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold line-clamp-2">{name}</CardTitle>
        <CardDescription className="text-muted-foreground line-clamp-3 min-h-[60px]">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow flex flex-col justify-between pb-4">
        {/* Tech Stack */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Tech Stack</h4>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Project Admin - Fixed at bottom of content */}
        <div className="flex items-center gap-2 text-sm mt-auto pt-2">
          <User className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">Admin:</span>
          <span className="font-medium">{adminName}</span>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button 
          onClick={handleGithubClick}
          className="w-full gradient-bg hover:opacity-90 transition-opacity text-primary-foreground"
        >
          <Github className="w-4 h-4 mr-2" />
          View on GitHub
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
