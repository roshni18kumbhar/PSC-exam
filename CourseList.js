// CourseList.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CourseList.css';
import { useNavigate } from 'react-router-dom'; // Import withRouter

function CourseList({ filters, searchQuery, history }) {
  const [courses] = useState([
    // Course data
    {
      id: 1,
      title: 'Introduction to React',
      description: 'Learn the basics of React.js framework',
      price: 4999,
      duration: 'short',
      program: 'IT Software',
      startDate: '2024-04-20',
      image: 'https://miro.medium.com/v2/resize:fit:1200/1*y6C4nSvy2Woe0m7bWEn4BA.png'
    },
    {
      id: 2,
      title: 'Advanced JavaScript Concepts',
      description: 'Deep dive into advanced JavaScript topics',
      price: 6999,
      duration: 'long',
      program: 'IT Software',
      startDate: '2024-08-01',
      image: 'https://ashokitech.com/uploads/course/advanced-java-online-training.jpeg'
    },
    {
      id: 3,
      title: 'Web Development Bootcamp',
      description: 'Comprehensive course covering HTML, CSS, and JavaScript',
      price: 3599,
      duration: 'medium',
      program: 'IT Software',
      startDate: '2024-05-20',
      image: 'https://eboxman.com/wp-content/uploads/2022/10/3-2.webp'
    },
    {
      id: 4,
      title: 'Introduction to Psychology',
      description: 'Fundamental concepts of psychology',
      price: 4299,
      duration: 'short',
      program: 'Humanities',
      startDate: '2024-09-05',
      image: 'https://emarketing.cengageasia.com/cover/cover/9789814896276.jpg'
    },
    {
      id: 5,
      title: 'World History: A Comprehensive Overview',
      description: 'Exploration of world history from ancient to modern times',
      price: 3899,
      duration: 'long',
      program: 'Humanities',
      startDate: '2024-11-10',
      image: 'https://play-lh.googleusercontent.com/FSi-XkZeIKie6wtu4tm_tQGKbuYPANOoHmhM85Gp9NdjtIhlAV5ug7EKllaw3nSFMRUa'
    },
    
  ]);

  // Filter courses based on search query and filters
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (filters.subjectArea === '' || course.program === filters.subjectArea) &&
    (filters.duration === '' || course.duration.toLowerCase() === filters.duration.toLowerCase()) &&
    (!filters.startDate || new Date(course.startDate) >= new Date(filters.startDate))
  );

  const groupedCourses = filteredCourses.reduce((acc, course) => {
    if (!acc[course.program]) {
      acc[course.program] = [];
    }
    acc[course.program].push(course);
    return acc;
  }, {});

  const navigate = useNavigate(); // Use useNavigate hook to access the history object

  const handleEnroll = (courseId, courseTitle) => {
    navigate(`/enroll/${courseId}/${courseTitle}`); // Pass course title as URL parameter
  };

  return (
    // Course list rendering logic
    <div className="container">
      <h2 className="text-center my-4">Available Courses</h2>
      {Object.keys(groupedCourses).map(program => (
        <div key={program} className="row mb-4">
          <h3 className="col-12 mb-3">{program}</h3>
          {groupedCourses[program].map(course => (
            <div className="col-md-4" key={course.id}>
              <div className="card">
                <img src={course.image} className="card-img-top" alt={course.title} />
                <div className="card-body">
                  <h5 className="card-title">{course.title}</h5>
                  <p className="card-text">{course.description}</p>
                  <p className="card-text">Price: ₹{course.price}</p>
                  {/* Button to enroll */}
                  <button onClick={() => handleEnroll(course.id, course.title)} className="btn btn-primary">Enroll</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default CourseList;