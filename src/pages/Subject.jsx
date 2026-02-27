import React, { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const Subject = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [editId, setEditId] = useState(null);
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Fetch Subjects
  const handleFetch = async () => {
    try {
      const res = await axios.get(`${API}/api/Subject`);
      setData(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch data");
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  // ✅ Submit (Add / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(`${API}/api/Subject/${editId}`, form);
        alert("Updated Successfully");
      } else {
        await axios.post(`${API}/api/Subject`, form);
        alert("Added Successfully");
      }

      setForm({ name: "", description: "" });
      setEditId(null);
      handleFetch();
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/api/Subject/${id}`);
      alert("Deleted Successfully");
      handleFetch();
    } catch (err) {
      console.log(err);
      alert("Sorry Try again Later");
    }
  };

  // ✅ Edit
  const handleEdit = (item) => {
    setForm({
      name: item.name,
      description: item.description,
    });
    setEditId(item._id);
  };

  return (
    <div>
      <div className="container-fluid">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-12 shadow-lg p-3 bg-body-tertiary rounded mt-1">
              <div className="mb-3">
                <input
                  type="text"
                  value={form.name}
                  name="name"
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Subject Name"
                  required
                />
              </div>

              <div className="mb-3">
                <textarea
                  onChange={handleChange}
                  value={form.description}
                  name="description"
                  className="form-control"
                  placeholder="Enter Description"
                  rows="3"
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-danger">
                {editId ? "Update" : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>

      <br />

      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 p-2 bg-body-tertiary rounded">
            <div className="card p-2 shadow-sm">
              <h2 className="mb-3 fw-bold" style={{ color: "#6f42c1" }}>
                SUBJECTS
              </h2>

              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>S.No</th>
                    <th>Subject Name</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {data.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No Subjects Found
                      </td>
                    </tr>
                  ) : (
                    data.map((item, i) => (
                      <tr key={item._id}>
                        <td>{i + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>
                          <button
                            className="btn btn-success"
                            onClick={() => handleEdit(item)}
                          >
                            Edit
                          </button>

                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => handleDelete(item._id)}
                          >
                            Delete
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

export default Subject;