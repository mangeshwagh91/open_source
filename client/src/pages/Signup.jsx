import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { GraduationCap, Eye, EyeOff, Award, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showMentorPassword, setShowMentorPassword] = useState(false);
  const [showMentorConfirmPassword, setShowMentorConfirmPassword] = useState(false);
  
  // Student form data
  const [studentFormData, setStudentFormData] = useState({
    studentId: "",
    name: "",
    email: "",
    department: "",
    passingYear: "",
    github: "",
    linkedin: "",
    password: "",
    confirmPassword: ""
  });

  // User (Mentor/Contributor) form data
  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "contributor",
    mentorCode: ""
  });

  const departments = [
    "Computer Science",
    "Information Technology",
    "Electronics and Telecommunication",
    "Electrical",
    "Mechanical",
    "Civil"
  ];

  const handleStudentChange = (name, value) => {
    setStudentFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUserChange = (name, value) => {
    setUserFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    
    if (studentFormData.password !== studentFormData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    if (studentFormData.password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: studentFormData.studentId,
          name: studentFormData.name,
          email: studentFormData.email,
          department: studentFormData.department,
          passingYear: parseInt(studentFormData.passingYear),
          github: studentFormData.github,
          linkedin: studentFormData.linkedin,
          password: studentFormData.password
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Signup failed');

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.student));

      toast({
        title: "Success!",
        description: "Student account created successfully",
      });

      navigate('/');
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    
    if (userFormData.password !== userFormData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    if (userFormData.password.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters",
        variant: "destructive"
      });
      return;
    }

    if (userFormData.role === 'mentor' && !userFormData.mentorCode) {
      toast({
        title: "Error",
        description: "Mentor code is required for mentor registration",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/auth/signup-user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: userFormData.name,
          email: userFormData.email,
          password: userFormData.password,
          role: userFormData.role,
          ...(userFormData.role === 'mentor' && { mentorCode: userFormData.mentorCode })
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Signup failed');

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      toast({
        title: "Success!",
        description: `${userFormData.role === 'mentor' ? 'Mentor' : 'Contributor'} account created successfully`,
      });

      navigate('/');
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4 py-12">
      <Card className="w-full max-w-3xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Create your account</CardTitle>
          <CardDescription>
            Join our community - choose your role below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="student" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="student">
                <GraduationCap className="w-4 h-4 mr-2" />
                Student / Contributor
              </TabsTrigger>
              <TabsTrigger value="mentor">
                <Award className="w-4 h-4 mr-2" />
                Mentor
              </TabsTrigger>
            </TabsList>

            {/* Student Registration */}
            <TabsContent value="student">
              <form onSubmit={handleStudentSubmit} className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="studentId">College ID *</Label>
                    <Input
                      id="studentId"
                      placeholder="BT23F01F001"
                      required
                      value={studentFormData.studentId}
                      onChange={(e) => handleStudentChange("studentId", e.target.value.toUpperCase())}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      required
                      value={studentFormData.name}
                      onChange={(e) => handleStudentChange("name", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    value={studentFormData.email}
                    onChange={(e) => handleStudentChange("email", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department *</Label>
                    <Select
                      value={studentFormData.department}
                      onValueChange={(value) => handleStudentChange("department", value)}
                      required
                    >
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passingYear">Passing Year *</Label>
                    <Input
                      id="passingYear"
                      type="number"
                      placeholder="2026"
                      required
                      min="2020"
                      max="2035"
                      value={studentFormData.passingYear}
                      onChange={(e) => handleStudentChange("passingYear", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub Profile *</Label>
                    <Input
                      id="github"
                      placeholder="https://github.com/username"
                      required
                      value={studentFormData.github}
                      onChange={(e) => handleStudentChange("github", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn Profile</Label>
                    <Input
                      id="linkedin"
                      placeholder="https://linkedin.com/in/username"
                      value={studentFormData.linkedin}
                      onChange={(e) => handleStudentChange("linkedin", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="studentPassword">Password *</Label>
                    <div className="relative">
                      <Input
                        id="studentPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        minLength={6}
                        value={studentFormData.password}
                        onChange={(e) => handleStudentChange("password", e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="studentConfirmPassword">Confirm Password *</Label>
                    <div className="relative">
                      <Input
                        id="studentConfirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        minLength={6}
                        value={studentFormData.confirmPassword}
                        onChange={(e) => handleStudentChange("confirmPassword", e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>

            {/* Mentor Registration */}
            <TabsContent value="mentor">
              <form onSubmit={handleUserSubmit} className="space-y-4 mt-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    Mentors can assign academic projects, review student proposals, and manage student progress. <strong>Requires a mentor code from administration.</strong>
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <Label htmlFor="mentorName">Full Name *</Label>
                  <Input
                    id="mentorName"
                    placeholder="Dr. John Doe"
                    required
                    value={userFormData.name}
                    onChange={(e) => handleUserChange("name", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mentorEmail">Email *</Label>
                  <Input
                    id="mentorEmail"
                    type="email"
                    placeholder="john.doe@college.edu"
                    required
                    value={userFormData.email}
                    onChange={(e) => handleUserChange("email", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mentorCode">Mentor Code *</Label>
                  <Input
                    id="mentorCode"
                    placeholder="Enter your mentor access code"
                    required
                    value={userFormData.mentorCode}
                    onChange={(e) => handleUserChange("mentorCode", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Contact administration to get your mentor code
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mentorPassword">Password *</Label>
                    <div className="relative">
                      <Input
                        id="mentorPassword"
                        type={showMentorPassword ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        minLength={8}
                        value={userFormData.password}
                        onChange={(e) => handleUserChange("password", e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowMentorPassword(!showMentorPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showMentorPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mentorConfirmPassword">Confirm Password *</Label>
                    <div className="relative">
                      <Input
                        id="mentorConfirmPassword"
                        type={showMentorConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        minLength={8}
                        value={userFormData.confirmPassword}
                        onChange={(e) => handleUserChange("confirmPassword", e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowMentorConfirmPassword(!showMentorConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showMentorConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading}
                  onClick={() => handleUserChange("role", "mentor")}
                >
                  {loading ? "Creating account..." : "Create Mentor Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
