import { useState, useEffect } from "react";
import { assignmentsAPI, academicProposalsAPI } from "@/lib/api";
import { GraduationCap, BookOpen, Plus, Calendar, Clock, CheckCircle, XCircle, GitFork, Star, Eye, Send, MessageSquare, Github } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const StudentAcademics = ({ currentUser }) => {
  const [academicProjects, setAcademicProjects] = useState([]);
  const [myProposals, setMyProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProposeDialog, setShowProposeDialog] = useState(false);
  const { toast } = useToast();

  const [proposalForm, setProposalForm] = useState({
    title: "", subject: "", description: "", techStack: "",
    githubRepo: "", expectedDuration: "", proposedTo: "Any Mentor"
  });

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const [assignmentsResponse, proposalsResponse] = await Promise.all([
        assignmentsAPI.getByStudent(currentUser._id),
        academicProposalsAPI.getByStudent(currentUser._id)
      ]);
      setAcademicProjects(assignmentsResponse.assignments || assignmentsResponse || []);
      setMyProposals(proposalsResponse.proposals || proposalsResponse || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({ title: "Error", description: "Failed to load data", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleProposeProject = async (e) => {
    e.preventDefault();
    try {
      const techStackArray = proposalForm.techStack.split(',').map(tech => tech.trim()).filter(tech => tech);
      await academicProposalsAPI.create({ ...proposalForm, techStack: techStackArray, proposedBy: currentUser._id });
      toast({ title: "Success!", description: "Project proposal submitted successfully" });
      setShowProposeDialog(false);
      setProposalForm({ title: "", subject: "", description: "", techStack: "", githubRepo: "", expectedDuration: "", proposedTo: "Any Mentor" });
      fetchStudentData();
    } catch (error) {
      toast({ title: "Error", description: error?.message || "Failed to submit proposal", variant: "destructive" });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': case 'accepted': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'in-progress': case 'pending': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'overdue': case 'rejected': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': case 'accepted': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': case 'pending': return <Clock className="w-4 h-4" />;
      case 'overdue': case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <main className="container mx-auto px-4 pt-24 pb-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6 animate-fade-in">
          <GraduationCap className="w-5 h-5 text-primary" />
          <span className="text-primary text-sm font-medium">Academic Projects</span>
        </div>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold gradient-text leading-tight mb-4 animate-fade-in">
          My Academic Projects
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in">
          View your assigned projects and propose new project ideas to mentors
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned Projects</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{academicProjects.length}</div>
            <p className="text-xs text-muted-foreground">Active assignments</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Proposals</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myProposals.length}</div>
            <p className="text-xs text-muted-foreground">Submitted proposals</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myProposals.filter(p => p.status === 'pending').length}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end mb-6">
        <Dialog open={showProposeDialog} onOpenChange={setShowProposeDialog}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" />Propose Project</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Propose Academic Project</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleProposeProject} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label>Project Title *</Label>
                  <Input required value={proposalForm.title} onChange={(e) => setProposalForm({...proposalForm, title: e.target.value})} placeholder="e.g., E-Commerce Platform" />
                </div>
                <div><Label>Subject *</Label>
                  <Input required value={proposalForm.subject} onChange={(e) => setProposalForm({...proposalForm, subject: e.target.value})} placeholder="e.g., Web Development" />
                </div>
              </div>
              <div><Label>Description *</Label>
                <Textarea required value={proposalForm.description} onChange={(e) => setProposalForm({...proposalForm, description: e.target.value})} rows={4} placeholder="Describe your project idea..." />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label>Tech Stack</Label>
                  <Input value={proposalForm.techStack} onChange={(e) => setProposalForm({...proposalForm, techStack: e.target.value})} placeholder="React, Node.js, MongoDB" />
                </div>
                <div><Label>Expected Duration</Label>
                  <Input value={proposalForm.expectedDuration} onChange={(e) => setProposalForm({...proposalForm, expectedDuration: e.target.value})} placeholder="e.g., 4 weeks" />
                </div>
              </div>
              <div><Label>GitHub Repository (if exists)</Label>
                <Input value={proposalForm.githubRepo} onChange={(e) => setProposalForm({...proposalForm, githubRepo: e.target.value})} placeholder="https://github.com/user/repo" />
              </div>
              <div><Label>Propose To</Label>
                <Input value={proposalForm.proposedTo} onChange={(e) => setProposalForm({...proposalForm, proposedTo: e.target.value})} placeholder="Mentor name or 'Any Mentor'" />
              </div>
              <Button type="submit" className="w-full">Submit Proposal</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="assigned" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="assigned">Assigned Projects</TabsTrigger>
          <TabsTrigger value="proposals">My Proposals</TabsTrigger>
        </TabsList>

        <TabsContent value="assigned" className="mt-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground mt-4">Loading projects...</p>
            </div>
          ) : academicProjects.length === 0 ? (
            <Card className="glass-card p-12 text-center">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Assigned Projects</h3>
              <p className="text-muted-foreground">You don't have any academic projects assigned yet.</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {academicProjects.map((project) => (
                <Card key={project._id} className="glass-card">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <CardTitle className="text-xl">{project.title}</CardTitle>
                          <Badge variant="secondary"><BookOpen className="w-3 h-3 mr-1" />{project.subject}</Badge>
                          <Badge className={getStatusColor(project.status)}>
                            {getStatusIcon(project.status)}<span className="ml-1">{project.status}</span>
                          </Badge>
                        </div>
                        <CardDescription>{project.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2"><GraduationCap className="w-4 h-4 text-muted-foreground" /><span>Assigned by: {project.assignedBy}</span></div>
                      <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-muted-foreground" /><span>Due: {new Date(project.dueDate).toLocaleDateString()}</span></div>
                    </div>
                    {project.techStack && project.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, idx) => (<Badge key={idx} variant="outline" className="text-xs">{tech}</Badge>))}
                      </div>
                    )}
                    {project.githubRepo && (
                      <div className="pt-2 border-t">
                        <a href={project.githubRepo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline">
                          <Github className="w-4 h-4" />View GitHub Repository
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="proposals" className="mt-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            </div>
          ) : myProposals.length === 0 ? (
            <Card className="glass-card p-12 text-center">
              <Send className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Proposals Yet</h3>
              <p className="text-muted-foreground mb-4">You haven't submitted any project proposals.</p>
              <Button onClick={() => setShowProposeDialog(true)}><Plus className="w-4 h-4 mr-2" />Propose Your First Project</Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {myProposals.map((proposal) => (
                <Card key={proposal._id} className="glass-card">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <CardTitle>{proposal.title}</CardTitle>
                          <Badge variant="secondary">{proposal.subject}</Badge>
                          <Badge className={getStatusColor(proposal.status)}>
                            {getStatusIcon(proposal.status)}<span className="ml-1">{proposal.status}</span>
                          </Badge>
                        </div>
                        <CardDescription>{proposal.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2"><Calendar className="w-4 h-4" />Submitted: {new Date(proposal.createdAt).toLocaleDateString()}</div>
                      {proposal.proposedTo && <div className="flex items-center gap-2"><GraduationCap className="w-4 h-4" />To: {proposal.proposedTo}</div>}
                    </div>
                    {proposal.techStack && proposal.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {proposal.techStack.map((tech, idx) => (<Badge key={idx} variant="outline" className="text-xs">{tech}</Badge>))}
                      </div>
                    )}
                    {proposal.githubRepo && (
                      <div className="pt-2 border-t">
                        <a href={proposal.githubRepo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline">
                          <Github className="w-4 h-4" />View GitHub Repository
                        </a>
                      </div>
                    )}
                    {(proposal.mentorFeedback || proposal.rejectionReason) && (
                      <div className="pt-2 border-t">
                        <div className="flex items-start gap-2">
                          <MessageSquare className="w-4 h-4 text-muted-foreground mt-1" />
                          <div><p className="text-sm font-medium">Mentor Feedback:</p>
                            <p className="text-sm text-muted-foreground">{proposal.mentorFeedback || proposal.rejectionReason}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default StudentAcademics;
