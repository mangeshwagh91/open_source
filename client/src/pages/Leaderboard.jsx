import { useState, useMemo, useEffect } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import LeaderboardTable from "@/components/Leaderboard/LeaderboardTable";
import { leaderboardAPI } from "@/lib/api";
import {
  Trophy,
  Search,
  Filter,
  Grid,
  List,
  Medal,
  Award,
  Star,
  TrendingUp,
  Users,
  Target,
  Calendar,
  Crown,
  Flame,
  Code2,
  Github,
  Linkedin,
  ExternalLink
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Leaderboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("points");
  const [sortOrder, setSortOrder] = useState("desc");
  const [timeFilter, setTimeFilter] = useState("all");
  const [viewMode, setViewMode] = useState("table");
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await leaderboardAPI.getAll();
        setLeaderboardData(Array.isArray(data) ? data : (data.leaderboard || []));
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        setLeaderboardData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  // Enhanced filtering and sorting logic
  const processedData = useMemo(() => {
    let filtered = leaderboardData.filter((contributor) => {
      const name = contributor.name || contributor.student?.name || '';
      return name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    // Apply time-based filtering (simulated)
    if (timeFilter !== "all") {
      // In a real app, this would filter by actual time periods
      filtered = filtered.slice(0, Math.floor(filtered.length * 0.7));
    }

    // Sort data
    filtered.sort((a, b) => {
      let aValue = a[sortBy] || 0;
      let bValue = b[sortBy] || 0;
      
      // Handle nested student properties
      if (sortBy === 'contributions') {
        aValue = a.contributions || 0;
        bValue = b.contributions || 0;
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    // Reassign ranks based on sorting
    return filtered.map((contributor, index) => ({
      ...contributor,
      name: contributor.name || contributor.student?.name || 'Unknown',
      contributions: contributor.contributions || 0,
      rank: index + 1,
      badge: index === 0 ? "gold" : index === 1 ? "silver" : index === 2 ? "bronze" : null,
      avatar: contributor.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(contributor.name || 'User')}&background=random`
    }));
  }, [leaderboardData, searchQuery, sortBy, sortOrder, timeFilter]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalContributions = processedData.reduce((sum, contributor) => sum + contributor.contributions, 0);
    const topContributor = processedData[0];

    return {
      totalContributors: processedData.length,
      totalContributions,
      topContributor
    };
  }, [processedData]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 pt-20 pb-16">
        {/* Simplified Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            Community <span className="gradient-text">Leaderboard</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Recognizing our most active contributors to the GECA platform.
          </p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="glass-card-elevated p-4 text-center">
            <div className="text-2xl font-bold gradient-text">{stats.totalContributors}</div>
            <div className="text-xs text-muted-foreground">Contributors</div>
          </div>
          <div className="glass-card-elevated p-4 text-center">
            <div className="text-2xl font-bold gradient-text">{stats.totalContributions}</div>
            <div className="text-xs text-muted-foreground">Contributions</div>
          </div>
          <div className="glass-card-elevated p-4 text-center">
            <div className="text-2xl font-bold gradient-text">{stats.topContributor?.name || "N/A"}</div>
            <div className="text-xs text-muted-foreground">Top Contributor</div>
          </div>
          <div className="glass-card-elevated p-4 text-center">
            <div className="text-2xl font-bold gradient-text">Quality</div>
            <div className="text-xs text-muted-foreground">Focused</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 glass-card border-border/30 focus:border-primary/50"
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 justify-center items-center mb-8">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-lg bg-muted/30 border border-border/30 text-sm focus:border-primary/50"
            >
              <option value="contributions">Contributions</option>
              <option value="rank">Rank</option>
            </select>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="w-10 h-10"
            >
              {sortOrder === "desc" ? "↓" : "↑"}
            </Button>
          </div>

          <div className="flex items-center gap-2 ml-4">
            <span className="text-sm text-muted-foreground">Time:</span>
            <div className="flex gap-1 bg-muted/30 p-1 rounded-lg">
              {[
                { value: "all", label: "All" },
                { value: "month", label: "Month" },
                { value: "week", label: "Week" }
              ].map((period) => (
                <Button
                  key={period.value}
                  variant={timeFilter === period.value ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setTimeFilter(period.value)}
                  className="text-xs"
                >
                  {period.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        {loading ? (
          <div className="text-center py-16">
            <div className="text-muted-foreground">Loading leaderboard...</div>
          </div>
        ) : processedData.length > 0 ? (
          <div className="glass-card-elevated overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/30">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Rank</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">GitHub</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">LinkedIn</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Contributions</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {processedData.map((contributor, index) => (
                    <tr key={index} className="border-b border-border/20 hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-primary/10 text-primary">
                            {contributor.rank}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={contributor.avatar}
                            alt={contributor.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <span className="font-medium text-foreground">{contributor.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {contributor.github && (
                          <a
                            href={contributor.github.startsWith('http') ? contributor.github : `https://github.com/${contributor.github}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                            title={`GitHub: ${contributor.github}`}
                          >
                            <Github className="w-5 h-5" />
                          </a>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {contributor.linkedin && (
                          <a
                            href={contributor.linkedin.startsWith('http') ? contributor.linkedin : `https://linkedin.com/in/${contributor.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                            title={`LinkedIn: ${contributor.linkedin}`}
                          >
                            <Linkedin className="w-5 h-5" />
                          </a>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-foreground">{contributor.contributions}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-foreground">{contributor.points}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-muted-foreground">No contributors found</div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Leaderboard;