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
  Code2
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

  // Top 3 contributors for podium
  const topThree = processedData.slice(0, 3);

  return (
    <div className="min-h-screen bg-background main-bg-pattern">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Enhanced Header Section */}
        <div className="text-center mb-16 space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm rounded-full px-6 py-3 animate-fade-in">
            <Trophy className="w-5 h-5 text-primary" />
            <span className="text-primary text-sm font-medium">Top Contributors</span>
          </div>

          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold gradient-text leading-tight animate-fade-in">
              Student Leaderboard
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed animate-fade-in">
              Community recognition for student contributors. Rankings are based on contribution quality, consistency, and impact.
              Criteria may evolve as the platform grows.
            </p>
          </div>

          {/* Statistics Dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto animate-fade-in">
            <div className="glass-card p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold gradient-text">{stats.totalContributors}</div>
              <div className="text-sm text-muted-foreground">Active Contributors</div>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-accent/10 flex items-center justify-center">
                <Code2 className="w-6 h-6 text-accent" />
              </div>
              <div className="text-2xl font-bold gradient-text">Growing</div>
              <div className="text-sm text-muted-foreground">Community</div>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-secondary/10 flex items-center justify-center">
                <Flame className="w-6 h-6 text-secondary" />
              </div>
              <div className="text-2xl font-bold gradient-text">{stats.totalContributions}</div>
              <div className="text-sm text-muted-foreground">Total Contributions</div>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold gradient-text">Quality</div>
              <div className="text-sm text-muted-foreground">Focus</div>
            </div>
          </div>

          {/* Decorative divider */}
          <div className="w-32 h-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-full mx-auto" />
        </div>

        {/* Top 3 Podium */}
        {topThree.length >= 3 && (
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold gradient-text mb-2">Top Champions</h2>
              <p className="text-muted-foreground">Our legendary contributors leading the pack</p>
            </div>

            <div className="flex justify-center items-end gap-4 max-w-4xl mx-auto">
              {/* 2nd Place */}
              <div className="flex-1 max-w-xs animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="glass-card-elevated p-6 text-center hover-lift">
                  <div className="relative mb-4">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-slate-300 to-slate-500 flex items-center justify-center shadow-lg">
                      <Medal className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-slate-400 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                  </div>
                  <img
                    src={topThree[1]?.avatar}
                    alt={topThree[1]?.name}
                    className="w-16 h-16 mx-auto rounded-full mb-3 border-4 border-slate-400"
                  />
                  <h3 className="font-bold text-lg">{topThree[1]?.name}</h3>
                  <p className="text-muted-foreground text-sm mb-2">{topThree[1]?.contributions} contributions</p>
                  <div className="text-sm font-medium text-primary">Recognized Contributor</div>
                </div>
                <div className="h-24 bg-gradient-to-t from-slate-300 to-slate-200 rounded-t-lg mt-4 flex items-end justify-center pb-2">
                  <span className="text-slate-700 font-bold">2nd</span>
                </div>
              </div>

              {/* 1st Place */}
              <div className="flex-1 max-w-xs animate-fade-in-up" style={{ animationDelay: '0s' }}>
                <div className="glass-card-elevated p-6 text-center hover-lift relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Crown className="w-8 h-8 text-yellow-500" />
                  </div>
                  <div className="relative mb-4">
                    <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-xl">
                      <Trophy className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center">
                      <span className="text-white font-bold">1</span>
                    </div>
                  </div>
                  <img
                    src={topThree[0]?.avatar}
                    alt={topThree[0]?.name}
                    className="w-20 h-20 mx-auto rounded-full mb-3 border-4 border-yellow-500"
                  />
                  <h3 className="font-bold text-xl">{topThree[0]?.name}</h3>
                  <p className="text-muted-foreground text-sm mb-2">{topThree[0]?.contributions} contributions</p>
                  <div className="text-lg font-medium text-primary">Outstanding Contributor</div>
                </div>
                <div className="h-32 bg-gradient-to-t from-yellow-400 to-yellow-300 rounded-t-lg mt-4 flex items-end justify-center pb-2">
                  <span className="text-yellow-800 font-bold text-lg">1st</span>
                </div>
              </div>

              {/* 3rd Place */}
              <div className="flex-1 max-w-xs animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="glass-card-elevated p-6 text-center hover-lift">
                  <div className="relative mb-4">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center shadow-lg">
                      <Award className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                  </div>
                  <img
                    src={topThree[2]?.avatar}
                    alt={topThree[2]?.name}
                    className="w-16 h-16 mx-auto rounded-full mb-3 border-4 border-amber-600"
                  />
                  <h3 className="font-bold text-lg">{topThree[2]?.name}</h3>
                  <p className="text-muted-foreground text-sm mb-2">{topThree[2]?.contributions} contributions</p>
                  <div className="text-sm font-medium text-primary">Valued Contributor</div>
                </div>
                <div className="h-20 bg-gradient-to-t from-amber-600 to-amber-500 rounded-t-lg mt-4 flex items-end justify-center pb-2">
                  <span className="text-amber-100 font-bold">3rd</span>
                </div>
              </div>
            </div>
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
                placeholder="Search champions by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg glass-card border-border/30 focus:border-primary/50 h-14"
              />
            </div>
          </div>

          {/* Filters and Controls */}
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Sort and Filter Controls */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-border/30 bg-background text-sm focus:border-primary/50"
                >
                  <option value="contributions">Contributions</option>
                  <option value="rank">Rank</option>
                </select>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                  className="px-3"
                >
                  {sortOrder === "desc" ? "↓" : "↑"}
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Time:</span>
                <div className="flex rounded-lg border border-border/30 p-1 bg-background/50">
                  {[
                    { value: "all", label: "All Time" },
                    { value: "month", label: "This Month" },
                    { value: "week", label: "This Week" }
                  ].map((period) => (
                    <Button
                      key={period.value}
                      variant={timeFilter === period.value ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setTimeFilter(period.value)}
                      className={`px-3 text-xs ${timeFilter === period.value ? "btn-gradient" : ""}`}
                    >
                      {period.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground mr-2">View:</span>
              <div className="flex rounded-lg border border-border/30 p-1 bg-background/50">
                <Button
                  variant={viewMode === "table" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("table")}
                  className={`px-3 ${viewMode === "table" ? "btn-gradient" : ""}`}
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "cards" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("cards")}
                  className={`px-3 ${viewMode === "cards" ? "btn-gradient" : ""}`}
                >
                  <Grid className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="text-center">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{processedData.length}</span> champions
              {timeFilter !== "all" && (
                <> from <Badge variant="secondary" className="mx-1">
                  {timeFilter === "month" ? "This Month" : "This Week"}
                </Badge></>
              )}
              {searchQuery && (
                <> matching "<span className="font-semibold text-foreground">{searchQuery}</span>"</>
              )}
            </p>
          </div>
        </div>

        {/* Leaderboard Display */}
        {loading ? (
          <div className="text-center py-16">
            <div className="glass-card-elevated p-12 max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                <Trophy className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Loading Leaderboard...</h3>
              <p className="text-muted-foreground">
                Fetching the latest rankings
              </p>
            </div>
          </div>
        ) : processedData.length > 0 ? (
          <div className="animate-fade-in">
            <LeaderboardTable data={processedData} viewMode={viewMode} />
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="glass-card-elevated p-12 max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Search className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No champions found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or filters to find more contributors.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setTimeFilter("all");
                }}
                className="btn-gradient"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="glass-card-elevated p-8 md:p-12 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold gradient-text">Your Journey Starts Here</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Ready to join the ranks of our top contributors? Every contribution counts.
                Start your journey to the top of the leaderboard today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="btn-gradient px-8 py-3">
                  <Trophy className="w-5 h-5 mr-2" />
                  Start Contributing
                </Button>
                <Button variant="outline" className="px-8 py-3 border-primary/30 hover:bg-primary/10">
                  <Users className="w-5 h-5 mr-2" />
                  View Guidelines
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Leaderboard;