import React, { useState, useEffect } from 'react'
import "../admin/Admin.css";
import { Link, Outlet, useNavigate } from 'react-router';
import { 
  FileText, 
  Award, 
  KeyRound, 
  MessageSquare, 
  LogOut,
  User
} from "lucide-react";

const LoginDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const role = localStorage.getItem('userRole');

  // ✅ Proper role protection
  useEffect(() => {
    if (role !== "user") {
      navigate("/login");
    }
  }, [role, navigate]);

  // ✅ Clean logout
  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    navigate("/login");
  };

  return (
    <div className="outer1">
      {/* Header */}
      <div className="container-fluid p-2 headc">
        <div className="row align-items-center">
          <div className="col-6 col-md-2">
            <h4 className="text-center mt-2">Exam Prep</h4>
          </div>

          <div className="col-6 col-md-1 text-center">
            <button
              className="btn btn-outline-secondary mt-1 w-100"
              style={{ backgroundColor: "brown", color: 'white' }}
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? "Expand" : "Collapse"}
            </button>
          </div>

          <div className="d-none d-md-block col-md-6"></div>

          <div className="col-12 col-md-3 text-md-end text-center mt-2 mt-md-0 d-flex justify-content-md-end justify-content-center align-items-center gap-2">
            <User size={26} />
            <h2 className="fw-bold m-0">User Dashboard</h2>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="container-fluid">
        <div className="row">

          {/* Sidebar */}
          <div className={`${collapsed ? "d-none" : "col-12 col-md-3 col-lg-2"} mb-3 p-2`}>
            <div className="d-grid gap-2">

              <Link className="btn btn-outline-secondary text-light btn-lg w-100 d-flex align-items-center" to="Myexams">
                <FileText size={18} className="me-2"/> My Exams
              </Link>

              <Link className="btn btn-outline-secondary text-light btn-lg w-100 d-flex align-items-center" to="Myresult">
                <Award size={18} className="me-2"/> My Results
              </Link>

              <Link className="btn btn-outline-secondary text-light btn-lg w-100 d-flex align-items-center" to="changepassword">
                <KeyRound size={18} className="me-2"/> Change Password
              </Link>

              <Link className="btn btn-outline-secondary text-light btn-lg w-100 d-flex align-items-center" to="message">
                <MessageSquare size={18} className="me-2"/> Message
              </Link>

              <button
                className="btn btn-outline-secondary text-light btn-lg w-100 d-flex align-items-center"
                onClick={handleLogout}
              >
                <LogOut size={18} className="me-2"/> Log Out
              </button>

            </div>
          </div>

          {/* Content */}
          <div className={`contentc text-light ${collapsed ? "col-12" : "col-12 col-md-9 col-lg-10"}`}>
            <Outlet />
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginDashboard;