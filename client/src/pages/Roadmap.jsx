import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import RoadmapCard from "@/components/Roadmap/RoadmapCard";
import { roadmapsData } from "@/data/roadmapsData";

const Roadmap = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text">
            Learning Roadmaps
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Follow our comprehensive step-by-step roadmaps to master various technologies and skills. Each roadmap includes curated resources and learning paths.
          </p>
        </div>

        {/* Roadmaps Grid */}
        <div className="space-y-8">
          {roadmapsData.map((roadmap, index) => (
            <RoadmapCard key={index} roadmap={roadmap} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Roadmap;
