import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const GradsPage = () => {

    const [user, token] = useAuth();
    const [graduates, setGraduates] = useState([]);

    useEffect(() => {
        const fetchGraduates = async () => {
            try {
                let response = await axios.get('http://127.0.0.1:8000/api/auth/grads/', {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });
                console.log('Success response in Grad_ready', graduates)
                setGraduates(response.data);
            } catch (error) {
                console.log('Error in Grad_ready', error);
            }
        };
        fetchGraduates();
    }, [token]);
    return (
        <><h1>Candidates for Graduation</h1>
            <h2>BACHELOR'S DEGREE PROGRAM</h2>
            <h2>128 CREDITS MINIMUM AND 3.0 GPA REQUIRED</h2>
            <h2><Link to="/directory">Back to Employee Portal</Link></h2><hr />
            <br /><><><div className="container">
            {   graduates.map((graduate) => (
                <div key={graduate.id}>
                    <hr />
                    <span>{graduate.first_name} {graduate.last_name} | </span>
                    <span>LAST SEM: {graduate.semester} | </span>
                    <span>GPA: {graduate.gpa} |</span>
                    <span> <Link to="/grads" className="dummy">CR EARNED: {graduate.credits_earned} | </Link> </span>
                    <span>GRAD: FEB | </span>
                    <span>WITH HONORS </span>
                    <span> </span>
                </div>
                      ))}
            
            {console.log('Return in Grad_ready', graduates)}
            </div><div className="page-bottom"></div>
        </></></>
    );
};

export default GradsPage;


