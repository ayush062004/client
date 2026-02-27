import React, { useState, useEffect } from 'react';
import axios from 'axios';

// ✅ Axios Instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json"
  }
});

const MessageReply = () => {
  const [messages, setMessages] = useState([]);
  const [replyInputs, setReplyInputs] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ✅ Fetch All Messages
  const fetchAll = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/message/all');
      setMessages(res.data?.message || []);
      setError('');
    } catch (err) {
      console.error('Fetch Error:', err.response?.data || err.message);
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleReplyChange = (id, value) => {
    setReplyInputs((prev) => ({ ...prev, [id]: value }));
  };

  // ✅ Send Reply
  const sendReply = async (id) => {
    const answer = (replyInputs[id] || '').trim();
    if (!answer) return alert('Please type a reply.');

    try {
      await axiosInstance.put(`/message/reply/${id}`, {
        answer,
        role: 'admin'
      });

      setReplyInputs((prev) => ({ ...prev, [id]: '' }));
      fetchAll();
    } catch (err) {
      console.error('Reply Error:', err.response?.data || err.message);
      alert('Failed to send reply');
    }
  };

  // ✅ Edit Reply
  const editReply = async (id, currentReply) => {
    const newReply = prompt('Edit reply:', currentReply || '');
    if (newReply === null) return;

    try {
      await axiosInstance.put(`/message/reply/${id}`, {
        answer: newReply.trim(),
        role: 'admin'
      });

      fetchAll();
    } catch (err) {
      console.error('Edit Error:', err.response?.data || err.message);
      alert('Failed to edit reply');
    }
  };

  // ✅ Delete Reply
  const deleteByAdmin = async (id) => {
    if (!window.confirm('Delete this reply?')) return;

    try {
      await axiosInstance.put(`/message/delete/${id}`, {
        role: 'admin'
      });

      fetchAll();
    } catch (err) {
      console.error('Delete Error:', err.response?.data || err.message);
      alert('Failed to delete reply');
    }
  };

  return (
    <div className="container p-3">
      <h2 style={{ color: "#6f42c1" }}>Admin - User Messages</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="alert alert-info">Loading messages...</div>}

      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Examinee</th>
            <th>Feedback</th>
            <th>Admin Reply</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {!loading && messages.length === 0 ? (
            <tr><td colSpan="5">No messages found</td></tr>
          ) : (
            messages.map((msg, idx) => (
              <tr key={msg._id}>
                <td>{idx + 1}</td>

                <td>
                  {msg.examineeId?.name || 'N/A'}
                  <div style={{ fontSize: '0.85em', color: '#555' }}>
                    {msg.examineeId?.email || ''}
                  </div>
                </td>

                <td>{msg.question}</td>

                <td>{msg.answer || 'No reply yet'}</td>

                <td style={{ minWidth: 250 }}>
                  <input
                    type="text"
                    placeholder="Type reply..."
                    value={replyInputs[msg._id] || ''}
                    onChange={(e) =>
                      handleReplyChange(msg._id, e.target.value)
                    }
                    className="form-control mb-1"
                  />

                  <div className="d-flex gap-1">
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => sendReply(msg._id)}
                    >
                      Send
                    </button>

                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => editReply(msg._id, msg.answer)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteByAdmin(msg._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MessageReply;