import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

function CourseDetail() {
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(API_URL + '/api/courses/' + id)
      .then(res => { setCourse(res.data.course); setModules(res.data.modules); })
      .catch(err => console.log(err));
  }, [id]);

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={() => navigate('/')} style={{ padding: '8px 16px', background: '#2196F3', color: 'white', border: 'none', cursor: 'pointer', marginBottom: '20px' }}>Back to Courses</button>
      {course && (
        <>
          <h1>{course.title}</h1>
          <p>{course.description}</p>
          <p><strong>Price: {course.price}</strong></p>
          <h2>Modules</h2>
          {modules.length === 0 ? (<p>No modules available yet!</p>) : (modules.map(module => (
            <div key={module.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
              <h3>{module.title}</h3>
              {module.lessons && module.lessons.map(lesson => (
                <div key={lesson.id} style={{ padding: '8px', background: '#f5f5f5', marginBottom: '8px', borderRadius: '4px' }}>
                  <p>{lesson.title}</p>
                </div>
              ))}
            </div>
          )))}
        </>
      )}
    </div>
  );
}

export default CourseDetail;
