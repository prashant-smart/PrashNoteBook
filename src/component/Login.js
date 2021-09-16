import React,{useState,useContext} from 'react';
import {useHistory} from 'react-router-dom';
import FormInput from './FormInput/FormInput';
import DarkModeContext from "../context/dark mode/darkModeContext";

const Login = (props) => {
    const [details, setdetails] = useState({email:"", password:""})
    const {email, password}=details;
    let history =useHistory();
    const darkModeContext = useContext(DarkModeContext);
    const { darkMode } = darkModeContext;
    const handleChange=(e)=>{
        setdetails({...details,[e.target.name]:e.target.value});
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch("/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, password:password})
        });
        const json = await response.json()
        if(json.sucess){
            setdetails({email:"", password:""});
            localStorage.setItem('token', json.authToken);
            history.push('/');
            props.showAlert("Logged In Successfully","success");
        }
        else props.showAlert('Worng Details',"danger");
    }
    const matchPassword =()=>{
        return( password!=="" && email!=="")?false:true;
    }
  return (
      <div className="mx-5 my-5 container ">
      <h2 className={`text-${(darkMode==="light")? "dark":"light"}`}>I already have an account</h2>
      <span className={`text-${(darkMode==="light")? "dark":"light"}`}>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          handleChange={handleChange}
          value={email}
          label="Email"
          required
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          handleChange={handleChange}
          label="Password"
          required
        />
        <button disabled={matchPassword()} type="submit" className={`btn  btn-outline-${darkMode==="light"?"dark":"light"} btn-m`}> Login </button>
      </form>
      </div>
  );
};

export default Login;
