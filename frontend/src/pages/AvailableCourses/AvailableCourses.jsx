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
    const [semester, setSemester] = useState(0);

    useEffect(() => {
        const fetchAvailableCourses = async () => {
            try {
                let response = await axios.get(`http://127.0.0.1:8000/api/courses/courses_available/`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                { console.log('available courses', availableCourses) }
                setAvailableCourses(response.data);
            } catch(error) {
                console.log('Error in AvailableCourses', error);
            }
        };
        fetchAvailableCourses();
    }, [token]);


    const selectCourse = async (courseId) => {
        let courseObject = {
            "user_id": user.id,
            "course_id": courseId,
        }
        try {
            let response = await axios.post(`http://127.0.0.1:8000/api/student_courses/post_student_into_courses/`,
                courseObject,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
            console.log('enroll', courseObject)
            setApplyCourse(response.data.items)
            navigate(`/course_schedule/`)
        } catch (error) {
            console.log('error in enroll', error.response.data)
        }
    };
    

    return (
        <><h1>Courses Available to You,<br />{user.first_name} {user.last_name}, ID# {user.id}</h1><><>
            <h2>BACHELOR'S DEGREE PROGRAM</h2>
            <h2>128 CREDITS TOTAL REQUIRED TO GRADUATE</h2>
            <h2><Link to={`/course_schedule/`}>View Scheduled Courses</Link></h2>
            <h2><Link to="/course_transcript">View Transcript</Link></h2>
            <br />
            <div>
                {availableCourses.map((availableCourse) => (
                    <><div key={availableCourse.id} className="container">
                        {console.log('course:', availableCourse)}
                        <hr /><span className="schedule-button">
                            <button type='submit' onClick={() => selectCourse(availableCourse.id)}>Enroll</button></span>
                        <span><Link to={`#`} className="dummy">| {availableCourse.name} |</Link>CR VALUE: {availableCourse.credit_value} |<Link to={`#`} className="dummy"> DAYS: M, T, W |</Link>INSTR: SMITH | LOC: ONLN </span>
                    </div>
                    </>
                ))}

            </div><div className="page-bottom"></div>
            <hr /><h2><Link to="#" className="dummy">Back to Top</Link></h2>
            <div className="page-bottom"></div>
        </></></>
    );
};

export default AvailableCourses;
