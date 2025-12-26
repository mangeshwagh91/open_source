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
            <div className="flex items-center gap-2 mt-1">
              {contributor.github && (
                <a
                  href={contributor.github.startsWith('http') ? contributor.github : `https://github.com/${contributor.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  title={`GitHub: ${contributor.github}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.089 2.91.833.091-.647.35-1.089.636-1.34-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.686-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.593 1.028 2.686 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .267.18.577.688.479C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/></svg>
                </a>
              )}
              {contributor.linkedin && (
                <a
                  href={contributor.linkedin.startsWith('http') ? contributor.linkedin : `https://linkedin.com/in/${contributor.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  title={`LinkedIn: ${contributor.linkedin}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.6 2.001 3.6 4.601v5.595z"/></svg>
                </a>
              )}
            </div>
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
            className="animate-fade-in-up animate-scale-in"
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
