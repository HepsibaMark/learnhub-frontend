import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:5000/api/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('name', res.data.name);
      localStorage.setItem('role', res.data.role);
      navigate('/');
    } catch (err) { setMessage('Invalid email or password'); }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0056D2, #0097A7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ background: 'white', borderRadius: '16px', padding: '40px', width: '400px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
        <h1 style={{ textAlign: 'center', color: '#0056D2', marginBottom: '8px' }}>LearnHub</h1>
        <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '24px', fontWeight: 'normal' }}>Welcome back!</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', color: '#555', fontWeight: 'bold' }}>Email</label>
            <input name='email' placeholder='Enter your email' onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #e0e0e0', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '6px', color: '#555', fontWeight: 'bold' }}>Password</label>
            <input name='password' type='password' placeholder='Enter your password' onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #e0e0e0', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>
          <button type='submit' style={{ width: '100%', padding: '14px', background: '#0056D2', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>Login</button>
        </form>
        {message && <p style={{ color: 'red', textAlign: 'center', marginTop: '16px' }}>{message}</p>}
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>Don't have an account? <span onClick={() => navigate('/register')} style={{ color: '#0056D2', cursor: 'pointer', fontWeight: 'bold' }}>Register</span></p>
      </div>
    </div>
  );
}

export default Login;
