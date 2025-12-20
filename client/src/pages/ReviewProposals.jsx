import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useToast } from '../hooks/use-toast';
import { proposalsAPI } from '../lib/api';
import { Clock, CheckCircle, XCircle, ExternalLink, GitBranch, Users, Calendar } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

export default function ReviewProposals() {
  const [proposals, setProposals] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAcceptOpen, setIsAcceptOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [facultyFeedback, setFacultyFeedback] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    fetchProposals();
    fetchStats();
  }, [filter, categoryFilter]);

  const fetchProposals = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filter !== 'all') params.status = filter;
      if (categoryFilter !== 'all') params.category = categoryFilter;
      
      const data = await proposalsAPI.getAll(params);
      setProposals(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load proposals',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await proposalsAPI.getStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const handleAccept = async () => {
    if (!facultyFeedback.trim()) {
      toast({
        title: 'Feedback Required',
        description: 'Please provide feedback for the proposal',
        variant: 'destructive',
      });
      return;
    }

    try {
      await proposalsAPI.accept(selectedProposal._id, facultyFeedback);
      toast({
        title: 'Proposal Accepted',
        description: 'The proposal has been accepted and published to projects',
      });
      setIsAcceptOpen(false);
      setFacultyFeedback('');
      setSelectedProposal(null);
      fetchProposals();
      fetchStats();
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to accept proposal',
        variant: 'destructive',
      });
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      toast({
        title: 'Reason Required',
        description: 'Please provide a reason for rejection',
        variant: 'destructive',
      });
      return;
    }

    try {
      await proposalsAPI.reject(selectedProposal._id, rejectionReason);
      toast({
        title: 'Proposal Rejected',
        description: 'The proposal has been rejected with feedback',
      });
      setIsRejectOpen(false);
      setRejectionReason('');
      setSelectedProposal(null);
      fetchProposals();
      fetchStats();
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to reject proposal',
        variant: 'destructive',
      });
    }
  };

  const openAcceptDialog = (proposal) => {
    setSelectedProposal(proposal);
    setIsAcceptOpen(true);
  };

  const openRejectDialog = (proposal) => {
    setSelectedProposal(proposal);
    setIsRejectOpen(true);
  };

  const openDetailsDialog = (proposal) => {
    setSelectedProposal(proposal);
    setIsDetailsOpen(true);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'accepted':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'accepted':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'advanced':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const categories = [
    'Web Development',
    'Mobile Development',
    'Machine Learning',
    'Data Science',
    'DevOps',
    'Blockchain',
    'Game Development',
    'IoT',
    'Cloud Computing',
    'Cybersecurity',
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Review Student Proposals</h1>
          <p className="text-gray-600">Review and approve project proposals from GECA students. Accepted projects go live on the platform.</p>
        </div>

        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Total Proposals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.total}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-yellow-600">Pending Review</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-green-600">Accepted</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{stats.accepted}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-red-600">Rejected</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-600">{stats.rejected}</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="status-filter" className="text-sm font-medium mb-2 block">
                  Status
                </Label>
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger id="status-filter">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Label htmlFor="category-filter" className="text-sm font-medium mb-2 block">
                  Category
                </Label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger id="category-filter">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Proposals List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading proposals...</p>
          </div>
        ) : proposals.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Clock className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Proposals Found</h3>
              <p className="text-gray-600">There are no proposals matching your filters.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {proposals.map((proposal) => (
              <Card key={proposal._id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Main Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{proposal.title}</h3>
                          <p className="text-sm text-gray-600">
                            by {proposal.proposedBy?.name || 'Unknown'} •{' '}
                            {new Date(proposal.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge className={`${getStatusColor(proposal.status)} border`}>
                          {getStatusIcon(proposal.status)}
                          <span className="ml-1 capitalize">{proposal.status}</span>
                        </Badge>
                      </div>
                      
                      <p className="text-gray-700 mb-4 line-clamp-2">{proposal.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline" className="text-xs">
                          {proposal.category}
                        </Badge>
                        <Badge className={getDifficultyColor(proposal.difficulty)}>
                          {proposal.difficulty}
                        </Badge>
                        {proposal.techStack.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {proposal.techStack.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{proposal.techStack.length - 3} more
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {proposal.expectedDuration} weeks
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          Max {proposal.maxTeamSize} members
                        </div>
                        <a
                          href={proposal.githubRepo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-blue-600 hover:underline"
                        >
                          <GitBranch className="w-4 h-4" />
                          View Repo
                        </a>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex flex-col gap-2 md:w-48">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openDetailsDialog(proposal)}
                      >
                        View Details
                      </Button>
                      {proposal.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => openAcceptDialog(proposal)}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => openRejectDialog(proposal)}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                      {proposal.status === 'accepted' && proposal.facultyFeedback && (
                        <div className="bg-green-50 border border-green-200 rounded-md p-2 text-xs">
                          <p className="font-medium text-green-800 mb-1">Feedback:</p>
                          <p className="text-green-700 line-clamp-2">{proposal.facultyFeedback}</p>
                        </div>
                      )}
                      {proposal.status === 'rejected' && proposal.rejectionReason && (
                        <div className="bg-red-50 border border-red-200 rounded-md p-2 text-xs">
                          <p className="font-medium text-red-800 mb-1">Reason:</p>
                          <p className="text-red-700 line-clamp-2">{proposal.rejectionReason}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Details Dialog */}
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            {selectedProposal && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">{selectedProposal.title}</DialogTitle>
                  <DialogDescription>
                    Proposed by {selectedProposal.proposedBy?.name || 'Unknown'} on{' '}
                    {new Date(selectedProposal.createdAt).toLocaleDateString()}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-gray-700">{selectedProposal.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Category</h4>
                      <Badge variant="outline">{selectedProposal.category}</Badge>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Difficulty</h4>
                      <Badge className={getDifficultyColor(selectedProposal.difficulty)}>
                        {selectedProposal.difficulty}
                      </Badge>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Duration</h4>
                      <p className="text-gray-700">{selectedProposal.expectedDuration} weeks</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Max Team Size</h4>
                      <p className="text-gray-700">{selectedProposal.maxTeamSize} members</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProposal.techStack.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Learning Objectives</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedProposal.learningObjectives.map((obj, index) => (
                        <li key={index} className="text-gray-700">
                          {obj}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Prerequisites</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedProposal.prerequisites.map((prereq, index) => (
                        <li key={index} className="text-gray-700">
                          {prereq}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">GitHub Repository</h4>
                    <a
                      href={selectedProposal.githubRepo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {selectedProposal.githubRepo}
                    </a>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Accept Dialog */}
        <Dialog open={isAcceptOpen} onOpenChange={setIsAcceptOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Accept Proposal</DialogTitle>
              <DialogDescription>
                Provide feedback for the contributor. This will be sent via email.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="feedback">Faculty Feedback *</Label>
                <Textarea
                  id="feedback"
                  placeholder="Great proposal! The technical approach is sound and the learning objectives are well-defined..."
                  value={facultyFeedback}
                  onChange={(e) => setFacultyFeedback(e.target.value)}
                  rows={5}
                  className="mt-1"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAcceptOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAccept} className="bg-green-600 hover:bg-green-700">
                Accept Proposal
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Reject Dialog */}
        <Dialog open={isRejectOpen} onOpenChange={setIsRejectOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Proposal</DialogTitle>
              <DialogDescription>
                Provide a clear reason for rejection. This will help the contributor improve.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="reason">Rejection Reason *</Label>
                <Textarea
                  id="reason"
                  placeholder="The scope is too broad for the intended duration. Consider breaking it into smaller milestones..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows={5}
                  className="mt-1"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRejectOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleReject} variant="destructive">
                Reject Proposal
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  );
}
