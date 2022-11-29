//start with hello world
//axios call in useEffect, console log response
//then try to display info

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";

function GradsPage() {
    const [user, token] = useAuth();
    const [grads, setGrads] = useState([]);

    useEffect(() => {
        try {
            let response = axios.get('http://127.0.0.1:8000/api/auth/grads/', {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            console.log('Success response in Grad_ready', response)
            setGrads(response.data);
        }
        catch (err) {
            console.log('Error in Grad_ready', err);
        }

    }, [])
    return (
        <><h2>Candidates for Graduation</h2><><><div>
            <h3>{grads}</h3>
            {console.log('Return in Grad_ready', grads.snippet.promise.data)}
        </div>
        </></></>
    )
}

export default GradsPage;
