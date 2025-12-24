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
  Code2,
  Trash2,
  AlertTriangle,
  Settings,
  LogOut,
  Users
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
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Check if user is mentor/admin
  const isMentor = user && (user.role === 'mentor' || user.role === 'admin' || user.role === 'teacher');

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

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') {
      alert('Please type DELETE to confirm');
      return;
    }

    setIsDeleting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/students/${user._id || user.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Clear localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('student');
        
        // Redirect to home
        alert('Your account has been deleted successfully');
        navigate('/');
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to delete account');
      }
    } catch (error) {
      console.error('Delete account error:', error);
      alert('An error occurred while deleting your account');
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('student');
    navigate('/login');
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
                      {isMentor ? (
                        <>
                          <Crown className="w-3 h-3 mr-1" />
                          Mentor
                        </>
                      ) : (
                        <>
                          <GraduationCap className="w-3 h-3 mr-1" />
                          Student
                        </>
                      )}
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
                        {!isMentor && (
                          <>
                            <div className="flex items-center gap-2">
                              <GraduationCap className="w-4 h-4" />
                              <span className="text-sm font-medium">{user.studentId}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Building2 className="w-4 h-4" />
                              <span className="text-sm">{user.department}</span>
                            </div>
                          </>
                        )}
                        {isMentor ? (
                          <div className="flex items-center gap-2">
                            <Crown className="w-4 h-4" />
                            <span className="text-sm font-medium">Mentor</span>
                          </div>
                        ) : null}
                        <div className="flex items-center gap-2">
                          <CalendarDays className="w-4 h-4" />
                          <span className="text-sm">{isMentor ? 'Joined ' + new Date().getFullYear() : 'Class of ' + user.passingYear}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        className="gradient-bg text-primary-foreground gap-2 hover:shadow-lg transition-all"
                        onClick={() => navigate('/edit-profile')}
                      >
                        <Edit className="w-4 h-4" />
                        Edit Profile
                      </Button>
                      <Button 
                        variant="outline" 
                        className="gap-2 hover:bg-destructive/10 hover:border-destructive/50 hover:text-destructive transition-all"
                        onClick={handleLogout}
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </Button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Detailed Information Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Personal Information */}
            <div className="glass-card p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-foreground mb-6">Personal Information</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-0.5">Full Name</div>
                    <div className="text-sm font-medium text-foreground">{user.fullName || user.name || 'N/A'}</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-0.5">Email</div>
                    <div className="text-sm font-medium text-foreground">{user.email || 'N/A'}</div>
                  </div>
                </div>

                {user.phone && (
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-0.5">Phone</div>
                      <div className="text-sm font-medium text-foreground">{user.phone}</div>
                    </div>
                  </div>
                )}

                {!isMentor && user.department && (
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-0.5">Department</div>
                      <div className="text-sm font-medium text-foreground">{user.department}</div>
                    </div>
                  </div>
                )}

                {!isMentor && user.studentId && (
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-0.5">Student ID</div>
                      <div className="text-sm font-medium text-foreground">{user.studentId}</div>
                    </div>
                  </div>
                )}

                {!isMentor && user.passingYear && (
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CalendarDays className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-0.5">Class of</div>
                      <div className="text-sm font-medium text-foreground">{user.passingYear}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-card p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-foreground mb-6">Social Profiles</h2>
              <div className="space-y-4">
                {user.github ? (
                  <a
                    href={user.github.startsWith('http') ? user.github : `https://github.com/${user.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Github className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs text-muted-foreground mb-0.5">GitHub</div>
                      <div className="text-sm font-medium text-foreground truncate">{user.github}</div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-0.5" />
                  </a>
                ) : (
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 opacity-50">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Github className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-0.5">GitHub</div>
                      <div className="text-sm text-muted-foreground">Not added yet</div>
                    </div>
                  </div>
                )}

                {user.linkedin ? (
                  <a
                    href={user.linkedin.startsWith('http') ? user.linkedin : `https://linkedin.com/in/${user.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Linkedin className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs text-muted-foreground mb-0.5">LinkedIn</div>
                      <div className="text-sm font-medium text-foreground truncate">{user.linkedin}</div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-0.5" />
                  </a>
                ) : (
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 opacity-50">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Linkedin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-0.5">LinkedIn</div>
                      <div className="text-sm text-muted-foreground">Not added yet</div>
                    </div>
                  </div>
                )}

                {user.bio && (
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-0.5">Bio</div>
                      <div className="text-sm text-foreground">{user.bio}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {isMentor ? (
              <>
                <div className="glass-card p-6 hover-lift group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Users className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold gradient-text mb-1">{stats.totalPoints || 0}</div>
                  <div className="text-sm text-muted-foreground font-medium">Students Mentored</div>
                  <div className="text-xs text-muted-foreground mt-1">Total mentees</div>
                </div>

                <div className="glass-card p-6 hover-lift group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Code2 className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold gradient-text mb-1">{stats.totalContributions || 0}</div>
                  <div className="text-sm text-muted-foreground font-medium">Projects Created</div>
                  <div className="text-xs text-muted-foreground mt-1">Assigned projects</div>
                </div>

                <div className="glass-card p-6 hover-lift group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Trophy className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold gradient-text mb-1">{stats.rank || 0}</div>
                  <div className="text-sm text-muted-foreground font-medium">Active Sessions</div>
                  <div className="text-xs text-muted-foreground mt-1">Mentoring sessions</div>
                </div>

                <div className="glass-card p-6 hover-lift group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Award className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold gradient-text mb-1">{stats.certificates || 0}</div>
                  <div className="text-sm text-muted-foreground font-medium">Certifications</div>
                  <div className="text-xs text-muted-foreground mt-1">Awarded certifications</div>
                </div>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>

          {/* Content Grid - Only for Students */}
          {!isMentor && (
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
          )}

          {/* Account Settings Section */}
          <div className="mt-8 glass-card p-8 rounded-2xl border-2 border-destructive/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                <Settings className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Account Settings</h3>
                <p className="text-sm text-muted-foreground">Manage your account preferences</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Delete Account Section */}
              <div className="p-6 rounded-xl bg-destructive/5 border border-destructive/20">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-2">Delete Account</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Once you delete your account, there is no going back. All your data, including contributions, 
                      certificates, and leaderboard rankings will be permanently removed.
                    </p>
                    <Button 
                      variant="destructive" 
                      className="gap-2"
                      onClick={() => setShowDeleteDialog(true)}
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Delete Confirmation Dialog */}
          {showDeleteDialog && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="glass-card-elevated max-w-md w-full p-8 rounded-2xl animate-in fade-in zoom-in duration-200">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-destructive/20 flex items-center justify-center">
                    <AlertTriangle className="w-7 h-7 text-destructive" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Delete Account?</h3>
                    <p className="text-sm text-muted-foreground">This action cannot be undone</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <p className="text-sm text-muted-foreground">
                    You are about to permanently delete your account. This will:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground pl-5">
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-1">•</span>
                      <span>Remove all your personal information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-1">•</span>
                      <span>Delete your contribution history</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-1">•</span>
                      <span>Remove you from the leaderboard</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-1">•</span>
                      <span>Revoke all your certificates</span>
                    </li>
                  </ul>

                  <div className="pt-4">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Type <span className="font-bold text-destructive">DELETE</span> to confirm:
                    </label>
                    <input
                      type="text"
                      value={deleteConfirmText}
                      onChange={(e) => setDeleteConfirmText(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-muted/50 border border-border focus:border-destructive focus:outline-none focus:ring-2 focus:ring-destructive/20 transition-all"
                      placeholder="Type DELETE"
                      autoFocus
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setShowDeleteDialog(false);
                      setDeleteConfirmText('');
                    }}
                    disabled={isDeleting}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1 gap-2"
                    onClick={handleDeleteAccount}
                    disabled={deleteConfirmText !== 'DELETE' || isDeleting}
                  >
                    {isDeleting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4" />
                        Delete Forever
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
