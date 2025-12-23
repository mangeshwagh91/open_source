import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Github,
  Linkedin,
  GraduationCap,
  Building2,
  CalendarDays,
  ExternalLink,
  Award,
  Trophy,
  Star,
  CheckCircle,
  Edit,
  Crown,
  Target,
  TrendingUp,
  Code2
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalPoints: 0,
    totalContributions: 0,
    rank: 0,
    projectsContributed: 0,
    certificates: 0
  });
  const [recentContributions, setRecentContributions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user from localStorage
    const studentData = localStorage.getItem('user') || localStorage.getItem('student');
    if (studentData && studentData !== 'undefined') {
      try {
        const parsedUser = JSON.parse(studentData);
        setUser(parsedUser);
        fetchUserStats(parsedUser._id || parsedUser.id);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('student');
        navigate('/login');
      }
    } else {
      // Redirect to login if no user data
      navigate('/login');
    }
  }, [navigate]);

  const fetchUserStats = async (userId) => {
    try {
      // Fetch user stats from leaderboard
      const leaderboardRes = await fetch(`${API_URL}/leaderboard`);
      const leaderboardData = await leaderboardRes.json();
      
      // Find current user in leaderboard
      const userRank = leaderboardData.leaderboard?.find(entry => 
        entry.studentId === userId || entry.student?._id === userId
      );
      
      if (userRank) {
        setStats({
          totalPoints: userRank.totalPoints || 0,
          totalContributions: userRank.contributions || 0,
          rank: userRank.rank || 0,
          projectsContributed: userRank.projectsContributed || 0,
          certificates: userRank.certificates || 0
        });
      }
    } catch (error) {
      console.error('Failed to fetch user stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background main-bg-pattern">
        <Navbar />
        <div className="flex items-center justify-center pt-32">
          <div className="text-center">
            <div className="text-xl text-muted-foreground">Loading profile...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background main-bg-pattern">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Profile Header with Banner */}
          <div className="relative mb-8">
            {/* Banner Background */}
            <div className="h-48 rounded-3xl bg-gradient-to-br from-primary via-primary/80 to-accent relative overflow-hidden mb-[-4rem]">
              <div className="absolute inset-0 bg-grid-white/10" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>
            
            {/* Profile Info Card */}
            <div className="relative glass-card-elevated p-8 rounded-3xl">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Avatar */}
                <div className="flex-shrink-0 -mt-20">
                  <div className="relative">
                    <div className="w-40 h-40 rounded-3xl gradient-bg flex items-center justify-center shadow-2xl border-4 border-background">
                      <User className="w-20 h-20 text-primary-foreground" />
                    </div>
                    <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1">
                      <GraduationCap className="w-3 h-3 mr-1" />
                      Student
                    </Badge>
                  </div>
                </div>

                {/* User Info */}
                <div className="flex-1 pt-4">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                    <div>
                      <h1 className="text-4xl font-bold text-foreground mb-2">
                        {user.fullName}
                      </h1>
                      <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4" />
                          <span className="text-sm font-medium">{user.studentId}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          <span className="text-sm">{user.department}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarDays className="w-4 h-4" />
                          <span className="text-sm">Class of {user.passingYear}</span>
                        </div>
                      </div>
                    </div>
                    <Button className="gradient-bg text-primary-foreground gap-2 hover:shadow-lg transition-all">
                      <Edit className="w-4 h-4" />
                      Edit Profile
                    </Button>
                  </div>

                  {/* Contact & Social */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs text-muted-foreground mb-0.5">Email</div>
                        <div className="text-sm font-medium truncate">{user.email}</div>
                      </div>
                    </div>

                    {user.github && (
                      <a 
                        href={user.github.startsWith('http') ? user.github : `https://github.com/${user.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all group cursor-pointer"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <Github className="w-5 h-5 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs text-muted-foreground mb-0.5">GitHub</div>
                          <div className="text-sm font-medium truncate">
                            {user.github.replace('https://github.com/', '').replace('http://github.com/', '')}
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                      </a>
                    )}

                    {user.linkedin && (
                      <a 
                        href={user.linkedin.startsWith('http') ? user.linkedin : `https://linkedin.com/in/${user.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all group cursor-pointer"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <Linkedin className="w-5 h-5 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs text-muted-foreground mb-0.5">LinkedIn</div>
                          <div className="text-sm font-medium truncate">
                            {user.linkedin.replace('https://linkedin.com/in/', '').replace('http://linkedin.com/in/', '')}
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="glass-card p-6 hover-lift group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Star className="w-7 h-7 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold gradient-text mb-1">{stats.totalPoints}</div>
              <div className="text-sm text-muted-foreground font-medium">Total Points</div>
              <div className="text-xs text-muted-foreground mt-1">Contribution points earned</div>
            </div>

            <div className="glass-card p-6 hover-lift group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Code2 className="w-7 h-7 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold gradient-text mb-1">{stats.totalContributions}</div>
              <div className="text-sm text-muted-foreground font-medium">Contributions</div>
              <div className="text-xs text-muted-foreground mt-1">Pull requests merged</div>
            </div>

            <div className="glass-card p-6 hover-lift group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Trophy className="w-7 h-7 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold gradient-text mb-1">#{stats.rank || 'N/A'}</div>
              <div className="text-sm text-muted-foreground font-medium">Leaderboard Rank</div>
              <div className="text-xs text-muted-foreground mt-1">Current position</div>
            </div>

            <div className="glass-card p-6 hover-lift group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Award className="w-7 h-7 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold gradient-text mb-1">{stats.certificates}</div>
              <div className="text-sm text-muted-foreground font-medium">Certificates</div>
              <div className="text-xs text-muted-foreground mt-1">Total earned</div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <div className="lg:col-span-2 glass-card p-8 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-1">Quick Actions</h3>
                  <p className="text-sm text-muted-foreground">Navigate to key sections</p>
                </div>
                <Target className="w-6 h-6 text-primary" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="justify-start h-auto py-5 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                  onClick={() => navigate('/certificates')}
                >
                  <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <Award className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-base mb-1">Certificates</div>
                    <div className="text-xs text-muted-foreground">View your achievements</div>
                  </div>
                </Button>

                <Button 
                  variant="outline" 
                  className="justify-start h-auto py-5 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                  onClick={() => navigate('/projects')}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <Code2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-base mb-1">Projects</div>
                    <div className="text-xs text-muted-foreground">Explore opportunities</div>
                  </div>
                </Button>

                <Button 
                  variant="outline" 
                  className="justify-start h-auto py-5 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                  onClick={() => navigate('/leaderboard')}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-base mb-1">Leaderboard</div>
                    <div className="text-xs text-muted-foreground">Check your ranking</div>
                  </div>
                </Button>

                <Button 
                  variant="outline" 
                  className="justify-start h-auto py-5 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                  onClick={() => navigate('/roadmap')}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-base mb-1">Roadmap</div>
                    <div className="text-xs text-muted-foreground">View learning path</div>
                  </div>
                </Button>
              </div>
            </div>

            {/* Activity Summary */}
            <div className="glass-card p-8 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">Activity</h3>
                  <p className="text-sm text-muted-foreground">Recent progress</p>
                </div>
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-muted/30">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-sm font-medium">Getting Started</span>
                  </div>
                  <p className="text-xs text-muted-foreground pl-5">
                    Welcome to CodeFest! Start exploring projects.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-muted/30 opacity-50">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-sm font-medium">First Contribution</span>
                  </div>
                  <p className="text-xs text-muted-foreground pl-5">
                    Complete your first project contribution.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-muted/30 opacity-50">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="text-sm font-medium">Certificate Earned</span>
                  </div>
                  <p className="text-xs text-muted-foreground pl-5">
                    Earn your first certificate.
                  </p>
                </div>
              </div>

              <Button variant="ghost" className="w-full mt-6" size="sm">
                View All Activity
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
