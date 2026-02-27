import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";

const API = import.meta.env.VITE_API_URL;

const AdminHome = () => {
  const [data, setData] = useState({
    totalExaminees: 0,
    totalExams: 0,
    totalQuestions: 0,
    totalSubject: 0,
    passed: 0,
    failed: 0,
  });

  const [loading, setLoading] = useState(true);

  const handleFetch = async () => {
    try {
      const res = await axios.get(`${API}/api/adminDashboard`);
      setData(res.data);
    } catch (err) {
      console.error("Dashboard Fetch Error:", err);
      alert("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const moduleData = [
    { name: "Total Examinee", value: data.totalExaminees },
    { name: "Total Exams", value: data.totalExams },
    { name: "Total Question", value: data.totalQuestions },
    { name: "Total Subject", value: data.totalSubject },
  ];

  const resultData = [
    { name: "Passed", value: data.passed },
    { name: "Failed", value: data.failed },
  ];

  const trendData = data.monthlyTrends || [];

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

  if (loading) {
    return (
      <div className="text-center mt-5">
        <h5>Loading Dashboard...</h5>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="mb-4 text-center fw-bold text-light">
        Admin Dashboard
      </h2>

      {/* Top Cards */}
      <div className="row g-4 mb-4">
        {moduleData.map((item, index) => (
          <div key={index} className="col-12 col-sm-6 col-lg-3">
            <div className="card shadow-lg border-0 h-100 text-center">
              <div className="card-body">
                <h6 className="fw-bold">{item.name}</h6>
                <h3 style={{ color: COLORS[index % COLORS.length] }}>
                  {item.value}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="row g-4">
        {/* Pie Chart */}
        <div className="col-12 col-lg-4">
          <div className="card shadow-lg border-0 p-3 h-100">
            <h5 className="fw-bold mb-3">Module Distribution</h5>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={moduleData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {moduleData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pass/Fail Chart */}
        <div className="col-12 col-lg-8">
          <div className="card shadow-lg border-0 p-3 h-100">
            <h5 className="fw-bold mb-3">Pass vs Fail Exams</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={resultData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value">
                  {resultData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Trend Line */}
        {trendData.length > 0 && (
          <div className="col-12">
            <div className="card shadow-lg border-0 p-3 mt-4">
              <h5 className="fw-bold mb-3">
                Exam Trends (Monthly)
              </h5>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="exams"
                    stroke="#3b82f6"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHome;