import React, { useState } from "react";
import "../admin/Admin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

const AdminLogin = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${API}/api/admin/login`,
        form
      );

      if (res.data.message === "Login Successfully") {
        alert("Login Successfully");

        // ✅ Store Proper Keys
        localStorage.setItem("adminEmail", res.data.admin.email);
        localStorage.setItem("userId", res.data.admin.id);
        localStorage.setItem("role", res.data.admin.role);

        // Optional (if backend sends token)
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }

        navigate("/AdminDashboard");
      } else {
        alert(res.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert(
        error.response?.data?.message ||
          "Invalid credentials or server error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="outer min-vh-100 d-flex align-items-center justify-content-center bg-dark">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-lg rounded-4 border-0 bg-dark text-light">
              <div className="card-body p-4 p-md-5">
                <h3 className="text-center mb-4 fw-bold">
                  Admin Login
                </h3>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control form-control-lg bg-secondary text-light border-0"
                      placeholder="Enter a valid email address"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="form-control form-control-lg bg-secondary text-light border-0"
                      placeholder="Enter password"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="d-grid mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg fw-semibold"
                      disabled={loading}
                    >
                      {loading ? "Logging in..." : "Login"}
                    </button>
                  </div>

                  <p className="small fw-bold mt-3 text-center">
                    Don't have an account?{" "}
                    <span className="text-danger">
                      Contact Admin
                    </span>
                  </p>
                </form>
              </div>
            </div>
          </div>

          <div className="col-12 d-none d-lg-flex justify-content-center mt-4">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid rounded"
              alt="Sample"
              style={{ maxHeight: "250px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;