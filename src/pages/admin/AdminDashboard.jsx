import React, { useState, useEffect } from "react";
import "../admin/Admin.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import {
  Calendar,
  BookOpen,
  Users,
  FileText,
  Database,
  BarChart3,
  MessageSquare,
  KeyRound,
  LogOut,
} from "lucide-react";

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const email = localStorage.getItem("adminEmail");

  // ✅ Auth Check (Proper Way)
  useEffect(() => {
    if (role !== "admin" || !email) {
      navigate("/adminlogin");
    }
  }, [role, email, navigate]);

  // ✅ Logout Function
  const handleLogout = () => {
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/adminlogin");
  };

  // Sidebar items
  const sidebarItems = [
    { to: "/AdminDashboard/session", icon: <Calendar size={18} />, label: "Session" },
    { to: "/AdminDashboard/Subject", icon: <BookOpen size={18} />, label: "Subject" },
    { to: "/AdminDashboard/examinee", icon: <Users size={18} />, label: "Examinee" },
    { to: "/AdminDashboard/Examination", icon: <FileText size={18} />, label: "Examination" },
    { to: "/AdminDashboard/Question", icon: <Database size={18} />, label: "Question Bank" },
    { to: "/AdminDashboard/reportgeneration", icon: <BarChart3 size={18} />, label: "Report Generation" },
    { to: "/AdminDashboard/MessageReply", icon: <MessageSquare size={18} />, label: "Message" },
    { to: "/AdminDashboard/adminchangepassword", icon: <KeyRound size={18} />, label: "Change Password" },
  ];

  return (
    <div>
      {/* Header */}
      <div className="container-fluid p-2 headc">
        <div className="row align-items-center">
          <div className="col-6 col-md-2">
            <h3 className="text-center mt-2 fw-bold">Exam Prep</h3>
          </div>

          <div className="col-6 col-md-1 text-center">
            <button
              className="btn btn-outline-secondary mt-1 w-100"
              style={{ backgroundColor: "brown", color: "white" }}
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? "Expand" : "Collapse"}
            </button>
          </div>

          <div className="d-none d-md-block col-md-6"></div>

          <div className="col-12 col-md-3 text-md-end text-center mt-2 mt-md-0">
            <h4 className="fw-bold mb-0">Admin Dashboard</h4>
          </div>
        </div>
      </div>

      {/* Layout */}
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div className={`sidebar-wrapper ${collapsed ? "collapsed" : ""}`}>
            <div className="d-grid gap-2 mt-1">
              {sidebarItems.map((item, index) => (
                <Link
                  key={index}
                  className="btn btn-outline-secondary text-light btn-lg w-100 d-flex align-items-center"
                  to={item.to}
                >
                  {item.icon}
                  {!collapsed && <span className="ms-2">{item.label}</span>}
                </Link>
              ))}

              <button
                className="btn btn-outline-secondary text-light btn-lg w-100 d-flex align-items-center"
                onClick={handleLogout}
              >
                <LogOut size={18} />
                {!collapsed && <span className="ms-2">Logout</span>}
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className={`contentc ${collapsed ? "expanded" : ""}`}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;