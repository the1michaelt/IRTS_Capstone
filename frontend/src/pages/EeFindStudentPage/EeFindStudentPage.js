import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import { Link } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const { loginUser, isServerError } = useContext(AuthContext);
  const defaultValues = { username: "", password: "" };
  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    defaultValues,
    loginUser
  );

  useEffect(() => {
    if (isServerError) {
      reset();
    }
  }, [isServerError]);

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
// If the person registered as EE, then loginPage should request the name of the student and display view Graduates
        <label>
          Enter Student's First Name:{" "}
          <input
            type="text"
            name="student first_name"
            value={formData.first_name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Enter Student's Last Name:{" "}
          <input
            type="text"
            name="student first_name"
            value={formData.last_name}
            onChange={handleInputChange}
          />
        </label>

        {isServerError ? (
          <p className="error">Incorrect credentials.<br/>Please try again.</p>
        ) : null}
        <Link to="/register" className="register">Register here.</Link>
        <button>Login!</button>
      </form>
    </div>
  );
};

export default LoginPage;


// If the person registered as EE, then loginPage should request the name of the student and display view Graduates