
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import StudentAcademics from "@/components/Academics/StudentAcademics";
import MentorAcademics from "@/components/Academics/MentorAcademics";

const Academics = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user") || localStorage.getItem("student");
    if (!userData || userData === 'undefined') {
      navigate("/login");
      return;
    }
    try {
      const user = JSON.parse(userData);
      setCurrentUser(user);
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('user');
      localStorage.removeItem('student');
      navigate("/login");
      return;
    }
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const isMentor = currentUser?.role === "mentor" || currentUser?.role === "teacher" || currentUser?.role === "admin";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {isMentor ? (
        <MentorAcademics currentUser={currentUser} />
      ) : (
        <StudentAcademics currentUser={currentUser} />
      )}
      <Footer />
    </div>
  );
};

export default Academics;