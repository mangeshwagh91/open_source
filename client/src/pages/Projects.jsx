import { useState, useMemo, useEffect } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ProjectCard from "@/components/Projects/ProjectCard";
import { projectsAPI, contributionsAPI, proposalsAPI } from "@/lib/api";
import { Code2, Search, Filter, Grid, List, Star, Users, GitBranch, Plus, Clock, CheckCircle, XCircle, Eye, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTech, setSelectedTech] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [projectsData, setProjectsData] = useState([]);
  const [contributionStats, setContributionStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [myProposals, setMyProposals] = useState([]);
  const [pendingProposals, setPendingProposals] = useState([]);
  const [proposalsLoading, setProposalsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Get user info from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isStudent = user.role === 'student';
  const isMentor = user.role === 'admin' || user.role === 'mentor' || user.role === 'teacher';

  useEffect(() => {
    const cacheKey = 'projects_cache_v1';
    const cacheExpiry = 5 * 60 * 1000; // 5 minutes
    const cached = localStorage.getItem(cacheKey);
    let cacheValid = false;
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (parsed.timestamp && Date.now() - parsed.timestamp < cacheExpiry) {
          setProjectsData(parsed.projectsData || []);
          setContributionStats(parsed.contributionStats || {});
          setLoading(false);
          cacheValid = true;
        }
      } catch {}
    }
    if (!cacheValid) {
      const fetchProjects = async () => {
        try {
          const [projectData, contribStats] = await Promise.all([
            projectsAPI.getAll(),
            contributionsAPI.getStats().catch(() => ({}))
          ]);
          const projects = Array.isArray(projectData) ? projectData : (projectData.projects || []);
          setProjectsData(projects);
          setContributionStats(contribStats || {});
          localStorage.setItem(cacheKey, JSON.stringify({
            projectsData: projects,
            contributionStats: contribStats || {},
            timestamp: Date.now()
          }));
        } catch (error) {
          console.error("Error fetching projects:", error);
          setProjectsData([]);
        } finally {
          setLoading(false);
        }
      };
      fetchProjects();
    }
  }, []);

  // Fetch proposals based on user role
  useEffect(() => {
    const fetchProposals = async () => {
      if (!user._id) return;
      
      setProposalsLoading(true);
      try {
        if (isStudent) {
          const data = await proposalsAPI.getMyProposals();
          setMyProposals(Array.isArray(data) ? data : (data.proposals || []));
        } else if (isMentor) {
          const data = await proposalsAPI.getAll({ status: 'pending' });
          setPendingProposals(Array.isArray(data) ? data : (data.proposals || []));
        }
      } catch (error) {
        console.error("Error fetching proposals:", error);
      } finally {
        setProposalsLoading(false);
      }
    };

    fetchProposals();
  }, [user._id, isStudent, isMentor]);

  // Get all unique technologies
  const allTechnologies = useMemo(() => {
    const techSet = new Set();
    projectsData.forEach(project => {
      if (project.techStack && Array.isArray(project.techStack)) {
        project.techStack.forEach(tech => techSet.add(tech));
      }
    });
    return ["All", ...Array.from(techSet).sort()];
  }, [projectsData]);

  // Filter projects based on search and tech filter
  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => {
      const projectName = project.name || project.title || '';
      const projectDesc = project.description || '';
      const adminName = project.adminName || project.proposedBy?.name || '';
      
      const matchesSearch = projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           projectDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           adminName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTech = selectedTech === "All" || 
                         (project.techStack && project.techStack.includes(selectedTech));

      return matchesSearch && matchesTech;
    });
  }, [projectsData, searchQuery, selectedTech]);

  // Project statistics
  const stats = useMemo(() => {
    const totalProjects = projectsData.length;
    const totalContributors = projectsData.length * 15; // Approximate
    const totalTechStacks = allTechnologies.length - 1; // Exclude "All"

    return { totalProjects, totalContributors, totalTechStacks };
  }, [projectsData.length, allTechnologies.length]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-amber-500"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'accepted':
        return <Badge className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Accepted</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleAcceptProposal = async (proposalId) => {
    navigate("/review-proposals");
  };

  return (
    <div className="min-h-screen bg-background main-bg-pattern">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Enhanced Header Section */}
        <div className="mb-16 space-y-8">
          {/* Top section with badge and button */}
          <div className="relative">
            <div className="text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm rounded-full px-6 py-3 animate-fade-in">
                <Code2 className="w-5 h-5 text-primary" />
                <span className="text-primary text-sm font-medium">Explore & Contribute</span>
              </div>
            </div>
            {/* Propose Project Button - Absolute positioned */}
            <div className="absolute right-0 top-0">
              <Button
                onClick={() => navigate('/propose-project')}
                className="btn-gradient"
              >
                <Plus className="w-4 h-4 mr-2" />
                Propose Project
              </Button>
            </div>
          </div>

          {/* Main Title */}
          <div className="space-y-4 text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold gradient-text leading-tight animate-fade-in">
              GECA Student Projects
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed animate-fade-in">
              Explore student-led projects across web development, mobile apps, AI/ML, and more. Contribute via GitHub pull requests and earn recognition points.
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto animate-fade-in text-center">
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold gradient-text">{stats.totalProjects}</div>
              <div className="text-sm text-muted-foreground">Active Projects</div>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold gradient-text">{stats.totalContributors}+</div>
              <div className="text-sm text-muted-foreground">Contributors</div>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold gradient-text">{stats.totalTechStacks}</div>
              <div className="text-sm text-muted-foreground">Technologies</div>
            </div>
          </div>

          {/* Decorative divider */}
          <div className="w-32 h-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-full mx-auto" />
        </div>

        {/* Student Proposals Section */}
        {isStudent && myProposals.length > 0 && (
          <div className="mb-12">
            <Card className="glass-card-elevated">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <FileText className="w-6 h-6 text-primary" />
                      My Project Proposals
                    </CardTitle>
                    <CardDescription>Track your submitted project proposals</CardDescription>
                  </div>
                  <Button
                    onClick={() => navigate('/my-proposals')}
                    variant="outline"
                    size="sm"
                  >
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myProposals.slice(0, 3).map((proposal) => (
                    <div key={proposal._id} className="glass-card p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">{proposal.title}</h3>
                            {getStatusBadge(proposal.status)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {proposal.description?.substring(0, 120)}...
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline">{proposal.category}</Badge>
                            <Badge variant="outline">{proposal.difficulty}</Badge>
                            <Badge variant="outline">{proposal.expectedDuration} weeks</Badge>
                          </div>
                        </div>
                        <Button
                          onClick={() => navigate("/my-proposals")}
                          size="sm"
                          variant="ghost"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Mentor Proposals Review Section */}
        {isMentor && pendingProposals.length > 0 && (
          <div className="mb-12">
            <Card className="glass-card-elevated border-amber-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Clock className="w-6 h-6 text-amber-500" />
                      Pending Project Proposals
                    </CardTitle>
                    <CardDescription>Review and approve student project submissions</CardDescription>
                  </div>
                  <Badge className="bg-amber-500 text-white">
                    {pendingProposals.length} Pending
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingProposals.slice(0, 3).map((proposal) => (
                    <div key={proposal._id} className="glass-card p-4 hover:shadow-md transition-shadow border-l-4 border-amber-500">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">{proposal.title}</h3>
                            {getStatusBadge(proposal.status)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Proposed by: <span className="font-medium">{proposal.proposedBy?.name}</span>
                          </p>
                          <p className="text-sm text-muted-foreground mb-3">
                            {proposal.description?.substring(0, 120)}...
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline">{proposal.category}</Badge>
                            <Badge variant="outline">{proposal.difficulty}</Badge>
                            <Badge variant="outline">Team: {(!proposal.maxTeamSize || proposal.maxTeamSize >= 9999) ? 'Unlimited' : proposal.maxTeamSize}</Badge>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleAcceptProposal(proposal._id)}
                          size="sm"
                          className="btn-gradient"
                        >
                          Review
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button
                    onClick={() => navigate('/review-proposals')}
                    className="w-full"
                    variant="outline"
                  >
                    View All Pending Proposals
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Search and Filter Section */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search projects, technologies, or contributors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg glass-card border-border/30 focus:border-primary/50 h-14"
              />
            </div>
          </div>

          {/* Filters and View Toggle */}
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Technology Filter */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              <span className="text-sm font-medium text-muted-foreground mr-2 self-center">Filter by:</span>
              {allTechnologies.slice(0, 8).map((tech) => (
                <Button
                  key={tech}
                  variant={selectedTech === tech ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTech(tech)}
                  className={`transition-all duration-200 ${
                    selectedTech === tech
                      ? "btn-gradient"
                      : "hover:bg-primary/10 border-border/30"
                  }`}
                >
                  {tech}
                </Button>
              ))}
              {allTechnologies.length > 8 && (
                <Button variant="outline" size="sm" className="border-border/30">
                  <Filter className="w-4 h-4 mr-1" />
                  More
                </Button>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground mr-2">View:</span>
              <div className="flex rounded-lg border border-border/30 p-1 bg-background/50">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={`px-3 ${viewMode === "grid" ? "btn-gradient" : ""}`}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`px-3 ${viewMode === "list" ? "btn-gradient" : ""}`}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredProjects.length}</span> of{" "}
              <span className="font-semibold text-foreground">{projectsData.length}</span> projects
              {selectedTech !== "All" && (
                <> with <Badge variant="secondary" className="mx-1">{selectedTech}</Badge></>
              )}
            </p>
          </div>
        </div>

        {/* Projects Display */}
        {loading ? (
          <div className="text-center py-16">
            <div className="glass-card-elevated p-12 max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                <Code2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Loading Projects...</h3>
              <p className="text-muted-foreground">
                Fetching the latest project data
              </p>
            </div>
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className={`${
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "space-y-6"
          }`}>
            {filteredProjects.map((project, index) => {
              // Extract repo key from githubRepo URL
              const repoKey = project.githubRepo?.includes('github.com')
                ? project.githubRepo.split('github.com/')[1]?.replace('.git', '')
                : null;
              const stats = repoKey ? contributionStats[repoKey] : null;
              
              const handleProjectDelete = (projectId) => {
                setProjectsData(prev => prev.filter(p => p._id !== projectId));
              };
              
              return (
                <div
                  key={project.name || index}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProjectCard 
                    project={project} 
                    viewMode={viewMode} 
                    contributionStats={stats} 
                    isAdmin={isMentor}
                    onDelete={handleProjectDelete}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="glass-card-elevated p-12 max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Search className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or filters to find more projects.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTech("All");
                }}
                className="btn-gradient"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Projects;