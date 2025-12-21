import { Trophy, Medal, Award, Star, TrendingUp, GitBranch, Calendar, Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const getBadgeIcon = (badge) => {
  switch (badge) {
    case "gold":
      return <Trophy className="w-5 h-5 text-amber-500" />;
    case "silver":
      return <Medal className="w-5 h-5 text-slate-400" />;
    case "bronze":
      return <Award className="w-5 h-5 text-amber-700" />;
    default:
      return null;
  }
};

const getRankColor = (rank) => {
  switch (rank) {
    case 1:
      return "text-amber-500";
    case 2:
      return "text-slate-400";
    case 3:
      return "text-amber-700";
    default:
      return "text-muted-foreground";
  }
};

const ContributorCard = ({ contributor, index }) => {
  return (
    <Card className="glass-card-elevated border-border/30 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover-lift group">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              contributor.rank <= 3 ? "bg-gradient-to-br from-primary/20 to-accent/20" : "bg-muted/50"
            }`}>
              <span className={`font-bold text-lg ${getRankColor(contributor.rank)}`}>
                #{contributor.rank}
              </span>
            </div>
            {getBadgeIcon(contributor.badge)}
          </div>

          <div className="text-right">
            <div className="text-2xl font-bold gradient-text">{contributor.contributions}</div>
            <div className="text-xs text-muted-foreground">contributions</div>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <img
              src={contributor.avatar}
              alt={contributor.name}
              className="w-16 h-16 rounded-full border-2 border-border group-hover:border-primary/50 transition-colors"
            />
            {contributor.rank <= 3 && (
              <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <Star className="w-3 h-3 text-primary-foreground" />
              </div>
            )}
          </div>

          <div className="flex-1">
            <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
              {contributor.name}
            </h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
              <div className="flex items-center gap-1">
                <GitBranch className="w-4 h-4" />
                <span>{contributor.contributions} contributions</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                <span>Active member</span>
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="flex flex-wrap gap-2 mt-4">
          {contributor.contributions >= 40 && (
            <Badge variant="secondary" className="text-xs">
              <Trophy className="w-3 h-3 mr-1" />
              Top Contributor
            </Badge>
          )}
          {contributor.contributions >= 20 && (
            <Badge variant="outline" className="text-xs">
              <Award className="w-3 h-3 mr-1" />
              Active Contributor
            </Badge>
          )}
          {contributor.contributions >= 5 && (
            <Badge variant="outline" className="text-xs">
              <Medal className="w-3 h-3 mr-1" />
              Rising Star
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const LeaderboardTable = ({ data, viewMode = "table" }) => {
  if (viewMode === "cards") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((contributor, index) => (
          <div
            key={contributor.rank}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <ContributorCard contributor={contributor} index={index} />
          </div>
        ))}
      </div>
    );
  }

  // Enhanced Table View
  return (
    <div className="glass-card-elevated overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50 bg-muted/30">
              <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Rank</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Champion</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-muted-foreground">Contributions</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-muted-foreground">Level</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-muted-foreground">Points</th>
            </tr>
          </thead>
          <tbody>
            {data.map((contributor, index) => (
              <tr
                key={contributor.rank}
                className="border-b border-border/30 last:border-0 hover:bg-muted/30 transition-all duration-200 group"
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      contributor.rank <= 3 ? "bg-gradient-to-br from-primary/20 to-accent/20" : "bg-muted/50"
                    }`}>
                      <span className={`font-bold ${getRankColor(contributor.rank)}`}>
                        {contributor.rank}
                      </span>
                    </div>
                    {getBadgeIcon(contributor.badge)}
                  </div>
                </td>

                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={contributor.avatar}
                        alt={contributor.name}
                        className="w-12 h-12 rounded-full border-2 border-border group-hover:border-primary/50 transition-colors"
                      />
                      {contributor.rank <= 3 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                          <Star className="w-2.5 h-2.5 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {contributor.name}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <TrendingUp className="w-3 h-3" />
                        <span>+{Math.floor(contributor.contributions * 0.1)} this week</span>
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5 text-center">
                  <div className="flex flex-col items-center">
                    <span className="font-semibold text-foreground">{contributor.contributions}</span>
                    <span className="text-xs text-muted-foreground">PRs</span>
                  </div>
                </td>

                <td className="px-6 py-5 text-center">
                  <div className="flex flex-col items-center">
                    <Badge variant="outline" className="text-xs">
                      {Math.floor(contributor.contributions / 500) + 1}
                    </Badge>
                    <div className="w-16 mt-1">
                      <Progress
                        value={Math.min((contributor.contributions % 500) / 5, 100)}
                        className="h-1"
                      />
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5 text-right">
                  <div className="flex flex-col items-end">
                    <span className="font-bold gradient-text text-lg">
                      {contributor.contributions.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground">contributions</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Enhanced Mobile Cards */}
      <div className="md:hidden space-y-4 p-4">
        {data.map((contributor, index) => (
          <div
            key={contributor.rank}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <ContributorCard contributor={contributor} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardTable;
