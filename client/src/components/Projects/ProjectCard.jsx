import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, User, Star, GitFork, Eye, Calendar } from "lucide-react";
import { useGithubRepo, formatNumber, formatRelativeTime } from "@/hooks/useGithubRepo";

const ProjectCard = ({ project, viewMode = "grid" }) => {
  const { name, description, techStack, adminName, githubRepo } = project;
  const { stars, forks, watchers, updatedAt, loading } = useGithubRepo(githubRepo);

  const handleGithubClick = () => {
    window.open(githubRepo, "_blank", "noopener,noreferrer");
  };

  if (viewMode === "list") {
    return (
      <Card className="glass-card-elevated border-border/30 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover-lift">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Project Info */}
            <div className="flex-1 space-y-4">
              <div>
                <CardTitle className="text-2xl font-bold text-foreground mb-2 hover:text-primary transition-colors cursor-pointer">
                  {name}
                </CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {description}
                </CardDescription>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="text-sm font-semibold mb-3 text-muted-foreground">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {techStack.slice(0, 6).map((tech, index) => (
                    <Badge key={index} variant="secondary" className="text-xs px-3 py-1">
                      {tech}
                    </Badge>
                  ))}
                  {techStack.length > 6 && (
                    <Badge variant="outline" className="text-xs px-3 py-1">
                      +{techStack.length - 6} more
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Project Meta & Actions */}
            <div className="lg:w-80 space-y-4">
              {/* Project Admin */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">{adminName}</div>
                  <div className="text-xs text-muted-foreground">Project Admin</div>
                </div>
              </div>

              {/* Project Stats */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded-lg bg-muted/30">
                  <Star className="w-4 h-4 mx-auto mb-1 text-yellow-500" />
                  <div className="text-xs font-medium">{loading ? '...' : formatNumber(stars)}</div>
                </div>
                <div className="p-2 rounded-lg bg-muted/30">
                  <GitFork className="w-4 h-4 mx-auto mb-1 text-primary" />
                  <div className="text-xs font-medium">{loading ? '...' : formatNumber(forks)}</div>
                </div>
                <div className="p-2 rounded-lg bg-muted/30">
                  <Eye className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                  <div className="text-xs font-medium">{loading ? '...' : formatNumber(watchers)}</div>
                </div>
              </div>

              {/* Action Button */}
              <Button
                onClick={handleGithubClick}
                className="w-full btn-gradient shadow-lg"
              >
                <Github className="w-4 h-4 mr-2" />
                View Repository
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Grid View (Enhanced)
  return (
    <Card className="glass-card-elevated border-border/30 hover:border-primary/50 transition-all duration-300 hover:shadow-lg flex flex-col h-full hover-lift group">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-3">
          <CardTitle className="text-xl font-bold line-clamp-2 text-foreground group-hover:text-primary transition-colors cursor-pointer">
            {name}
          </CardTitle>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-xs font-medium">{loading ? '...' : formatNumber(stars)}</span>
          </div>
        </div>
        <CardDescription className="text-muted-foreground line-clamp-3 min-h-[60px] leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow flex flex-col justify-between pb-4">
        {/* Tech Stack */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold mb-3 text-muted-foreground">Tech Stack</h4>
          <div className="flex flex-wrap gap-2">
            {techStack.slice(0, 4).map((tech, index) => (
              <Badge key={index} variant="secondary" className="text-xs px-2 py-1 hover:bg-primary/20 transition-colors">
                {tech}
              </Badge>
            ))}
            {techStack.length > 4 && (
              <Badge variant="outline" className="text-xs px-2 py-1">
                +{techStack.length - 4}
              </Badge>
            )}
          </div>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4 text-center">
          <div className="flex flex-col items-center">
            <GitFork className="w-4 h-4 text-primary mb-1" />
            <span className="text-xs font-medium">{loading ? '...' : formatNumber(forks)}</span>
            <span className="text-xs text-muted-foreground">forks</span>
          </div>
          <div className="flex flex-col items-center">
            <Eye className="w-4 h-4 text-muted-foreground mb-1" />
            <span className="text-xs font-medium">{loading ? '...' : formatNumber(watchers)}</span>
            <span className="text-xs text-muted-foreground">views</span>
          </div>
          <div className="flex flex-col items-center">
            <Calendar className="w-4 h-4 text-accent mb-1" />
            <span className="text-xs font-medium">{loading ? '...' : formatRelativeTime(updatedAt)}</span>
            <span className="text-xs text-muted-foreground">ago</span>
          </div>
        </div>

        {/* Project Admin */}
        <div className="flex items-center gap-2 text-sm p-3 rounded-lg bg-muted/30">
          <User className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">by</span>
          <span className="font-medium text-foreground">{adminName}</span>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button
          onClick={handleGithubClick}
          className="w-full btn-gradient shadow-lg group-hover:scale-105 transition-transform"
        >
          <Github className="w-4 h-4 mr-2" />
          View on GitHub
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
