import React, { useContext,useState } from "react";
import FormInput from "./FormInput/FormInput";
import { useHistory } from "react-router-dom";
import DarkModeContext from "../context/dark mode/darkModeContext";
const Signup = (props) => {
  const darkModeContext = useContext(DarkModeContext);
  const { darkMode } = darkModeContext;
  let history = useHistory();
  const [signupDetails, setsignupDetails] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { email, password, displayName, confirmPassword } = signupDetails;
  const matchPassword = () => {
    return( password === confirmPassword &&
      password.length>5 &&
      email !== "" &&
      displayName !== "")
      ? false
      : true;
  };
  const handlChange = (e) => {
    setsignupDetails({ ...signupDetails, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://prashnotebookbackend.herokuapp.com/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: displayName,
        email: email,
        password: password,
      }),
    });
    const json = await response.json();
    if (json.sucess) {
      setsignupDetails({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      localStorage.setItem("token", json.authToken);
      history.push("/");
      props.showAlert("Account Created Successfully","success");
    } else props.showAlert("Wrong Details","danger");
  };

  return (
    <div className="sign-up mx-5 container my-5">
      <h2 className={`title text-${(darkMode==="light")? "dark":"light"}`}> I Do Not Have Account</h2>
      <span className={`text-${(darkMode==="light")? "dark":"light"}`}>Sign Up With Your Email and Password</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          onChange={handlChange}
          label="Display Name"
          required
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={handlChange}
          label="Email"
          required
          minLength={5}
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={handlChange}
          label="Password"
          minLength={5}
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handlChange}
          label="Confirm Password"
          minLength={5}
          required
        />
        <button
          disabled={matchPassword()}
          type="submit"
          className={`btn  btn-outline-${darkMode==="light"?"dark":"light"} btn-m`}
        >
          {" "}
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
