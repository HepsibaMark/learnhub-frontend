import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function InstructorPanel() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', price: '' });
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');
  const name = localStorage.getItem('name');
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || role !== 'instructor') {
      navigate('/');
      return;
    }
    axios.get('http://127.0.0.1:5000/api/courses')
      .then(res => setCourses(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:5000/api/courses', form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
      const updated = await axios.get('http://127.0.0.1:5000/api/courses');
      setCourses(updated.data);
      setForm({ title: '', description: '', price: '' });
    } catch (err) {
      setMessage(err.response.data.error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>🎓 Instructor Panel</h1>
        <button onClick={() => navigate('/')} style={{ padding: '8px 16px', background: '#2196F3', color: 'white', border: 'none', cursor: 'pointer' }}>
          Back to Courses
        </button>
      </div>

      <h2>Welcome, {name}! 👋</h2>

      <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h3>Add New Course</h3>
        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Course Title" value={form.title} onChange={handleChange} style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }} />
          <textarea name="description" placeholder="Course Description" value={form.description} onChange={handleChange} style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px', height: '80px' }} />
          <input name="price" placeholder="Price (e.g. 9.99)" value={form.price} onChange={handleChange} style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }} />
          <button type="submit" style={{ padding: '10px 20px', background: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
            Add Course
          </button>
        </form>
        {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
      </div>

      <h3>My Courses</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {courses.length === 0 ? (
          <p>No courses added yet!</p>
        ) : (
          courses.map(course => (
            <div key={course.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', width: '250px' }}>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <p><strong>Price: ${course.price}</strong></p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default InstructorPanel;