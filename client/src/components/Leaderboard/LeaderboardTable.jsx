import { Trophy, Medal, Award } from "lucide-react";

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

const LeaderboardTable = ({ data }) => {
  return (
    <div className="glass-card overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Rank</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Contributor</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">Contributions</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-muted-foreground">Points</th>
            </tr>
          </thead>
          <tbody>
            {data.map((contributor, index) => (
              <tr
                key={contributor.rank}
                className="border-b border-border/30 last:border-0 hover:bg-muted/30 transition-colors opacity-0 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className={`font-bold text-lg ${
                      contributor.rank === 1 ? "text-amber-500" :
                      contributor.rank === 2 ? "text-slate-400" :
                      contributor.rank === 3 ? "text-amber-700" :
                      "text-muted-foreground"
                    }`}>
                      #{contributor.rank}
                    </span>
                    {getBadgeIcon(contributor.badge)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={contributor.avatar}
                      alt={contributor.name}
                      className="w-10 h-10 rounded-full bg-muted"
                    />
                    <span className="font-medium text-foreground">{contributor.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-muted-foreground">{contributor.contributions} PRs</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="font-semibold gradient-text text-lg">{contributor.points}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-border/30">
        {data.map((contributor, index) => (
          <div
            key={contributor.rank}
            className="p-4 opacity-0 animate-fade-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className={`font-bold text-lg ${
                  contributor.rank === 1 ? "text-amber-500" :
                  contributor.rank === 2 ? "text-slate-400" :
                  contributor.rank === 3 ? "text-amber-700" :
                  "text-muted-foreground"
                }`}>
                  #{contributor.rank}
                </span>
                {getBadgeIcon(contributor.badge)}
              </div>
              <span className="font-semibold gradient-text text-lg">{contributor.points} pts</span>
            </div>
            <div className="flex items-center gap-3">
              <img
                src={contributor.avatar}
                alt={contributor.name}
                className="w-12 h-12 rounded-full bg-muted"
              />
              <div>
                <div className="font-medium text-foreground">{contributor.name}</div>
                <div className="text-sm text-muted-foreground">{contributor.contributions} contributions</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardTable;
