import React, { useEffect, useState } from "react";
import API from "../api"; // ✅ axios instance

const QuestionBank = () => {
  const [formData, setFormdata] = useState({
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
    subject: "",
  });

  const [subjects, setSubjects] = useState([]);
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [editform, setEditForm] = useState(false);

  const handleChange = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ FETCH QUESTIONS + SUBJECTS
  const handlefetch = async () => {
    try {
      const [questionRes, subjectRes] = await Promise.all([
        API.get("/api/question"),
        API.get("/api/subject"),
      ]);

      setData(questionRes.data?.data || []);
      setSubjects(subjectRes.data || []);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    handlefetch();
  }, []);

  // ✅ ADD / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editform) {
        await API.put(`/api/question/${id}`, formData);
        alert("Question updated successfully");
      } else {
        await API.post("/api/question", formData);
        alert("Question added successfully");
      }

      setFormdata({
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctAnswer: "",
        subject: "",
      });

      setEditForm(false);
      setId("");
      handlefetch();
    } catch (err) {
      console.error(err);
      alert("Sorry, try again later");
    }
  };

  // ✅ DELETE
  const handleDelete = async (deleteId) => {
    try {
      await API.delete(`/api/question/${deleteId}`);
      alert("Deleted Successfully");
      handlefetch();
    } catch (err) {
      alert("Try Again Later");
    }
  };

  // ✅ EDIT
  const handleEdit = (q) => {
    setFormdata({
      question: q.question,
      optionA: q.optionA,
      optionB: q.optionB,
      optionC: q.optionC,
      optionD: q.optionD,
      correctAnswer: q.correctAnswer,
      subject: q.subject?._id || "",
    });

    setId(q._id);
    setEditForm(true);
  };

  return (
    <div className="container-fluid p-2">
      <div className="card border border-2 border-purple">
        <form onSubmit={handleSubmit} className="p-3">
          <h5 className="fw-bold text-primary">
            {editform ? "Edit Question" : "Add Question"}
          </h5>

          <textarea
            name="question"
            value={formData.question}
            onChange={handleChange}
            required
            className="form-control mb-2"
            placeholder="Enter Question"
          />

          <div className="row">
            <div className="col-sm-6">
              <input
                type="text"
                name="optionA"
                placeholder="Option A"
                className="form-control mb-2"
                value={formData.optionA}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-sm-6">
              <input
                type="text"
                name="optionB"
                placeholder="Option B"
                className="form-control mb-2"
                value={formData.optionB}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <input
                type="text"
                name="optionC"
                placeholder="Option C"
                className="form-control mb-2"
                value={formData.optionC}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-sm-6">
              <input
                type="text"
                name="optionD"
                placeholder="Option D"
                className="form-control mb-2"
                value={formData.optionD}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <input
                name="correctAnswer"
                className="form-control mb-2"
                placeholder="Correct Answer"
                value={formData.correctAnswer}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-sm-6">
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="form-select mb-2"
                required
              >
                <option value="">Select Subject</option>
                {subjects.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            {editform ? "Update Question" : "Add Question"}
          </button>
        </form>
      </div>

      {/* QUESTION LIST */}
      <div className="card mt-3 p-3">
        <h4 className="fw-bold">Question List</h4>

        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Question</th>
              <th>Subject</th>
              <th>A</th>
              <th>B</th>
              <th>C</th>
              <th>D</th>
              <th>Correct</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="9">No questions found</td>
              </tr>
            ) : (
              data.map((q, index) => (
                <tr key={q._id}>
                  <td>{index + 1}</td>
                  <td>{q.question}</td>
                  <td>{q.subject?.name}</td>
                  <td>{q.optionA}</td>
                  <td>{q.optionB}</td>
                  <td>{q.optionC}</td>
                  <td>{q.optionD}</td>
                  <td>{q.correctAnswer}</td>
                  <td>
                    <button
                      className="btn btn-success btn-sm me-1"
                      onClick={() => handleEdit(q)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(q._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuestionBank;