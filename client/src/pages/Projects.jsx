import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ProjectCard from "@/components/Projects/ProjectCard";
import { projectsData } from "@/data/projectsData";

const Projects = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text">
            Open Source Projects
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our diverse collection of open-source projects. Contribute, learn, and build alongside talented developers from around the world.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Projects;
