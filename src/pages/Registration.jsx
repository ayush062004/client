import React, { useState } from "react";
import API from "../api"; // ✅ axios instance

const Registration = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    college: "",
    course: "",
    status: "",
    phoneno: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/api/examinee", form);

      alert("Registered successfully");
      window.location.href = "/Login";
    } catch (error) {
      console.error("Registration error:", error);
      alert("Sorry, try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="outer2 bg-dark min-vh-100 d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-5">
            <div className="card bg-dark text-light shadow-lg rounded-4 border border-secondary">
              <div className="card-body p-4">
                <h2 className="text-center mb-4 fw-bold">Registration</h2>

                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col">
                      <input
                        type="text"
                        className="form-control bg-dark text-light border-secondary rounded-3"
                        name="firstname"
                        value={form.firstname}
                        onChange={handleChange}
                        placeholder="First name"
                        required
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control bg-dark text-light border-secondary rounded-3"
                        name="lastname"
                        value={form.lastname}
                        onChange={handleChange}
                        placeholder="Last name"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control bg-dark text-light border-secondary rounded-3"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Email address"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control bg-dark text-light border-secondary rounded-3"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Password"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control bg-dark text-light border-secondary rounded-3"
                      name="college"
                      value={form.college}
                      onChange={handleChange}
                      placeholder="College"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control bg-dark text-light border-secondary rounded-3"
                      name="course"
                      value={form.course}
                      onChange={handleChange}
                      placeholder="Course"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <select
                      className="form-control bg-dark text-light border-secondary rounded-3"
                      name="status"
                      value={form.status}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control bg-dark text-light border-secondary rounded-3"
                      name="phoneno"
                      value={form.phoneno}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-light w-100 rounded-3 fw-semibold shadow-sm"
                  >
                    {loading ? "Registering..." : "Sign Up"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;