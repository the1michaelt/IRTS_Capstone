import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";
import axios from 'axios';
import AuthContext from "../../context/AuthContext";
import './GradeCoursePage.css'


let initialValues = {
  user_id: "",
  course_id: "",
  grade_received: "",
  credits_received: "",
};

const GradeCoursePage = () => {
  const [user, token] = useAuth();
  const navigate = useNavigate();
  const { studentId } = useParams();
  const { courseId } = useParams();
  const [formData, handleInputChange, handleSubmit] = useCustomForm(initialValues, postGradeCourseObject);

 
  
  async function postGradeCourseObject() {
    let courseId = formData.course_id
    { console.log('courseId', courseId) }
    try {
      let response = await axios.put(`http://127.0.0.1:8000/api/student_courses/put_grade_course_object/${courseId}/`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      navigate(`/find_student_course/${studentId}`);
    } catch (error) {
      console.log(error.message);

    }
  }

     
  return (
    <><div><h1>Enter a Grade</h1></div>
      <div><h2>Logged-in Employee: {user.first_name} {user.last_name}</h2><br />
        <h2><Link to={`/find_student_course/${studentId}`}>Back to Find Student's Course</Link></h2>
        <h2><Link to="/employee">Back to Employee Portal</Link></h2>
        
        <hr />
      </div><div className="container ">
        <h2>Student ID: {studentId}</h2><br/>
        <form className="form" onSubmit={handleSubmit}>
          <label>
            <span>COURSE ID: {""}
                          
              <input className=" "
                type="text"
                name="course_id"
                value={formData.course_id}
                onChange={handleInputChange} /></span>
          </label>
          <label>
            <span>GRADE{" (1-4): "}
              <input className=""
                type="text"
                name="grade_received"
                value={formData.grade_received}
                onChange={handleInputChange} /></span>
          </label>
          <button type="submit">Submit Grade</button>
        </form>
      </div></>
  );
};

export default GradeCoursePage;

