import React, { useState } from 'react'
import API from '../../api'   // 👈 axios replace

const Changepassword = () => {
  const id = localStorage.getItem('userId');

  const [form, setForm] = useState({
    op: '',
    np: '',
    cnp: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.put(`/api/examinee/change/${id}`, form)
      alert(res.data.message)
    } catch (er) {
      console.log(er)
      alert("Something went wrong")
    }
  }

  return (
    <div className="container-fluid d-flex justify-content-center mt-5">
      <div className="col-sm-10 col-md-6 col-lg-4">
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-body p-4">
            <h3 className="text-center mb-4 fw-bold" style={{color:"black"}}>
              Change Password
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Old Password</label>
                <input
                  type="password"
                  name="op"
                  className="form-control rounded-pill"
                  placeholder="Enter old password"
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">New Password</label>
                <input
                  type="password"
                  name="np"
                  className="form-control rounded-pill"
                  placeholder="Enter new password"
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Confirm Password</label>
                <input
                  type="password"
                  name="cnp"
                  className="form-control rounded-pill"
                  placeholder="Confirm new password"
                  required
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 rounded-pill fw-semibold">
                Update Password
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Changepassword