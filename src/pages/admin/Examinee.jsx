import axios from 'axios';
import React, { useState, useEffect } from 'react';

// ✅ Axios Instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json"
  }
});

const Examinee = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    number: '',
    address: '',
    college: '',
    qualification: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    handleFetch();
  }, []);

  // ✅ Fetch
  const handleFetch = async () => {
    try {
      const res = await axiosInstance.get('/examinee');
      setData(res.data || []);
    } catch (err) {
      console.error("Fetch Error:", err.response?.data || err.message);
      setError("Failed to fetch examinee data");
    }
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/examinee/${id}`);
      alert("Deleted Successfully");
      handleFetch();
    } catch (err) {
      console.error("Delete Error:", err.response?.data || err.message);
      alert("Delete Failed");
    }
  };

  // ✅ Edit
  const handleEdit = (item) => {
    setForm({
      name: item.name || '',
      email: item.email || '',
      number: item.number || '',
      address: item.address || '',
      college: item.college || '',
      qualification: item.qualification || '',
    });

    setEditingId(item._id);
    setEditFormVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // ✅ Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editingId) return;

    try {
      await axiosInstance.put(`/examinee/${editingId}`, form);
      alert('Examinee Updated Successfully');

      setForm({
        name: '',
        email: '',
        number: '',
        address: '',
        college: '',
        qualification: ''
      });

      setEditingId(null);
      setEditFormVisible(false);
      handleFetch();

    } catch (error) {
      console.error("Update Error:", error.response?.data || error.message);
      alert("Error updating examinee");
    }
  };

  return (
    <div className='container-fluid p-0'>

      {error && <div className="alert alert-danger">{error}</div>}

      {editFormVisible && (
        <div className="card" style={{ border: "1px solid #6f42c1", width: "100%" }}>
          <div className="card-body">
            <h3 className="fw-bold" style={{ color: "#6f42c1" }}>Edit Examinee</h3>
            <form className="border p-2 rounded" onSubmit={handleSubmit}>
              <div className="row mb-2">
                <div className="col-sm-4">
                  <input className="form-control" name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
                </div>
                <div className="col-sm-4">
                  <input className="form-control" name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
                </div>
                <div className="col-sm-4">
                  <input className="form-control" name="number" value={form.number} onChange={handleChange} placeholder="Number" required />
                </div>
              </div>

              <div className="row mb-2">
                <div className="col-sm-4">
                  <input className="form-control" name="address" value={form.address} onChange={handleChange} placeholder="Address" />
                </div>
                <div className="col-sm-4">
                  <input className="form-control" name="college" value={form.college} onChange={handleChange} placeholder="College" />
                </div>
                <div className="col-sm-4">
                  <input className="form-control" name="qualification" value={form.qualification} onChange={handleChange} placeholder="Qualification" />
                </div>
              </div>

              <button type="submit" className="btn btn-light text-white mb-1 me-2" style={{ background: "#39064fff" }}>
                Update
              </button>

              <button type="button" className="btn btn-secondary" onClick={() => setEditFormVisible(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="card mx-auto mt-2" style={{ border: "1px solid #6f42c1", width: "100%" }}>
        <div className="card-body">
          <h3 className="fw-bold" style={{ color: "#6f42c1" }}>Examinee Details</h3>

          <table className="table table-bordered text-center">
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>College</th>
                <th>Qualification</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, i) => (
                <tr key={item._id}>
                  <td>{i + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.college}</td>
                  <td>{item.qualification}</td>
                  <td>{item.number}</td>
                  <td>
                    <button className="btn btn-success me-2" onClick={() => handleEdit(item)}>
                      Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default Examinee;