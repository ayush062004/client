import React, { useEffect, useState } from "react";
import api from "../../api";
import { Link } from "react-router";

const Myexams = () => {
  const [data, setData] = useState([]);

  const handlefetch = async () => {
    try {
      const res = await API.get("/api/exams/exams");
      setData(res.data || []);
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };

  useEffect(() => {
    handlefetch();
  }, []);

  return (
    <div className="container-fluid mt-4">
      <h4 className="text-light">My Exams</h4>

      <div className="row mt-3">
        <div className="col-sm-12">
          <table className="table table-bordered text-center">
            <thead>
              <tr className="text-light">
                <th style={{ width: "200px" }}>S.No</th>
                <th style={{ width: "200px" }}>Exam Name</th>
                <th style={{ width: "200px" }}>Date</th>
                <th style={{ width: "200px" }}>Duration</th>
                <th style={{ width: "200px" }}>Action</th>
              </tr>
            </thead>

            <tbody className="text-light">
              {data.length === 0 ? (
                <tr>
                  <td colSpan="5">No exams available</td>
                </tr>
              ) : (
                data.map((item, i) => (
                  <tr key={item._id}>
                    <td>{i + 1}</td>
                    <td>{item.title}</td>
                    <td>{item.date}</td>
                    <td>{item.duration}</td>
                    <td className="p-2">
                      <Link
                        to={`/LoginDashboard/getexam/${item._id}`}
                        className="btn btn-success"
                      >
                        Start
                      </Link>
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

export default Myexams;