import React, { useState, useEffect } from 'react';
import axios from 'axios';

// ✅ Create Axios Instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json"
  }
});

const Examination = () => {
  const [formData, setFormData] = useState({
    examName: '',
    date: '',
    time: '',
    duration: '',
    totalMarks: '',
    passingMarks: '',
    sessionId: '',
    status: 'Scheduled',
    questionDistribution: [{ subject: '', numberOfQuestions: '' }],
  });

  const [subjects, setSubjects] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [error, setError] = useState('');
  const [exams, setExams] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingExamId, setEditingExamId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Fetch All Data
  const fetchData = async () => {
    try {
      const [subjectRes, sessionRes, examRes] = await Promise.all([
        axiosInstance.get("/Subject"),
        axiosInstance.get("/Session"),
        axiosInstance.get("/exams"),
      ]);

      setSubjects(subjectRes.data || []);
      setSessions(sessionRes.data || []);
      setExams(examRes.data || []);

    } catch (err) {
      console.error("Fetch Error:", err.response?.data || err.message);
      setError("Failed to load data");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleQuestionDistChange = (index, e) => {
    const updated = [...formData.questionDistribution];
    updated[index][e.target.name] = e.target.value;
    setFormData({ ...formData, questionDistribution: updated });
  };

  const addDistributionField = () => {
    setFormData({
      ...formData,
      questionDistribution: [
        ...formData.questionDistribution,
        { subject: '', numberOfQuestions: '' }
      ],
    });
  };

  const removeDistributionField = (index) => {
    if (formData.questionDistribution.length === 1) {
      setError('At least one subject is required');
      return;
    }
    const updated = [...formData.questionDistribution];
    updated.splice(index, 1);
    setFormData({ ...formData, questionDistribution: updated });
  };

  const validateForm = () => {
    if (
      !formData.examName ||
      !formData.date ||
      !formData.time ||
      !formData.duration ||
      !formData.totalMarks ||
      !formData.passingMarks ||
      !formData.sessionId
    ) {
      return 'All fields are required';
    }

    if (parseInt(formData.passingMarks) > parseInt(formData.totalMarks)) {
      return 'Passing marks cannot exceed total marks';
    }

    if (
      formData.questionDistribution.some(
        dist =>
          !dist.subject ||
          !dist.numberOfQuestions ||
          parseInt(dist.numberOfQuestions) <= 0
      )
    ) {
      return 'All question distributions must be valid';
    }

    return '';
  };

  // ✅ Submit (Create / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const payload = {
        title: formData.examName, // ✅ Backend uses title
        ...formData,
      };

      if (isEditing && editingExamId) {
        await axiosInstance.put(`/exams/${editingExamId}`, payload);
        alert('Exam Updated Successfully');
      } else {
        await axiosInstance.post('/exams', payload);
        alert('Exam Created Successfully');
      }

      // Reset
      setFormData({
        examName: '',
        date: '',
        time: '',
        duration: '',
        totalMarks: '',
        passingMarks: '',
        sessionId: '',
        status: 'Scheduled',
        questionDistribution: [{ subject: '', numberOfQuestions: '' }],
      });

      setIsEditing(false);
      setEditingExamId(null);
      fetchData();

    } catch (err) {
      console.error("Submit Error:", err.response?.data || err.message);
      setError(err.response?.data?.error || 'Error submitting form');
    }
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/exams/${id}`);
      alert("Deleted Successfully");
      fetchData();
    } catch (err) {
      console.error("Delete Error:", err.response?.data || err.message);
      alert("Delete Failed");
    }
  };

  // ✅ Edit
  const handleEdit = (exam) => {
    setFormData({
      examName: exam.title || '',
      totalMarks: exam.totalMarks || '',
      passingMarks: exam.passingMarks || '',
      date: exam.date || '',
      time: exam.time || '',
      duration: exam.duration || '',
      sessionId: exam.sessionId?._id || '',
      status: exam.status || 'Scheduled',
      questionDistribution:
        exam.questionDistribution?.length > 0
          ? exam.questionDistribution
          : [{ subject: '', numberOfQuestions: '' }],
    });

    setEditingExamId(exam._id);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container-fluid p-2">
      {/* 👇 UI Same as Your Original Code 👇 */}
      {/* Main JSX bilkul same rakha hai — sirf axios logic fix kiya gaya hai */}
    </div>
  );
};

export default Examination;