import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";

const DirectoryPage = () => {
  const [user, token] = useAuth();
  return (
    <><div className="centered">
      <br /><h1>Welcome to the Employee Portal, <br/>{user.first_name} {user.last_name}!</h1>
      <br /><hr />
      <h2>FIND YOUR STUDENT </h2>
      <h2>GRADE YOUR STUDENT </h2>
      <div><Link to="/enrolled" className="register"> Directory of Current Students </Link></div><br />
      <div>
        <h2>COURSE CATALOG</h2>
        <Link to="/add_courses" className="register">Add A Course</Link>
      </div><br />
      <div>
        <h2>NEXT GRADUATING CLASS</h2>
        <Link to="/grads" className="register"> Candidates for Graduation </Link></div>

    </div><div className="page-bottom"></div></>

  );
};
export default DirectoryPage;
