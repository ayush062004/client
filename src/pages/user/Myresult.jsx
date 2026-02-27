import React, { useState, useEffect } from "react";
import API from "../../api"; // ✅ axios instance

const Myresult = () => {
  const [data, setData] = useState([]);
  const userId = localStorage.getItem("userId");

  const handlefetch = async () => {
    if (!userId) return;

    try {
      const res = await API.get(`/api/exams/examinee-result/${userId}`);

      const resultData = Array.isArray(res.data.message)
        ? res.data.message
        : res.data.message
        ? [res.data.message]
        : [];

      setData(resultData);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  useEffect(() => {
    handlefetch();
  }, [userId]); // ✅ dependency added

  return (
    <div className="container-fluid mt-4">
      <h4 className="text-light">My Result</h4>

      <div className="row mt-3">
        <div className="col-sm-12">
          <table className="table table-bordered text-center">
            <thead>
              <tr className="text-light">
                <th style={{ width: "200px" }}>S.No</th>
                <th style={{ width: "200px" }}>Name</th>
                <th style={{ width: "200px" }}>Course</th>
                <th style={{ width: "200px" }}>Total Marks</th>
                <th style={{ width: "200px" }}>Passing Marks</th>
                <th style={{ width: "200px" }}>Score</th>
                <th style={{ width: "200px" }}>Status</th>
              </tr>
            </thead>

            <tbody className="text-light">
              {data.length > 0 ? (
                data.map((exam, index) => (
                  <tr key={exam._id}>
                    <td className="border">{index + 1}</td>
                    <td className="border">
                      {exam?.examineeId?.firstname}{" "}
                      {exam?.examineeId?.lastname}
                    </td>
                    <td className="border">
                      {exam?.examineeId?.course}
                    </td>
                    <td className="border">{exam.totalMarks}</td>
                    <td className="border">{exam.passingMarks}</td>
                    <td className="border">{exam.score}</td>
                    <td className="border">{exam.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Myresult;