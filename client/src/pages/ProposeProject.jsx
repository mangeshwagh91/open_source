import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { proposalsAPI } from "@/lib/api";
import {
  Lightbulb,
  Github,
  Code2,
  Users,
  Clock,
  Target,
  BookOpen,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const categories = [
  'Web Development',
  'Mobile Development',
  'AI/ML',
  'DevOps',
  'Blockchain',
  'IoT',
  'Data Science',
  'Cybersecurity',
  'Game Development',
  'Other'
];

const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

const ProposeProject = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [techStackInput, setTechStackInput] = useState('');
  const [objectiveInput, setObjectiveInput] = useState('');
  const [prerequisiteInput, setPrerequisiteInput] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    techStack: [],
    difficulty: 'Intermediate',
    githubRepo: '',
    expectedDuration: 4,
    learningObjectives: [],
    prerequisites: [],
    maxTeamSize: 4
  });

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addTechStack = () => {
    if (techStackInput.trim() && !formData.techStack.includes(techStackInput.trim())) {
      setFormData(prev => ({
        ...prev,
        techStack: [...prev.techStack, techStackInput.trim()]
      }));
      setTechStackInput('');
    }
  };

  const removeTechStack = (tech) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.filter(t => t !== tech)
    }));
  };

  const addObjective = () => {
    if (objectiveInput.trim() && !formData.learningObjectives.includes(objectiveInput.trim())) {
      setFormData(prev => ({
        ...prev,
        learningObjectives: [...prev.learningObjectives, objectiveInput.trim()]
      }));
      setObjectiveInput('');
    }
  };

  const removeObjective = (obj) => {
    setFormData(prev => ({
      ...prev,
      learningObjectives: prev.learningObjectives.filter(o => o !== obj)
    }));
  };

  const addPrerequisite = () => {
    if (prerequisiteInput.trim() && !formData.prerequisites.includes(prerequisiteInput.trim())) {
      setFormData(prev => ({
        ...prev,
        prerequisites: [...prev.prerequisites, prerequisiteInput.trim()]
      }));
      setPrerequisiteInput('');
    }
  };

  const removePrerequisite = (pre) => {
    setFormData(prev => ({
      ...prev,
      prerequisites: prev.prerequisites.filter(p => p !== pre)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (formData.techStack.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please add at least one technology to the tech stack",
        variant: "destructive"
      });
      return;
    }

    if (formData.learningObjectives.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please add at least one learning objective",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      await proposalsAPI.create(formData);
      
      toast({
        title: "Proposal Submitted! 🎉",
        description: "Your project proposal has been submitted for review. You'll receive an email once it's reviewed."
      });

      navigate('/my-proposals');
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to submit proposal. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background main-bg-pattern">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
              <Lightbulb className="w-5 h-5 text-primary" />
              <span className="text-primary text-sm font-semibold">Share Your Idea</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Propose a Project
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have an innovative project idea? Share it with the community and become a project admin!
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="border-primary/20">
              <CardContent className="pt-6">
                <CheckCircle className="w-8 h-8 text-green-500 mb-2" />
                <h3 className="font-semibold mb-1">Get Reviewed</h3>
                <p className="text-sm text-muted-foreground">Faculty will review your proposal</p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="pt-6">
                <Users className="w-8 h-8 text-blue-500 mb-2" />
                <h3 className="font-semibold mb-1">Lead & Mentor</h3>
                <p className="text-sm text-muted-foreground">Guide students working on your project</p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="pt-6">
                <Target className="w-8 h-8 text-purple-500 mb-2" />
                <h3 className="font-semibold mb-1">Get Published</h3>
                <p className="text-sm text-muted-foreground">Accepted projects go live on platform</p>
              </CardContent>
            </Card>
          </div>

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>
                Fill in the information about your project. Be as detailed as possible to increase approval chances.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <Label htmlFor="title">Project Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Real-time Chat Application with WebSocket"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    required
                    maxLength={100}
                  />
                  <p className="text-xs text-muted-foreground mt-1">{formData.title.length}/100 characters</p>
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description">Project Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your project in detail. What problem does it solve? What will students learn?"
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    required
                    rows={6}
                    minLength={50}
                    maxLength={2000}
                  />
                  <p className="text-xs text-muted-foreground mt-1">{formData.description.length}/2000 characters (min: 50)</p>
                </div>

                {/* Category and Difficulty */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleChange('category', value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="difficulty">Difficulty Level *</Label>
                    <Select value={formData.difficulty} onValueChange={(value) => handleChange('difficulty', value)} required>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {difficulties.map((diff) => (
                          <SelectItem key={diff} value={diff}>{diff}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <Label>Tech Stack *</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="e.g., React, Node.js, MongoDB"
                      value={techStackInput}
                      onChange={(e) => setTechStackInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechStack())}
                    />
                    <Button type="button" onClick={addTechStack} variant="outline">
                      <Code2 className="w-4 h-4 mr-2" />
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.techStack.map((tech, idx) => (
                      <Badge key={idx} variant="secondary" className="cursor-pointer" onClick={() => removeTechStack(tech)}>
                        {tech} ×
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* GitHub Repo */}
                <div>
                  <Label htmlFor="githubRepo">GitHub Repository URL *</Label>
                  <div className="relative">
                    <Github className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="githubRepo"
                      type="url"
                      placeholder="https://github.com/username/repository"
                      value={formData.githubRepo}
                      onChange={(e) => handleChange('githubRepo', e.target.value)}
                      required
                      className="pl-10"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Ensure your repo is public with a clear README</p>
                </div>

                {/* Duration and Team Size */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expectedDuration">Expected Duration (weeks) *</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="expectedDuration"
                        type="number"
                        min="1"
                        max="24"
                        value={formData.expectedDuration}
                        onChange={(e) => handleChange('expectedDuration', parseInt(e.target.value))}
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="maxTeamSize">Maximum Team Size *</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="maxTeamSize"
                        type="number"
                        min="1"
                        max="10"
                        value={formData.maxTeamSize}
                        onChange={(e) => handleChange('maxTeamSize', parseInt(e.target.value))}
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                {/* Learning Objectives */}
                <div>
                  <Label>Learning Objectives *</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="What will students learn from this project?"
                      value={objectiveInput}
                      onChange={(e) => setObjectiveInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addObjective())}
                    />
                    <Button type="button" onClick={addObjective} variant="outline">
                      <Target className="w-4 h-4 mr-2" />
                      Add
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {formData.learningObjectives.map((obj, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-2 bg-muted/50 rounded">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="flex-1 text-sm">{obj}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeObjective(obj)}
                          className="h-auto p-1"
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prerequisites */}
                <div>
                  <Label>Prerequisites (Optional)</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="Required skills or knowledge"
                      value={prerequisiteInput}
                      onChange={(e) => setPrerequisiteInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPrerequisite())}
                    />
                    <Button type="button" onClick={addPrerequisite} variant="outline">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Add
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {formData.prerequisites.map((pre, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-2 bg-muted/50 rounded">
                        <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span className="flex-1 text-sm">{pre}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removePrerequisite(pre)}
                          className="h-auto p-1"
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1"
                  >
                    {loading ? 'Submitting...' : 'Submit Proposal'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/projects')}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Info Box */}
          <Card className="mt-8 border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm space-y-2">
                  <p className="font-semibold">Review Process</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Faculty will review your proposal within 2-3 business days</li>
                    <li>• You'll receive an email notification once reviewed</li>
                    <li>• You can submit up to 3 proposals per week</li>
                    <li>• Accepted projects will be published on the Projects page</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProposeProject;
