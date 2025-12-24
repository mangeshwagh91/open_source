import { useState, useEffect } from "react";
import { studentsAPI, assignmentsAPI, academicProposalsAPI, projectsAPI } from "@/lib/api";
import { GraduationCap, Users, Search, Filter, Plus, Calendar, CheckCircle, XCircle, Clock, BookMarked, User, Mail, IdCard, BookOpen, MessageSquare, Send, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const MentorAcademics = ({ currentUser }) => {
  const [students, setStudents] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [academicProjects, setAcademicProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const { toast } = useToast();

  const [projectForm, setProjectForm] = useState({
    title: "", subject: "", description: "", techStack: "", dueDate: "", priority: "medium"
  });

  const [reviewForm, setReviewForm] = useState({ mentorFeedback: "", rejectionReason: "", dueDate: "", priority: "medium" });

  useEffect(() => {
    fetchMentorData();
  }, []);

  const fetchMentorData = async () => {
    try {
      const [studentsData, proposalsData, projectsData] = await Promise.all([
        studentsAPI.getAll(),
        academicProposalsAPI.getAll(),
        assignmentsAPI.getAll()
      ]);
      setStudents(studentsData.students || studentsData || []);
      setProposals(proposalsData.proposals || proposalsData || []);
      setAcademicProjects(projectsData.assignments || projectsData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({ title: "Error", description: "Failed to load data", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || student.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = departmentFilter === "all" || student.department === departmentFilter;
    const matchesYear = yearFilter === "all" || student.passingYear === parseInt(yearFilter);
    return matchesSearch && matchesDepartment && matchesYear;
  });

  const uniqueDepartments = [...new Set(students.map(s => s.department).filter(Boolean))];
  const uniqueYears = [...new Set(students.map(s => s.passingYear))].sort((a, b) => b - a);

  const handleStudentSelect = (studentId) => {
    setSelectedStudents(prev => prev.includes(studentId) ? prev.filter(id => id !== studentId) : [...prev, studentId]);
  };

  const handleAssignProject = async (e) => {
    e.preventDefault();
    if (selectedStudents.length === 0) {
      return toast({ title: "Error", description: "Select at least one student", variant: "destructive" });
    }
    try {
      const techStackArray = projectForm.techStack.split(',').map(tech => tech.trim()).filter(tech => tech);
      await assignmentsAPI.create({
        ...projectForm, techStack: techStackArray, assignedTo: selectedStudents,
        assignedBy: currentUser.name, isGroupProject: selectedStudents.length > 1
      });
      toast({ title: "Success!", description: `Project assigned to ${selectedStudents.length} student(s)` });
      setShowAssignDialog(false);
      setSelectedStudents([]);
      setProjectForm({ title: "", subject: "", description: "", techStack: "", dueDate: "", priority: "medium" });
      fetchMentorData();
    } catch (error) {
      toast({ title: "Error", description: error?.message || "Failed to assign project", variant: "destructive" });
    }
  };

  const handleAcceptProposal = async () => {
    try {
      await academicProposalsAPI.accept(selectedProposal._id, {
        mentorFeedback: reviewForm.mentorFeedback,
        dueDate: reviewForm.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        priority: reviewForm.priority
      });
      toast({ title: "Success!", description: "Proposal accepted and project assigned" });
      setShowReviewDialog(false);
      setSelectedProposal(null);
      setReviewForm({ mentorFeedback: "", rejectionReason: "", dueDate: "", priority: "medium" });
      fetchMentorData();
    } catch (error) {
      toast({ title: "Error", description: error?.message || "Failed to accept proposal", variant: "destructive" });
    }
  };

  const handleRejectProposal = async () => {
    try {
      await academicProposalsAPI.reject(selectedProposal._id, {
        rejectionReason: reviewForm.rejectionReason,
        mentorFeedback: reviewForm.mentorFeedback
      });
      toast({ title: "Proposal Rejected", description: "Student has been notified" });
      setShowReviewDialog(false);
      setSelectedProposal(null);
      setReviewForm({ mentorFeedback: "", rejectionReason: "", dueDate: "", priority: "medium" });
      fetchMentorData();
    } catch (error) {
      toast({ title: "Error", description: error?.message || "Failed to reject proposal", variant: "destructive" });
    }
  };

  const handleDeleteStudent = async (studentId, studentName) => {
    if (!window.confirm(`Are you sure you want to delete ${studentName}? This action cannot be undone.`)) {
      return;
    }
    try {
      await studentsAPI.delete(studentId);
      toast({ title: "Success!", description: `${studentName} has been deleted` });
      fetchMentorData();
    } catch (error) {
      toast({ title: "Error", description: error?.message || "Failed to delete student", variant: "destructive" });
    }
  };

  const handleDeleteProject = async (projectId, projectName) => {
    if (!window.confirm(`Are you sure you want to delete "${projectName}"? This action cannot be undone.`)) {
      return;
    }
    try {
      await projectsAPI.delete(projectId);
      toast({ title: "Success!", description: `Project deleted` });
      fetchMentorData();
    } catch (error) {
      toast({ title: "Error", description: error?.message || "Failed to delete project", variant: "destructive" });
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

  return (
    <main className="container mx-auto px-4 pt-24 pb-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
          <GraduationCap className="w-5 h-5 text-primary" />
          <span className="text-primary text-sm font-medium">Mentor Dashboard</span>
        </div>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold gradient-text leading-tight mb-4">Academic Management</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Manage students, review academic proposals, and assign course projects
        </p>
        <Badge variant="outline" className="mt-4 bg-purple-500/10 text-purple-600 border-purple-300">
          Academic Section · For Course Assignments & Academic Projects
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-xs text-muted-foreground">Registered students</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{academicProjects.length}</div>
            <p className="text-xs text-muted-foreground">Assigned projects</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Proposals</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{proposals.filter(p => p.status === 'pending').length}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Proposals</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{proposals.length}</div>
            <p className="text-xs text-muted-foreground">All submissions</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="students" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="students" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Students</TabsTrigger>
          <TabsTrigger value="proposals" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Academic Proposals ({proposals.filter(p => p.status === 'pending').length})</TabsTrigger>
          <TabsTrigger value="projects" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Assigned Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="mt-6">
          <div className="glass-card p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search by name or student ID..." value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
              </div>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <Filter className="w-4 h-4 mr-2" /><SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {uniqueDepartments.map(dept => (<SelectItem key={dept} value={dept}>{dept}</SelectItem>))}
                </SelectContent>
              </Select>
              <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <Filter className="w-4 h-4 mr-2" /><SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {uniqueYears.map(year => (<SelectItem key={year} value={year.toString()}>{year}</SelectItem>))}
                </SelectContent>
              </Select>
              <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
                <DialogTrigger asChild>
                  <Button disabled={selectedStudents.length === 0}>
                    <Plus className="w-4 h-4 mr-2" />Assign Project ({selectedStudents.length})
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader><DialogTitle>Assign Project to {selectedStudents.length} Student(s)</DialogTitle></DialogHeader>
                  <form onSubmit={handleAssignProject} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div><Label>Project Title *</Label><Input required value={projectForm.title} onChange={(e) => setProjectForm({...projectForm, title: e.target.value})} /></div>
                      <div><Label>Subject *</Label><Input required value={projectForm.subject} onChange={(e) => setProjectForm({...projectForm, subject: e.target.value})} /></div>
                    </div>
                    <div><Label>Description *</Label><Textarea required value={projectForm.description} onChange={(e) => setProjectForm({...projectForm, description: e.target.value})} rows={3} /></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><Label>Due Date *</Label><Input type="date" required value={projectForm.dueDate} onChange={(e) => setProjectForm({...projectForm, dueDate: e.target.value})} /></div>
                      <div><Label>Priority</Label>
                        <Select value={projectForm.priority} onValueChange={(value) => setProjectForm({...projectForm, priority: value})}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div><Label>Tech Stack</Label><Input value={projectForm.techStack} onChange={(e) => setProjectForm({...projectForm, techStack: e.target.value})} placeholder="React, Node.js, MongoDB" /></div>
                    <Button type="submit" className="w-full">Assign Project</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            {selectedStudents.length > 0 && (
              <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                <span className="text-sm font-medium">{selectedStudents.length} student(s) selected</span>
              </div>
            )}
          </div>

          {loading ? (
            <div className="text-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div></div>
          ) : filteredStudents.length === 0 ? (
            <Card className="glass-card p-12 text-center">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Students Found</h3>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredStudents.map((student) => (
                <Card key={student._id} className={`glass-card cursor-pointer transition-all hover:shadow-lg ${selectedStudents.includes(student._id) ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => handleStudentSelect(student._id)}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-8">
                      <img src={student.avatar} alt={student.name} className="w-16 h-16 rounded-full flex-shrink-0" />
                      
                      <div className="flex items-center gap-2 min-w-[180px]">
                        <div>
                          <h3 className="text-lg font-semibold leading-tight">{student.name}</h3>
                          <p className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                            <IdCard className="w-3 h-3" />{student.studentId}
                          </p>
                        </div>
                        {selectedStudents.includes(student._id) && (<CheckCircle className="w-5 h-5 text-primary ml-2 flex-shrink-0" />)}
                      </div>
                      
                      <div className="flex items-center gap-2 min-w-[280px]">
                        <GraduationCap className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm">{student.department}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 min-w-[80px]">
                        <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm">{student.passingYear}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-muted-foreground ml-auto">
                        <Mail className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm">{student.email}</span>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteStudent(student._id, student.name);
                        }}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 ml-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="proposals" className="mt-6">
          {loading ? (
            <div className="text-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div></div>
          ) : proposals.length === 0 ? (
            <Card className="glass-card p-12 text-center">
              <Send className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Proposals Yet</h3>
            </Card>
          ) : (
            <div className="space-y-4">
              {proposals.map((proposal) => (
                <Card key={proposal._id} className="glass-card">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <CardTitle>{proposal.title}</CardTitle>
                          <Badge variant="secondary">{proposal.subject}</Badge>
                          <Badge className={getStatusColor(proposal.status)}>{proposal.status}</Badge>
                        </div>
                        <CardDescription>{proposal.description}</CardDescription>
                      </div>
                      {proposal.status === 'pending' && (
                        <Button size="sm" onClick={() => { setSelectedProposal(proposal); setShowReviewDialog(true); }}>
                          Review
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2"><User className="w-4 h-4 text-muted-foreground" />
                        <span>{proposal.proposedBy?.name} ({proposal.proposedBy?.studentId})</span>
                      </div>
                      <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{new Date(proposal.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    {proposal.techStack && proposal.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {proposal.techStack.map((tech, idx) => (<Badge key={idx} variant="outline" className="text-xs">{tech}</Badge>))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {selectedProposal && (
            <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
              <DialogContent className="max-w-2xl">
                <DialogHeader><DialogTitle>Review Proposal: {selectedProposal.title}</DialogTitle></DialogHeader>
                <div className="space-y-4">
                  <div><Label>Student</Label>
                    <p className="text-sm">{selectedProposal.proposedBy?.name} ({selectedProposal.proposedBy?.studentId})</p>
                  </div>
                  <div><Label>Description</Label><p className="text-sm text-muted-foreground">{selectedProposal.description}</p></div>
                  <div><Label>Mentor Feedback</Label>
                    <Textarea value={reviewForm.mentorFeedback} onChange={(e) => setReviewForm({...reviewForm, mentorFeedback: e.target.value})} placeholder="Provide feedback to the student..." rows={3} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><Label>Due Date (for acceptance)</Label><Input type="date" value={reviewForm.dueDate} onChange={(e) => setReviewForm({...reviewForm, dueDate: e.target.value})} /></div>
                    <div><Label>Priority</Label>
                      <Select value={reviewForm.priority} onValueChange={(value) => setReviewForm({...reviewForm, priority: value})}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div><Label>Rejection Reason (if rejecting)</Label>
                    <Textarea value={reviewForm.rejectionReason} onChange={(e) => setReviewForm({...reviewForm, rejectionReason: e.target.value})} placeholder="Explain why the proposal is being rejected..." rows={3} />
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={handleAcceptProposal} className="flex-1"><CheckCircle className="w-4 h-4 mr-2" />Accept & Assign</Button>
                    <Button onClick={handleRejectProposal} variant="destructive" className="flex-1"><XCircle className="w-4 h-4 mr-2" />Reject</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </TabsContent>

        <TabsContent value="projects" className="mt-6">
          {loading ? (
            <div className="text-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div></div>
          ) : academicProjects.length === 0 ? (
            <Card className="glass-card p-12 text-center">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Projects Assigned</h3>
            </Card>
          ) : (
            <div className="space-y-4">
              {academicProjects.map((project) => (
                <Card key={project._id} className="glass-card">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <CardTitle>{project.title}</CardTitle>
                          <Badge variant="secondary"><BookMarked className="w-3 h-3 mr-1" />{project.subject}</Badge>
                          <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                        </div>
                        <CardDescription>{project.description}</CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteProject(project._id, project.title)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-muted-foreground" />Due: {new Date(project.dueDate).toLocaleDateString()}</div>
                      <div className="flex items-center gap-2"><Users className="w-4 h-4 text-muted-foreground" />{project.assignedTo?.length || 0} student(s)</div>
                    </div>
                    {project.assignedTo && project.assignedTo.length > 0 && (
                      <div className="pt-2 border-t">
                        <p className="text-sm font-medium mb-2">Assigned to:</p>
                        <div className="flex flex-wrap gap-2">
                          {project.assignedTo.slice(0, 5).map((student) => (
                            <Badge key={student._id} variant="outline" className="text-xs">{student.name}</Badge>
                          ))}
                          {project.assignedTo.length > 5 && (<Badge variant="outline" className="text-xs">+{project.assignedTo.length - 5} more</Badge>)}
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

export default MentorAcademics;
