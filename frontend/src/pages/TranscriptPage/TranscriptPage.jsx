import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';


const TranscriptPage = (props) => {

    const [user, token] = useAuth();
    const [studentTranscripts, setStudentTranscripts] = useState([]);
    const [Gpa, setGpa] = useState(0);
    const [credits, setCredits] = useState(0);
    const [semester, setSemester] = useState(0);
    // const { userId } = useParams();
    let userId= user.id
    console.log(userId)

    useEffect(() => {
        const fetchStudentTranscripts = async () => {
            try {
                let response = await axios.get(`http://127.0.0.1:8000/api/student_courses/get_transcript/`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                setStudentTranscripts(response.data);
            } catch (error) {
                console.log('Error in StudentTranscripts', error);
            }
        };
        fetchStudentTranscripts();
    }, [token]);


    useEffect(() => {
        const fetchGpa = async () => {
            try {
                let response = await axios.get(`http://127.0.0.1:8000/api/auth/get_current_gpa/${userId}/`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                setGpa(response.data);
            } catch (error) {
                console.log('Error in fetch Gpa', error);
            }
        };
        fetchGpa();
    }, [token])

    useEffect(() => {
        const fetchCredits = async () => {
            console.log('userId', userId)
            try {
                let response = await axios.get(`http://127.0.0.1:8000/api/auth/get_current_credits/${userId}/`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                setCredits(response.data);
            } catch (error) {
                console.log('Error in fetch credits', error);
            }
        };
        fetchCredits();
    }, [token])


    useEffect(() => {
        const fetchSemester = async () => {
            try {
                let response = await axios.get(`http://127.0.0.1:8000/api/auth/get_current_semester/${userId}/`, {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                setSemester(response.data);
            } catch (error) {
                console.log('Error in fetch semester', error);
            }
        };
        fetchSemester();
    }, [token])



    function getGradeLetter(gradeNumber) {
        console.log('New entry: getGradeLetter: grade number', gradeNumber) 
        switch (gradeNumber) {
            case 4:
                return 'A';
            case 3:
                return 'B';
            case 2:
                return 'C';
            case 1:
                return 'F';
            default:
                return ' ';
        }
    }

    function readyToGraduate(credits, Gpa) {
        if (credits >= 128 && Gpa >= 3)
            return "Eligible for Bachelor's Degree";
        else
            return "En route to Bachelor's Degree";
    }
    let ready = readyToGraduate(credits, Gpa);

    return (
        <><h1>Your Transcript of Courses, <br />{user.first_name} {user.last_name}, ID# {user.id}</h1>
            <h2>CREDITS EARNED: {credits}</h2>
            <h2>CURRENT SEMESTER: {semester}</h2>
            <h2>GPA: {Gpa}</h2>
            <h2>STATUS: {ready}</h2>
            
            <br />

            <h2><Link to={`/courses_available/`}>View Available Courses</Link></h2>
            <h2><Link to={`/course_schedule/`}>View Scheduled Courses</Link></h2>
            <hr />
            <br /><><><div className="container">
                {studentTranscripts.map((studentTranscript) => (
                    <p key={studentTranscript.id}>
                        <span>{studentTranscript.course.name} | GRADE: {getGradeLetter(studentTranscript.grade_received)} | CR VALUE: {studentTranscript.course.credit_value} |</span>
                        <span>CR EARNED: {studentTranscript.credits_received} |</span>
                        <span>FALL 2022 |</span>
                        <span><Link to="#" className="dummy">CR REQUIREMENTS</Link></span>
                        <hr />
                    </p>
                ))}
            </div>
                <h2><Link to="#" className="dummy">Back to Top</Link></h2>
                <div className="page-bottom"></div>
            </></></>

    );
};

export default TranscriptPage;
