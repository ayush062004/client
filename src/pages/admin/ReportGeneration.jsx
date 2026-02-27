import React, { useState, useEffect } from 'react';
import axios from 'axios';

// ✅ Axios Instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json"
  }
});

const ReportGeneration = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ✅ Fetch Reports
  const handleFetch = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/exams/report');
      setData(Array.isArray(res.data) ? res.data : [res.data]);
      setError('');
    } catch (err) {
      console.error("Fetch Error:", err.response?.data || err.message);
      setError("Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  // ✅ Print Report
  const handlePrint = (item) => {
    const printWindow = window.open('', '', 'width=900,height=650');

    printWindow.document.write(`
      <html>
        <head>
          <title>Exam Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { color: #6f42c1; }
            table { border-collapse: collapse; width: 100%; margin-top: 20px; }
            td, th { border: 1px solid #6f42c1; padding: 8px; text-align: left; }
            th { background-color: #f3e8ff; }
          </style>
        </head>
        <body>
          <h2>Exam Report - ${item.examTitle}</h2>
          <table>
            <tr><th>Examinee Name</th><td>${item.examineeName}</td></tr>
            <tr><th>Email</th><td>${item.examineeEmail || ''}</td></tr>
            <tr><th>Total Marks</th><td>${item.totalMarks}</td></tr>
            <tr><th>Passing Marks</th><td>${item.passingMarks}</td></tr>
            <tr><th>Score</th><td>${item.score}</td></tr>
            <tr><th>Status</th><td>${item.status}</td></tr>
            <tr><th>Date of Exam</th><td>${new Date(item.attemptedAt).toLocaleString()}</td></tr>
          </table>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.onafterprint = () => printWindow.close();
  };

  return (
    <div className="container-fluid">
      <div className="row py-3 px-3 mt-3">
        <div className="col-sm-12 mx-auto">
          <div className="card">
            <div className="card-body">

              <h3 className="fw-bold" style={{ color: "#6f42c1" }}>
                Report Generation
              </h3>

              {error && <div className="alert alert-danger">{error}</div>}
              {loading && <div className="alert alert-info">Loading reports...</div>}

              <table className="table table-hover table-bordered">
                <thead>
                  <tr>
                    <th>S.N</th>
                    <th>Exam Name</th>
                    <th>Examinee Name</th>
                    <th>Total Marks</th>
                    <th>Score</th>
                    <th>Passing Marks</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {!loading && data.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="text-center">
                        No reports found
                      </td>
                    </tr>
                  ) : (
                    data.map((item, i) => (
                      <tr key={item._id}>
                        <td>{i + 1}</td>
                        <td>{item.examTitle}</td>
                        <td>{item.examineeName}</td>
                        <td>{item.totalMarks}</td>
                        <td>{item.score}</td>
                        <td>{item.passingMarks}</td>
                        <td>{item.status}</td>
                        <td>
                          {item.attemptedAt
                            ? new Date(item.attemptedAt).toLocaleString()
                            : 'N/A'}
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-success"
                            onClick={() => handlePrint(item)}
                          >
                            Generate Report
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>

              </table>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportGeneration;