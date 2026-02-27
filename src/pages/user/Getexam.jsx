import React, { useState, useEffect } from 'react';
import API from '../../api';   // ✅ axios replaced
import { useParams, useNavigate } from 'react-router';

const GetExam = () => {
  const { id: examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [testStarted, setTestStarted] = useState(false);
  const email = localStorage.getItem('userEmail');

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const res = await API.get(`/api/exams/exam/${examId}`);  // ✅ changed
        const { exam: examData, questions: questionData } = res.data;
        setExam(examData);
        setQuestions(questionData);
        setTimeLeft(parseInt(examData.duration) * 60);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load exam');
      }
    };
    fetchExam();
  }, [examId]);

  useEffect(() => {
    if (!exam || testStarted) return;
    const startTimeout = setTimeout(() => {
      if (!testStarted) {
        setError('Test expired: You did not start the test within the allowed time.');
        setSubmitted(true);
        navigate('/userdash/profile');
      }
    }, (1000 * timeLeft));
    return () => clearTimeout(startTimeout);
  }, [exam, testStarted, navigate, timeLeft]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || submitted || !testStarted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitted, testStarted]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && testStarted && !submitted) {
        setError('Violation: Tab switching detected. Exam will be submitted.');
        handleSubmit();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [testStarted, submitted]);

  useEffect(() => {
    const preventCopyPaste = (e) => {
      if (testStarted && !submitted) {
        e.preventDefault();
        setError('Violation: Cut/Copy/Paste detected. Exam will be submitted.');
        handleSubmit();
      }
    };
    document.addEventListener('cut', preventCopyPaste);
    document.addEventListener('copy', preventCopyPaste);
    document.addEventListener('paste', preventCopyPaste);
    return () => {
      document.removeEventListener('cut', preventCopyPaste);
      document.removeEventListener('copy', preventCopyPaste);
      document.removeEventListener('paste', preventCopyPaste);
    };
  }, [testStarted, submitted]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleAnswerChange = (questionId, answer) => {
    if (!testStarted) setTestStarted(true);
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    if (submitted) return;
    try {
      const res = await API.post('/api/exams/submit-exam', {   // ✅ changed
        examId,
        answers,
        email,
      });
      setResult(res.data);
      setSubmitted(true);
      alert('Your Exam was submitted successfully. Result will be declared soon.');
      navigate('/LoginDashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit exam');
    }
  };

  if (error) {
    return <div className="alert alert-danger m-4">{error}</div>;
  }

  if (!exam || !questions.length) {
    return <div className="text-center m-4">Loading...</div>;
  }

  return (
  <div className="container mt-4">
    {/* Your full JSX content yaha hoga */}
  </div>
);

};

export default GetExam;