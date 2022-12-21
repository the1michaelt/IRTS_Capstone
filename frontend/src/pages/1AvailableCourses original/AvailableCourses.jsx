import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const AvailableCourses = (props) => {

    const [user, token] = useAuth();
    const [availableCourses, setAvailableCourses] = useState([]);
    const [applyCourse, setApplyCourse] = useState([]);
    const navigate = useNavigate();
    
        useEffect(() => {
        const fetchAvailableCourses = async () => {
            try {
                let response = await axios.get(`http://127.0.0.1:8000/api/courses/get_available_courses/`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                setAvailableCourses(response.data);
            } catch (error) {
                console.log('Error in AvailableCourses', error);
            }
        };
            fetchAvailableCourses();
    }, [token]);

    
    const selectCourse = async(courseId) => {
        let courseObject = {
            "user_id": user.id,
            "course_id": courseId,
        }
        try {
            let response = await axios.post(`http://127.0.0.1:8000/api/student_courses/add_student_to_course/`,
                courseObject,
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            
            setApplyCourse(response.data.items)
            navigate(`/scheduled/`)
        } catch (error) {
            console.log('error in courseId', error.response.data)
        }
 
    };
    return (
        <><h1>Courses Available to You,<br />{user.first_name} {user.last_name}</h1><><>
            <h2>BACHELOR'S DEGREE PROGRAM</h2>
            <h2>128 CREDITS TOTAL REQUIRED TO GRADUATE</h2>
            <h2><Link to={`/scheduled/`}>View Scheduled Courses</Link></h2>
            <h2><Link to="/transcript">View Transcript</Link></h2>
            <br />   
            <div>
            {   availableCourses.map((course) => (
                <><div key={course.id} className="container">
                    <hr />  
                    <span className="schedule-button">
                        <button type='submit' onClick={() => selectCourse(course.id)}>Enroll</button>
                    </span>               
                    <span><Link to={`#`} className="dummy">| {course.name} |</Link></span>
                    <span>CR VALUE: {course.credit_value} |</span>
                    <span><Link to={`#`} className="dummy">DAYS: M, T, W |</Link></span>
                    <span>INSTR: SMITH |</span>
                    <span>LOC: ONLN  </span>
                  </div>
                </>
                    ))}
           
            </div><div className="page-bottom"></div>
        </></></>
    );
};

export default AvailableCourses;