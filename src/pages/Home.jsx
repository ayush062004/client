import React from "react";
import { motion } from "framer-motion";
import "./admin/Admin.css";

export default function Home() {
  return (
    <div className=" text-light min-vh-100 d-flex flex-column">
      {/* Header */}
      <header className="headc py-3 shadow">
        <div className="container d-flex justify-content-between align-items-center">
          <h1 className="h3 fw-bold text-dark">ExamPrep</h1>
          <nav>
            <a href="#about" className="text-dark mx-3 fw-bold text-decoration-none">
              About
            </a>
            <a href="#contact" className="text-dark mx-3 fw-bold text-decoration-none">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container text-center my-5 flex-grow-1">
        <motion.h2
          className="display-4 fw-bold mb-3"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Welcome to ExamPrep
        </motion.h2>
        <p className="lead text-secondary mb-4">
          A smart platform where Admins conduct exams and Users participate & get instant results.
        </p>
        <div className="d-flex justify-content-center flex-wrap gap-3">
          <button
            className="btn btn-primary btn-lg"
            onClick={() => (window.location.href = "/Login")}
          >
            User Login
          </button>
          <button
            className="btn btn-warning btn-lg"
            onClick={() => (window.location.href = "/AdminLogin")}
          >
            Admin Login
          </button>
          <button
            className="btn btn-success btn-lg"
            onClick={() => (window.location.href = "/Registration")}
          >
            Register
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className=" text-light py-5">
        <div className="container text-center">
          <h3 className="h2 mb-4">About ExamPrep</h3>
          <p className="fs-5">
            ExamPrep is designed to simplify the examination process. Admins can easily create and
            manage exams, while users can log in, take exams, and receive real-time results. The goal
            is to make exam management more efficient and transparent.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className=" py-5">
        <div className="container text-center">
          <h3 className="h2 mb-4">Contact Us</h3>
          <div className="card bg-secondary text-light mx-auto" style={{ maxWidth: "600px" }}>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control bg-dark text-light border-secondary"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control bg-dark text-light border-secondary"
                    placeholder="Your Email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control bg-dark text-light border-secondary"
                    rows="4"
                    placeholder="Your Message"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="headc text-center py-3 mt-auto">
        <p className="mb-0">&copy; {new Date().getFullYear()} ExamPrep. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
