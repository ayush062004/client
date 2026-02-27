import React, { useEffect, useState } from "react";
import API from "../api"; // ✅ axios instance

const Session = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [id, setId] = useState("");
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Fetch Sessions
  const handlefetch = async () => {
    try {
      const res = await API.get("/api/session");
      setData(res.data || []);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  useEffect(() => {
    handlefetch();
  }, []);

  // ✅ Add / Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (edit) {
        await API.put(`/api/session/${id}`, form);
        alert("Updated Successfully");
      } else {
        await API.post("/api/session", form);
        alert("Session Added Successfully");
      }

      // Reset form
      setForm({ name: "", description: "" });
      setEdit(false);
      setId("");
      handlefetch();
    } catch (error) {
      alert("Session not added. Try again.");
      console.error(error);
    }
  };

  // ✅ Delete
  const handleDelete = async (deleteId) => {
    try {
      await API.delete(`/api/session/${deleteId}`);
      alert("Session Deleted Successfully");
      handlefetch();
    } catch (error) {
      alert("Sorry, Try again Later");
      console.error(error);
    }
  };

  // ✅ Edit
  const handleEdit = (item) => {
    setForm({
      name: item.name,
      description: item.description,
    });
    setEdit(true);
    setId(item._id);
  };

  return (
    <div>
      {/* FORM */}
      <div className="container-fluid">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-12 shadow-lg p-3 mb-1 bg-body-tertiary rounded mt-2">
              <div className="mb-3">
                <input
                  type="text"
                  value={form.name}
                  name="name"
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Session"
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
                />
              </div>

              <button type="submit" className="btn btn-danger">
                {edit ? "Update" : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* TABLE */}
      <div className="container-fluid mt-3">
        <div className="card p-2 shadow-sm">
          <h2 className="mb-3 fw-bold" style={{ color: "#6f42c1" }}>
            SESSION
          </h2>

          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>S.No</th>
                <th>Session</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    No Sessions Found
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
                        className="btn btn-success btn-sm me-2"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
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
  );
};

export default Session;