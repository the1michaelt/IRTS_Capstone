import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext);
  const defaultValues = {
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  };
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    defaultValues,
    registerUser
  );

  return (
    <><h1>Register An Employee</h1>
      <h2>* PASSWORD: Create an unusual word or phrase with a combo <br />of at least 8 characters, numbers, and
        special characters.</h2>
      <br /><hr />
      <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange} />
        </label>
        <label>
          First Name:{" "}
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange} />
        </label>
        <label>
          Last Name:{" "}
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange} />
        </label>
        <label>
          Email:{" "}
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange} />
        </label>
        <label>
          * Password:{" "}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange} />
        </label>
         <button>Register!</button>
      </form>    <div className="page-bottom"></div>
    </div></>
  );
};

export default RegisterPage;
