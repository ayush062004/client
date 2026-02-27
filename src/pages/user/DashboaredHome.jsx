import React from 'react'

const DashboaredHome = () => {
  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center">Exam Dashboard</h2>

      <div className="row g-3">

        <div className="col-md-6">
          <div className="card shadow-sm text-center">
            <div className="card-body cardbg">
              <h5 className="card-title">Total Exams</h5>
              <h2 className="text-primary">25</h2>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm text-center">
            <div className="card-body cardbg">
              <h5 className="card-title">Results</h5>
              <div className="d-flex justify-content-around">
                <div>
                  <h6 className="text-success">Passed</h6>
                  <h3>18</h3>
                </div>
                <div>
                  <h6 className="text-danger">Failed</h6>
                  <h3>7</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="row mt-5">
        <div className="col-sm-12">
          <h2 className="card-title text-center">Exams</h2>
          <div className="card shadow-sm text-center">
            <div className="card-body cardbg">
              <h2 className="text-primary"></h2>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default DashboaredHome