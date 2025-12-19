import { useState, useMemo, useEffect } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ProjectCard from "@/components/Projects/ProjectCard";
import { projectsAPI } from "@/lib/api";
import { Code2, Search, Filter, Grid, List, Star, Users, GitBranch } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTech, setSelectedTech] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectsAPI.getAll();
        setProjectsData(Array.isArray(data) ? data : (data.projects || []));
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjectsData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Get all unique technologies
  const allTechnologies = useMemo(() => {
    const techSet = new Set();
    projectsData.forEach(project => {
      project.techStack.forEach(tech => techSet.add(tech));
    });
    return ["All", ...Array.from(techSet).sort()];
  }, []);

  // Filter projects based on search and tech filter
  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.adminName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTech = selectedTech === "All" || project.techStack.includes(selectedTech);

      return matchesSearch && matchesTech;
    });
  }, [searchQuery, selectedTech]);

  // Project statistics
  const stats = useMemo(() => {
    const totalProjects = projectsData.length;
    const totalContributors = projectsData.length * 15; // Approximate
    const totalTechStacks = allTechnologies.length - 1; // Exclude "All"

    return { totalProjects, totalContributors, totalTechStacks };
  }, [allTechnologies]);

  return (
    <div className="min-h-screen bg-background main-bg-pattern">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Enhanced Header Section */}
        <div className="text-center mb-16 space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm rounded-full px-6 py-3 animate-fade-in">
            <Code2 className="w-5 h-5 text-primary" />
            <span className="text-primary text-sm font-medium">Explore & Contribute</span>
          </div>

          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold gradient-text leading-tight animate-fade-in">
              Open Source Projects
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed animate-fade-in">
              Discover innovative projects, contribute to meaningful code, and collaborate with talented developers worldwide.
              Find your next contribution opportunity.
            </p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto animate-fade-in">
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
        {filteredProjects.length > 0 ? (
          <div className={`${
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "space-y-6"
          }`}>
            {filteredProjects.map((project, index) => (
              <div
                key={project.name}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProjectCard project={project} viewMode={viewMode} />
              </div>
            ))}
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

        {/* Call to Action Section */}
        {filteredProjects.length > 0 && (
          <div className="mt-20 text-center">
            <div className="glass-card-elevated p-8 md:p-12 max-w-4xl mx-auto">
              <div className="space-y-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <Star className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold gradient-text">Ready to Contribute?</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Join our community of developers making a difference. Every contribution counts,
                  from fixing bugs to adding features.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="btn-gradient px-8 py-3">
                    <GitBranch className="w-5 h-5 mr-2" />
                    Start Contributing
                  </Button>
                  <Button variant="outline" className="px-8 py-3 border-primary/30 hover:bg-primary/10">
                    <Users className="w-5 h-5 mr-2" />
                    Join Community
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Projects;
