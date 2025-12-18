import { Trophy, Search } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import LeaderboardTable from "@/components/Leaderboard/LeaderboardTable";
import { leaderboardData } from "@/data/leaderboardData";
import { Input } from "@/components/ui/input";

const Leaderboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = leaderboardData.filter((contributor) =>
    contributor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="px-4 py-16">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <div 
                className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-6 opacity-0 animate-fade-in"
              >
                <Trophy className="w-4 h-4 text-primary" />
                <span className="text-primary text-sm font-medium">Top Contributors</span>
              </div>
              
              <h1 
                className="text-4xl md:text-5xl font-bold text-foreground mb-6 opacity-0 animate-fade-in"
                style={{ animationDelay: "0.1s" }}
              >
                <span className="gradient-text">Leaderboard</span>
              </h1>
              
              <p 
                className="text-lg text-muted-foreground mb-8 opacity-0 animate-fade-in"
                style={{ animationDelay: "0.2s" }}
              >
                Celebrating our amazing contributors who are making a difference
                in the open-source community.
              </p>

              {/* Search */}
              <div 
                className="max-w-md mx-auto relative opacity-0 animate-fade-in"
                style={{ animationDelay: "0.3s" }}
              >
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search contributors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 py-6 bg-card border-border/50 focus:border-primary"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="px-4 pb-8">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
              {[
                { label: "Total Points", value: "15,580" },
                { label: "Contributors", value: "10" },
                { label: "Total PRs", value: "305" },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="glass-card p-4 text-center opacity-0 animate-fade-in"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-muted-foreground text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leaderboard Table */}
        <section className="px-4">
          <div className="container mx-auto max-w-4xl">
            {filteredData.length > 0 ? (
              <LeaderboardTable data={filteredData} />
            ) : (
              <div className="glass-card p-12 text-center">
                <p className="text-muted-foreground">No contributors found matching "{searchQuery}"</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Leaderboard;