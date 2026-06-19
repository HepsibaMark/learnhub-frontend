import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

function Dashboard() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const name = localStorage.getItem('name');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) { navigate('/login'); return; }
    axios.get(API_URL + '/api/dashboard', { headers: { Authorization: 'Bearer ' + token } })
      .then(res => setEnrolledCourses(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleCertificate = (course_id) => {
    window.open(API_URL + '/api/certificate/' + course_id + '?token=' + token, '_blank');
  };

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', minHeight: '100vh', background: '#f8f9fa' }}>
      <div style={{ background: '#0056D2', padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: '24px' }}>LearnHub</h1>
        <button onClick={() => navigate('/')} style={{ padding: '8px 20px', background: 'white', color: '#0056D2', border: 'none', borderRadius: '20px', cursor: 'pointer' }}>Back to Courses</button>
      </div>
      <div style={{ padding: '40px' }}>
        <h2 style={{ fontSize: '28px', color: '#1a1a1a', marginBottom: '8px' }}>My Dashboard</h2>
        <p style={{ color: '#666', marginBottom: '32px' }}>Welcome back, {name}!</p>
        <h3 style={{ fontSize: '20px', marginBottom: '20px', color: '#333' }}>My Enrolled Courses</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
          {enrolledCourses.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <p style={{ color: '#666' }}>No courses enrolled yet!</p>
              <button onClick={() => navigate('/')} style={{ padding: '10px 24px', background: '#0056D2', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '16px' }}>Browse Courses</button>
            </div>
          ) : (
            enrolledCourses.map((course, index) => {
              const colors = ['#0056D2', '#0097A7', '#7B1FA2', '#E53935', '#FF9800'];
              const color = colors[index % colors.length];
              return (
                <div key={course.id} style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                  <div style={{ background: color, height: '8px' }}></div>
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ margin: '0 0 8px', color: '#1a1a1a' }}>{course.title}</h3>
                    <p style={{ margin: '0 0 16px', color: '#666', fontSize: '14px' }}>{course.description}</p>
                    <p style={{ color: 'green', fontWeight: 'bold', marginBottom: '16px' }}>Enrolled</p>
                    <button onClick={() => handleCertificate(course.id)} style={{ width: '100%', padding: '10px', background: color, color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Get Certificate</button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
