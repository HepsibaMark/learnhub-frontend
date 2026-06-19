import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

function Home() {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState('');
  const name = localStorage.getItem('name');
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(API_URL + '/api/courses')
      .then(res => setCourses(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleEnroll = async (course_id) => {
    if (!token) { navigate('/login'); return; }
    try {
      const res = await axios.post(API_URL + '/api/enroll', { course_id }, { headers: { Authorization: 'Bearer ' + token } });
      setMessage(res.data.message);
    } catch (err) { setMessage('Could not enroll'); }
  };

  const handleLogout = () => { localStorage.clear(); navigate('/login'); };

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', minHeight: '100vh', background: '#f8f9fa' }}>
      <div style={{ background: '#0056D2', padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: '24px' }}>LearnHub</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          {name ? (
            <>
              <span style={{ color: 'white' }}>Welcome, {name}!</span>
              {role === 'instructor' && (<button onClick={() => navigate('/instructor')} style={{ padding: '8px 16px', background: '#FF9800', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer' }}>Instructor Panel</button>)}
              <button onClick={() => navigate('/dashboard')} style={{ padding: '8px 16px', background: 'white', color: '#0056D2', border: 'none', borderRadius: '20px', cursor: 'pointer' }}>My Dashboard</button>
              <button onClick={handleLogout} style={{ padding: '8px 16px', background: '#e53935', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer' }}>Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/login')} style={{ padding: '8px 20px', background: 'white', color: '#0056D2', border: 'none', borderRadius: '20px', cursor: 'pointer' }}>Login</button>
              <button onClick={() => navigate('/register')} style={{ padding: '8px 20px', background: '#FF9800', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer' }}>Register</button>
            </>
          )}
        </div>
      </div>
      <div style={{ background: 'linear-gradient(135deg, #0056D2, #0097A7)', padding: '60px 40px', textAlign: 'center', color: 'white' }}>
        <h2 style={{ fontSize: '40px', margin: '0 0 16px' }}>Learn Without Limits</h2>
        <p style={{ fontSize: '18px', opacity: 0.9 }}>Start, switch, or advance your career with thousands of courses</p>
      </div>
      <div style={{ padding: '40px' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '24px' }}>Popular Courses</h2>
        {message && <p style={{ color: 'green', fontWeight: 'bold' }}>{message}</p>}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
          {courses.length === 0 ? (<p>No courses available yet!</p>) : (courses.map((course, index) => {
            const colors = ['#0056D2', '#0097A7', '#7B1FA2', '#E53935', '#FF9800'];
            const color = colors[index % colors.length];
            return (
              <div key={course.id} style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <div style={{ background: color, height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '48px', color: 'white' }}>Course</span>
                </div>
                <div style={{ padding: '20px' }}>
                  <h3 style={{ margin: '0 0 8px', color: '#1a1a1a' }}>{course.title}</h3>
                  <p style={{ margin: '0 0 16px', color: '#666', fontSize: '14px' }}>{course.description}</p>
                  <p style={{ margin: '0 0 16px', color: color, fontWeight: 'bold', fontSize: '18px' }}>{course.price}</p>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => navigate('/course/' + course.id)} style={{ flex: 1, padding: '10px', background: color, color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>View</button>
                    <button onClick={() => handleEnroll(course.id)} style={{ flex: 1, padding: '10px', background: 'white', color: color, border: '2px solid ' + color, borderRadius: '8px', cursor: 'pointer' }}>Enroll</button>
                  </div>
                </div>
              </div>
            );
          }))}
        </div>
      </div>
    </div>
  );
}

export default Home;
