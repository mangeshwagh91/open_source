import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { proposalsAPI } from "@/lib/api";
import {
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Trash2,
  Plus,
  Github,
  Code2,
  Users,
  Target,
  AlertCircle
} from "lucide-react";

const MyProposals = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    try {
      const data = await proposalsAPI.getMyProposals();
      setProposals(Array.isArray(data) ? data : (data.proposals || []));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch proposals",
        variant: "destructive"
      });
      setProposals([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this proposal?')) return;

    try {
      await proposalsAPI.delete(id);
      toast({
        title: "Deleted",
        description: "Proposal deleted successfully"
      });
      fetchProposals();
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete proposal",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-amber-500"><Clock className="w-3 h-3 mr-1" />Pending Review</Badge>;
      case 'accepted':
        return <Badge className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Accepted</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background main-bg-pattern">
        <Navbar />
        <div className="flex items-center justify-center pt-32">
          <div className="text-center">
            <div className="text-xl text-muted-foreground">Loading your proposals...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background main-bg-pattern">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-2">
                My Project Proposals
              </h1>
              <p className="text-muted-foreground text-lg">
                Track the status of your open-source project submissions
              </p>
              <Badge variant="outline" className="mt-2 bg-blue-500/10 text-blue-600 border-blue-300">
                Projects Section Proposals
              </Badge>
            </div>
            <Button onClick={() => navigate('/propose-project')} className="gap-2">
              <Plus className="w-4 h-4" />
              New Proposal
            </Button>
          </div>

          {/* Proposals List */}
          {proposals.length === 0 ? (
            <Card className="text-center py-16">
              <CardContent>
                <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Proposals Yet</h3>
                <p className="text-muted-foreground mb-6">
                  You haven't submitted any project proposals. Start by proposing your first project!
                </p>
                <Button onClick={() => navigate('/propose-project')} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Propose a Project
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {proposals.map((proposal) => (
                <Card key={proposal._id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-2xl">{proposal.title}</CardTitle>
                          {getStatusBadge(proposal.status)}
                        </div>
                        <CardDescription className="text-base">
                          {proposal.description.substring(0, 150)}
                          {proposal.description.length > 150 && '...'}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Code2 className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Category:</span>
                        <span className="font-medium">{proposal.category}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Target className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Difficulty:</span>
                        <span className="font-medium">{proposal.difficulty}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-medium">{proposal.expectedDuration} weeks</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Team:</span>
                        <span className="font-medium">{(!proposal.maxTeamSize || proposal.maxTeamSize >= 9999) ? 'Unlimited' : proposal.maxTeamSize} max</span>
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(proposal.techStack) && proposal.techStack.map((tech, idx) => (
                          <Badge key={idx} variant="outline">{tech}</Badge>
                        ))}
                      </div>
                    </div>

                    {/* Feedback */}
                    {proposal.status === 'accepted' && proposal.facultyFeedback && (
                      <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg p-4 mb-4">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-green-900 dark:text-green-100 mb-1">Faculty Feedback</p>
                            <p className="text-sm text-green-800 dark:text-green-200">{proposal.facultyFeedback}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {proposal.status === 'rejected' && proposal.rejectionReason && (
                      <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg p-4 mb-4">
                        <div className="flex items-start gap-2">
                          <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-red-900 dark:text-red-100 mb-1">Rejection Reason</p>
                            <p className="text-sm text-red-800 dark:text-red-200">{proposal.rejectionReason}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Submitted {new Date(proposal.createdAt).toLocaleDateString()}</span>
                        {proposal.reviewedAt && (
                          <span>• Reviewed {new Date(proposal.reviewedAt).toLocaleDateString()}</span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(proposal.githubRepo, '_blank')}
                        >
                          <Github className="w-4 h-4 mr-2" />
                          GitHub
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/proposal/${proposal._id}`)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        {proposal.status === 'pending' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(proposal._id)}
                            className="text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                        {proposal.status === 'accepted' && proposal.publishedProjectId && (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => navigate(`/projects`)}
                          >
                            View Project
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MyProposals;
