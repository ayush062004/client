import React, { useState } from 'react';
import API from '../../api';   // ✅ axios replaced
import "../admin/Admin.css";

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/api/examinee/login', form);  // ✅ changed

      if (res.data.message === "login Successfully") {
        localStorage.setItem("userEmail", res.data.user.email);
        localStorage.setItem("userId", res.data.user.id);
        localStorage.setItem("userRole", res.data.user.role);
        window.location.href = '/LoginDashboard';
      } else {
        console.log(res.data);
      }
    } catch (er) {
      console.log(er);
      alert("Sorry Try Again");
    }
  };

  return (
    <div className="outer min-vh-100 d-flex align-items-center justify-content-center bg-dark">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-lg rounded-4 border-0 bg-dark text-light">
              <div className="card-body p-4 p-md-5">
                <h3 className="text-center mb-4 fw-bold">User Login</h3>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label text-light">Email address</label>
                    <input
                      type="email"
                      name='email'
                      className="form-control form-control-lg bg-secondary text-light border-0"
                      placeholder="Enter a valid email address"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-light">Password</label>
                    <input
                      type="password"
                      name='password'
                      className="form-control form-control-lg bg-secondary text-light border-0"
                      placeholder="Enter password"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-3 flex-column flex-md-row">
                    <div className="form-check mb-2 mb-md-0">
                      <input className="form-check-input me-2" type="checkbox" id="rememberMe" />
                      <label className="form-check-label text-light" htmlFor="rememberMe">
                        Remember me
                      </label>
                    </div>
                    <a href="#!" className="text-light text-decoration-none">Forgot password?</a>
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg fw-semibold">
                      Login
                    </button>
                  </div>

                  <p className="small fw-bold mt-3 text-center text-light">
                    Don't have an account?{" "}
                    <a href="/Registration" className="link-danger text-decoration-none">
                      Register
                    </a>
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
              style={{ maxHeight: '250px' }}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;