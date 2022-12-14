import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import useAuth from "../../hooks/useAuth";
import useCustomForm from "../../hooks/useCustomForm";
import { Link } from "react-router-dom";
import axios from 'axios';

let initialValues = {
  name: "",
  credit_value: "",
  semester: "",
};

const AddCoursesPage = () => {
  const [user, token] = useAuth();
  const navigate = useNavigate();
  const [formData, handleInputChange, handleSubmit] = useCustomForm(initialValues, postNewCourses);

  async function postNewCourses() {
    try {
      let response = await axios.post(`http://127.0.0.1:8000/api/courses/post_create_courses/`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      },[]);
      navigate(`/employee`);
    } catch (error) {
      console.log(error.message);
    }
  }


  return (
    <div className="container">
      <h1>Add New Course</h1>
      <h2><Link to="/employee">Back to Employee Portal</Link></h2>
      <h2><Link to="/course_catalog" className="register">View Catalog/Delete A Course</Link></h2>
      <hr />
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Course:{" 3 digits, 7 alphanumeric "}
          <input 
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Credit Value:{" 1 digit, 0 - 4"}
          <input
            type="text"
            name="credit_value"
            value={formData.credit_value}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Semester: {"1 digit, 1 - 8"}
          <input
            type="text"
            name="semester"
            value={formData.semester}
            onChange={handleInputChange}
          />
        </label>
        <label >
          Instructor: {""}
          <input className="dummy"
            type="text"
            name=""
           />
        </label>
        <label >
          Location: {""}
          <input className="dummy"
            type="text"
            name=""
          />
        </label>
        <button>Add to Catalog</button>
      </form>
    </div>
  );
};

export default AddCoursesPage;

