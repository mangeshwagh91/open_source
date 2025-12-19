import { useState, useEffect } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import RoadmapCard from "@/components/Roadmap/RoadmapCard";
import { roadmapsAPI } from "@/lib/api";
import { Code2 } from "lucide-react";

const Roadmap = () => {
  const [roadmapsData, setRoadmapsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const data = await roadmapsAPI.getAll();
        setRoadmapsData(data);
      } catch (error) {
        console.error("Error fetching roadmaps:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmaps();
  }, []);

  return (
    <div className="min-h-screen bg-background main-bg-pattern">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Header Section */}
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
            <Code2 className="w-5 h-5 text-primary" />
            <span className="text-primary text-sm font-medium">Learning Paths</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold gradient-text leading-tight">
            Learning Roadmaps
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Follow our comprehensive step-by-step roadmaps to master various technologies and skills. Each roadmap includes curated resources and learning paths.
          </p>
          
          {/* Add a subtle divider */}
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-full mx-auto mt-8" />
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
