import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//EMPLOYEES ONLY
const StudentDirectoryPage = () => {

    const [user, token] = useAuth();
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                let response = await axios.get(`http://127.0.0.1:8000/api/auth/enrolled/`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                setStudents(response.data);
            } catch (error) {
                console.log('Error in Grad_ready', error);
            }
        };
        fetchStudents();
    }, [token]);

   
    return (
        <><h1>Directory of Current Students</h1>
            <h2>BACHELOR'S DEGREE PROGRAM</h2>
            <h2>THIS SEMESTER: AUG 1 - DEC 31 </h2>
            <h2>NEXT SEMESTER: FEB 1 - MAY 31 </h2>
            <h2><Link to="/directory">Back to Employee Portal</Link></h2>
            <br /><><><div className="container">
                {students.map((student) => (
                    <div key={student.id}>
                        <hr /><div>
                            <span >
                                <Link to={`/find_student_course/${student.id}`}>FIND STUDENT COURSE</Link>
                            </span>
                            <span><Link to="#" className="dummy">| ADD XFER CREDIT</Link></span>
                            <span>| {student.first_name} {student.last_name} |</span>
                            <span>SEM: {student.semester} |</span>
                            <span>F-TIME </span>
        
                        </div>
                    </div>
                ))}
            </div><hr/><h2><Link to="#" className="dummy">Back to Top</Link></h2><div className="page-bottom"></div>
            </></></>
    );
};

export default StudentDirectoryPage;

