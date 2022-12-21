import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useCustomForm from "../../hooks/useCustomForm";
import { useParams } from 'react-router-dom';
import AuthContext from "../../context/AuthContext";
import './FindStudentPage.css';



const FindStudentPage = (props) => {

    const [user, token] = useAuth();
    const [studentCourses, setStudentCourses] = useState([]);
    const [student, setStudent] = useState([]);
    const { studentId, courseId } = useParams();
    const { studentGrades } = useContext(AuthContext);
    const navigate = useNavigate();
    const defaultValues = { user_id: "", course_id: "", grade_received: "" };
    const [formData, handleInputChange, handleSubmit,] = useCustomForm(defaultValues, studentGrades, postNewGrades
    );

    useEffect(() => {
        const fetchStudent = async (props) => {
            { console.log('props pass in studentid', studentId) }
            try {
                let response = await axios.get(`http://127.0.0.1:8000/api/student_courses/admin_views_studentcourses/${studentId}/`,
                    {
                        headers: {
                            Authorization: "Bearer " + token,
                        },
                    });
                console.log('success in fetch student', studentId)
                setStudent(response.data)
            } catch (error) {
                console.log('error in fetch student', error)
            }
        }
        fetchStudent();
    }, [token]);


    async function postNewGrades() {
        try {
            let response = await axios.put(`http://127.0.0.1:8000/api/student_courses/grade_course_object/`, formData, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            console.log('post new Grade', formData)
            // navigate("/directory");
        } catch (error) {
            console.log('post new grade', error.message);
        }
    };

    return (
        <><h1>Find Course to Grade</h1>
            <h2>Logged-in Employee: {user.first_name} {user.last_name}</h2>
            <br />
            {console.log('studentCourse', studentCourses)}
            {console.log('user', user)}
            {console.log('formData', formData)}
            {console.log('student id', studentId)}
            <><div className="container">
                <form className="form horizontal-fields" onSubmit={handleSubmit}>
                    <div><label className="label-style">
                        Course ID:{" "}
                        <input className="input-reduced-width"
                            type="text"
                            name="course"
                            value={formData.id}
                            onChange={handleInputChange}
                        />
                    </label></div>
                    <div><label className="label-style">
                        Enter Grade:{" "}
                        <input className="input-reduced-width"
                            type="text"
                            name="grade_received"
                            value={formData.grade_received}
                            onChange={handleInputChange} />
                    </label></div><br />
                    <button type="submit" onClick={() => postNewGrades(studentCourses)}>Grade</button>
                </form>
            </div></>
            <br />
            <h2><Link to="/directory">Back to Employee Portal</Link></h2><hr /><>
                <><div className="container">
                {student.map((course) => (
                    <p key={course.id}>
                        <hr />
                        {console.log('course', course)}
                        {console.log('user', user)}
                        {console.log('formData', formData)}
                        {console.log('student id', studentId)}
                        <span>{student[0].user.first_name} {student[0].user.last_name} |</span>
                        <span>COURSE ID: {course.course.id} |</span>
                        <span>{course.course.name} |</span>
                        <span>CR VALUE: {course.course.credit_value} |</span>
                        <span>GRADE: {course.grade_received} |</span>
                        {/* <span><Link to="#" className="dummy">CR REQUIREMENTS</Link></span> */}
                    </p>
                ))}
            </div>
                <h2><Link to="#" className="dummy">Back to Top</Link></h2>
                <div className="page-bottom"></div>
            </></></>

    );
};

export default FindStudentPage;

