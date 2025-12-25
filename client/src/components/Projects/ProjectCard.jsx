import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, User, Star, GitFork, Eye, Calendar, GitPullRequest, Users, Trash2 } from "lucide-react";
import { useGithubRepo, formatNumber, formatRelativeTime } from "@/hooks/useGithubRepo";
import { projectsAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const ProjectCard = ({ project, viewMode = "grid", contributionStats, onDelete, isAdmin = false }) => {
  const name = project.name || project.title || 'Untitled Project';
  const description = project.description || 'No description available';
  const techStack = project.techStack || [];
  const adminName = project.adminName || project.proposedBy?.name || 'Unknown';
  const githubRepo = project.githubRepo || project.github || '';
  const { toast } = useToast();
  
  const { stars, forks, watchers, updatedAt, loading } = useGithubRepo(githubRepo);

  const handleGithubClick = () => {
    window.open(githubRepo, "_blank", "noopener,noreferrer");
  };

  const handleDeleteProject = async (e) => {
    e.stopPropagation();
    if (!window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      return;
    }
    try {
      await projectsAPI.delete(project._id);
      toast({ title: "Success!", description: `${name} deleted successfully` });
      if (onDelete) onDelete(project._id);
    } catch (error) {
      toast({ title: "Error", description: error?.message || "Failed to delete project", variant: "destructive" });
    }
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

              {/* Contribution Stats (always show) */}
              <div className="grid grid-cols-2 gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
                <div className="text-center">
                  <GitPullRequest className="w-4 h-4 mx-auto mb-1 text-primary" />
                  <div className="text-xs font-bold text-primary">{(contributionStats?.mergedPRs ?? 0)}</div>
                  <div className="text-xs text-muted-foreground">Merged PRs</div>
                </div>
                <div className="text-center">
                  <Users className="w-4 h-4 mx-auto mb-1 text-primary" />
                  <div className="text-xs font-bold text-primary">{(contributionStats?.contributorCount ?? 0)}</div>
                  <div className="text-xs text-muted-foreground">Contributors</div>
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

  // Grid View (Refined)
  return (
    <Card className="glass-card-elevated border-border/30 hover:border-primary/50 transition-all duration-300 hover:shadow-lg flex flex-col h-full hover-lift group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3 mb-2">
          <CardTitle className="text-lg font-bold line-clamp-2 text-foreground group-hover:text-primary transition-colors cursor-pointer">
            {name}
          </CardTitle>
          <Badge className="bg-yellow-500/20 text-yellow-600 border-yellow-500/30 shrink-0 flex items-center gap-1 text-xs px-2 py-0.5">
            <Star className="w-3 h-3 fill-current" />
            {loading ? '...' : formatNumber(stars)}
          </Badge>
        </div>
        <CardDescription className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow flex flex-col justify-between pb-4 space-y-4">
        {/* Tech Stack */}
        <div>
          <h4 className="text-xs font-semibold mb-2 text-muted-foreground uppercase tracking-wider">Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {techStack.slice(0, 4).map((tech, index) => (
              <Badge key={index} variant="secondary" className="text-xs px-2.5 py-1 hover:bg-primary/20 transition-colors cursor-default">
                {tech}
              </Badge>
            ))}
            {techStack.length > 4 && (
              <Badge variant="outline" className="text-xs px-2.5 py-1 text-muted-foreground">
                +{techStack.length - 4}
              </Badge>
            )}
          </div>
        </div>

        {/* Project Stats Grid */}
        <div className="grid grid-cols-3 gap-3 p-3 rounded-lg bg-muted/40 border border-border/30">
          <div className="flex flex-col items-center">
            <Star className="w-4 h-4 text-yellow-500 mb-1.5" />
            <span className="text-sm font-bold text-foreground">{loading ? '...' : formatNumber(stars)}</span>
            <span className="text-xs text-muted-foreground">Stars</span>
          </div>
          <div className="flex flex-col items-center">
            <GitFork className="w-4 h-4 text-blue-500 mb-1.5" />
            <span className="text-sm font-bold text-foreground">{loading ? '...' : formatNumber(forks)}</span>
            <span className="text-xs text-muted-foreground">Forks</span>
          </div>
          <div className="flex flex-col items-center">
            <Eye className="w-4 h-4 text-green-500 mb-1.5" />
            <span className="text-sm font-bold text-foreground">{loading ? '...' : formatNumber(watchers)}</span>
            <span className="text-xs text-muted-foreground">Watchers</span>
          </div>
        </div>

        {/* Contribution Stats */}
        <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
          <div className="text-center">
            <GitPullRequest className="w-4 h-4 mx-auto mb-1.5 text-primary" />
            <div className="text-sm font-bold text-primary">{(contributionStats?.mergedPRs ?? 0)}</div>
            <div className="text-xs text-muted-foreground">Merged PRs</div>
          </div>
          <div className="text-center">
            <Users className="w-4 h-4 mx-auto mb-1.5 text-primary" />
            <div className="text-sm font-bold text-primary">{(contributionStats?.contributorCount ?? 0)}</div>
            <div className="text-xs text-muted-foreground">Contributors</div>
          </div>
        </div>

        {/* Project Admin */}
        <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 border border-border/20">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <User className="w-4 h-4 text-primary" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Admin</div>
            <span className="text-sm font-semibold text-foreground">{adminName}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 gap-2 flex">
        <Button
          onClick={handleGithubClick}
          className="flex-1 btn-gradient shadow-lg group-hover:scale-105 transition-transform text-sm h-9"
        >
          <Github className="w-4 h-4 mr-2" />
          View on GitHub
        </Button>
        {isAdmin && (
          <Button
            onClick={handleDeleteProject}
            variant="destructive"
            size="sm"
            className="h-9 px-3"
            title="Delete project"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
