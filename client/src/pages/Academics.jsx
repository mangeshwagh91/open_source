import { useState, useEffect } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { studentsAPI, assignmentsAPI } from "@/lib/api";
import {
  GraduationCap,
  Users,
  BookOpen,
  Search,
  Filter,
  Plus,
  UserPlus,
  ClipboardList,
  X,
  Calendar,
  Mail,
  IdCard,
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Academics = () => {
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [yearFilter, setYearFilter] = useState("all");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [showAddStudentDialog, setShowAddStudentDialog] = useState(false);
  const { toast } = useToast();

  const [assignmentForm, setAssignmentForm] = useState({
    title: "",
    description: "",
    assignedBy: "",
    dueDate: "",
    priority: "medium",
    techStack: "",
    isGroupProject: false
  });

  const [studentForm, setStudentForm] = useState({
    studentId: "",
    name: "",
    email: "",
    password: "",
    department: "",
    passingYear: "",
    github: "",
    linkedin: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [studentsData, assignmentsData] = await Promise.all([
        studentsAPI.getAll(),
        assignmentsAPI.getAll()
      ]);
      setStudents(studentsData.students || studentsData);
      setAssignments(assignmentsData.assignments || assignmentsData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to load data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesYear = yearFilter === "all" || student.passingYear === parseInt(yearFilter);
    return matchesSearch && matchesYear;
  });

  const uniqueYears = [...new Set(students.map(s => s.passingYear))].sort((a, b) => b - a);

  const handleStudentSelect = (studentId) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleAssignProject = async (e) => {
    e.preventDefault();
    
    if (selectedStudents.length === 0) {
      toast({
        title: "No Students Selected",
        description: "Please select at least one student to assign the project.",
        variant: "destructive"
      });
      return;
    }

    try {
      const techStackArray = assignmentForm.techStack
        .split(',')
        .map(tech => tech.trim())
        .filter(tech => tech);

      await assignmentsAPI.create({
        ...assignmentForm,
        techStack: techStackArray,
        assignedTo: selectedStudents,
        isGroupProject: selectedStudents.length > 1
      });

      toast({
        title: "Success!",
        description: `Project assigned to ${selectedStudents.length} student(s) successfully.`
      });

      setShowAssignDialog(false);
      setSelectedStudents([]);
      setAssignmentForm({
        title: "",
        description: "",
        assignedBy: "",
        dueDate: "",
        priority: "medium",
        techStack: "",
        isGroupProject: false
      });
      fetchData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to assign project. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    
    try {
      const payload = {
        ...studentForm,
        passingYear: studentForm.passingYear ? parseInt(studentForm.passingYear, 10) : undefined
      };
      await studentsAPI.create(payload);
      
      toast({
        title: "Success!",
        description: "Student added successfully."
      });

      setShowAddStudentDialog(false);
      setStudentForm({
        studentId: "",
        name: "",
        email: "",
        password: "",
        department: "",
        passingYear: "",
        github: "",
        linkedin: ""
      });
      fetchData();
    } catch (error) {
      toast({
        title: "Error",
          description: error?.message || "Failed to add student. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'in-progress': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'overdue': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'low': return 'bg-green-500/10 text-green-500 border-green-500/20';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-background main-bg-pattern">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6 animate-fade-in">
            <GraduationCap className="w-5 h-5 text-primary" />
            <span className="text-primary text-sm font-medium">Academic Management</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold gradient-text leading-tight mb-4 animate-fade-in">
            Academics Portal
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in">
            Manage students, assign projects, and track academic progress all in one place.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="glass-card opacity-0 animate-fade-in" style={{ animationDelay: '0s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{students.length}</div>
              <p className="text-xs text-muted-foreground">Active enrollments</p>
            </CardContent>
          </Card>

          <Card className="glass-card opacity-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <ClipboardList className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assignments.length}</div>
              <p className="text-xs text-muted-foreground">Assignments given</p>
            </CardContent>
          </Card>

          <Card className="glass-card opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Passing Years</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{uniqueYears.length}</div>
              <p className="text-xs text-muted-foreground">Different years</p>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="glass-card p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search students by name or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {uniqueYears.map(year => (
                    <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Dialog open={showAddStudentDialog} onOpenChange={setShowAddStudentDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Student
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Student</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddStudent} className="space-y-4">
                    <div>
                      <Label htmlFor="studentId">Student ID</Label>
                      <Input
                        id="studentId"
                        required
                        value={studentForm.studentId}
                        onChange={(e) => setStudentForm({...studentForm, studentId: e.target.value})}
                        placeholder="e.g., STU2024001"
                      />
                    </div>
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        required
                        value={studentForm.name}
                        onChange={(e) => setStudentForm({...studentForm, name: e.target.value})}
                        placeholder="Enter student name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={studentForm.email}
                        onChange={(e) => setStudentForm({...studentForm, email: e.target.value})}
                        placeholder="student@example.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="password">Temporary Password</Label>
                      <Input
                        id="password"
                        type="password"
                        required
                        value={studentForm.password}
                        onChange={(e) => setStudentForm({...studentForm, password: e.target.value})}
                        placeholder="Set a temporary password"
                      />
                    </div>
                    <div>
                      <Label>Department</Label>
                      <Select value={studentForm.department} onValueChange={(val) => setStudentForm({...studentForm, department: val})}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Computer Science">Computer Science</SelectItem>
                          <SelectItem value="Information Technology">Information Technology</SelectItem>
                          <SelectItem value="Electronics and Telecommunication">Electronics and Telecommunication</SelectItem>
                          <SelectItem value="Electrical">Electrical</SelectItem>
                          <SelectItem value="Mechanical">Mechanical</SelectItem>
                          <SelectItem value="Civil">Civil</SelectItem>
                          <SelectItem value="Others">Others</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="passingYear">Passing Year</Label>
                        <Input
                          id="passingYear"
                          type="number"
                          required
                          value={studentForm.passingYear}
                          onChange={(e) => setStudentForm({...studentForm, passingYear: e.target.value})}
                          placeholder="e.g., 2026"
                          min="2000"
                          max="2100"
                        />
                      </div>
                      <div>
                        <Label htmlFor="github">GitHub Profile URL</Label>
                        <Input
                          id="github"
                          required
                          value={studentForm.github}
                          onChange={(e) => setStudentForm({...studentForm, github: e.target.value})}
                          placeholder="https://github.com/username"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="linkedin">LinkedIn Profile URL (optional)</Label>
                      <Input
                        id="linkedin"
                        value={studentForm.linkedin}
                        onChange={(e) => setStudentForm({...studentForm, linkedin: e.target.value})}
                        placeholder="https://www.linkedin.com/in/username"
                      />
                    </div>
                    <Button type="submit" className="w-full">Add Student</Button>
                  </form>
                </DialogContent>
              </Dialog>

              <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
                <DialogTrigger asChild>
                  <Button disabled={selectedStudents.length === 0}>
                    <Plus className="w-4 h-4 mr-2" />
                    Assign Project ({selectedStudents.length})
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      Assign Project to {selectedStudents.length} Student(s)
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAssignProject} className="space-y-4">
                    <div>
                      <Label htmlFor="title">Project Title</Label>
                      <Input
                        id="title"
                        required
                        value={assignmentForm.title}
                        onChange={(e) => setAssignmentForm({...assignmentForm, title: e.target.value})}
                        placeholder="E-Commerce Website"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        required
                        value={assignmentForm.description}
                        onChange={(e) => setAssignmentForm({...assignmentForm, description: e.target.value})}
                        placeholder="Detailed project description..."
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="assignedBy">Assigned By (Teacher)</Label>
                        <Input
                          id="assignedBy"
                          required
                          value={assignmentForm.assignedBy}
                          onChange={(e) => setAssignmentForm({...assignmentForm, assignedBy: e.target.value})}
                          placeholder="Dr. John Doe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="dueDate">Due Date</Label>
                        <Input
                          id="dueDate"
                          type="date"
                          required
                          value={assignmentForm.dueDate}
                          onChange={(e) => setAssignmentForm({...assignmentForm, dueDate: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="priority">Priority</Label>
                        <Select 
                          value={assignmentForm.priority} 
                          onValueChange={(value) => setAssignmentForm({...assignmentForm, priority: value})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="techStack">Tech Stack (comma-separated)</Label>
                        <Input
                          id="techStack"
                          value={assignmentForm.techStack}
                          onChange={(e) => setAssignmentForm({...assignmentForm, techStack: e.target.value})}
                          placeholder="React, Node.js, MongoDB"
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full">Assign Project</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {selectedStudents.length > 0 && (
            <div className="mt-4 p-3 bg-primary/10 rounded-lg flex items-center justify-between">
              <span className="text-sm font-medium">
                {selectedStudents.length} student(s) selected
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedStudents([])}
              >
                <X className="w-4 h-4 mr-1" />
                Clear Selection
              </Button>
            </div>
          )}
        </div>

        {/* Students Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Students</h2>
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground mt-4">Loading students...</p>
            </div>
          ) : filteredStudents.length === 0 ? (
            <Card className="glass-card p-12 text-center">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Students Found</h3>
              <p className="text-muted-foreground mb-4">Add your first student to get started.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStudents.map((student) => (
                <Card 
                  key={student._id} 
                  className={`glass-card cursor-pointer transition-all hover:scale-105 ${
                    selectedStudents.includes(student._id) ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => handleStudentSelect(student._id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <img 
                          src={student.avatar} 
                          alt={student.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <CardTitle className="text-lg">{student.name}</CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <IdCard className="w-3 h-3" />
                            {student.studentId}
                          </CardDescription>
                        </div>
                      </div>
                      {selectedStudents.includes(student._id) && (
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <BookOpen className="w-4 h-4 text-muted-foreground" />
                      <span>Passing Year: {student.passingYear}</span>
                    </div>
                    {student.department && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <GraduationCap className="w-4 h-4" />
                        <span>{student.department}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{student.email}</span>
                    </div>
                    {student.semester && (
                      <Badge variant="outline" className="mt-2">
                        Semester {student.semester}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Recent Assignments */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Recent Assignments</h2>
          {assignments.length === 0 ? (
            <Card className="glass-card p-12 text-center">
              <ClipboardList className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Assignments Yet</h3>
              <p className="text-muted-foreground">Select students and assign your first project.</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {assignments.map((assignment) => (
                <Card key={assignment._id} className="glass-card">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle>{assignment.title}</CardTitle>
                          <Badge className={getPriorityColor(assignment.priority)}>
                            {assignment.priority}
                          </Badge>
                          <Badge className={getStatusColor(assignment.status)}>
                            {assignment.status}
                          </Badge>
                        </div>
                        <CardDescription>{assignment.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{assignment.assignedBy}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>{assignment.assignedTo?.length || 0} student(s)</span>
                        </div>
                      </div>
                      
                      {assignment.techStack && assignment.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {assignment.techStack.map((tech, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {assignment.assignedTo && assignment.assignedTo.length > 0 && (
                        <div className="flex items-center gap-2 pt-2 border-t">
                          <span className="text-sm text-muted-foreground">Assigned to:</span>
                          <div className="flex flex-wrap gap-2">
                            {assignment.assignedTo.slice(0, 3).map((student) => (
                              <Badge key={student._id} variant="outline" className="text-xs">
                                {student.name}
                              </Badge>
                            ))}
                            {assignment.assignedTo.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{assignment.assignedTo.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
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

export default Academics;
