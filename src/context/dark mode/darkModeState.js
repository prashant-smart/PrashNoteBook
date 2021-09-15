import React, { useState } from "react";
import DarkModeContext from "./darkModeContext";

const DarkModeState = (props)=>{
  if(!localStorage.getItem("darkMode")){
      localStorage.setItem("darkMode","light");
  }
    const [darkMode, setdarkMode] = useState(localStorage.getItem("darkMode"));
    document.getElementsByTagName("BODY")[0].style.backgroundColor=(darkMode==="dark")?"rgb(41, 43, 44)":"white";
    const toggleDarkMode =()=>{
        if(localStorage.getItem("darkMode")==="dark"){
            setdarkMode("light")
            localStorage.setItem("darkMode","light");
        }
        else{
            setdarkMode("dark");
            localStorage.setItem("darkMode","dark");
        }
        document.getElementsByTagName("BODY")[0].style.backgroundColor=(darkMode==="dark")?"rgb(41, 43, 44)":"white";
    }
    return (
      <DarkModeContext.Provider value={{darkMode,toggleDarkMode}}>
        {props.children}
      </DarkModeContext.Provider>
    );
  };
  export default DarkModeState;