import React, { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const AdminChangepassword = () => {
  const id = localStorage.getItem("userId");

  const [form, setForm] = useState({
    op: "",
    np: "",
    cnp: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      alert("User not logged in");
      return;
    }

    if (form.np !== form.cnp) {
      alert("New Password and Confirm Password must match");
      return;
    }

    try {
      const res = await axios.put(
        `${API}/api/admin/change/${id}`,
        form
      );

      alert(res.data.message || "Password Updated Successfully");

      setForm({
        op: "",
        np: "",
        cnp: "",
      });

    } catch (err) {
      console.log(err);
      alert(
        err.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center mt-5 min-vh-100">
      <div className="col-sm-10 col-md-6 col-lg-4">
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-body p-4">
            <h3 className="text-center mb-4 text-danger fw-bold">
              Admin Change Password
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Old Password
                </label>
                <input
                  type="password"
                  name="op"
                  value={form.op}
                  className="form-control rounded-pill"
                  placeholder="Enter old password"
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  New Password
                </label>
                <input
                  type="password"
                  name="np"
                  value={form.np}
                  className="form-control rounded-pill"
                  placeholder="Enter new password"
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="cnp"
                  value={form.cnp}
                  className="form-control rounded-pill"
                  placeholder="Confirm new password"
                  required
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="btn btn-danger w-100 rounded-pill fw-semibold"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminChangepassword;