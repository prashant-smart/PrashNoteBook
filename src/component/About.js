import React, { useContext } from "react";
import DarkModeContext from "../context/dark mode/darkModeContext";

const About = () => {
    const darkModeContext = useContext(DarkModeContext);
    const { darkMode } = darkModeContext;
  return (
    <>
      <h1 className={`text-${(darkMode==="light")? "dark":"light"}`}>About Us !</h1>
      <h2 className={`text-${(darkMode==="light")? "dark":"light"}`} style={{ "text-align": "center" }}>
        Welcome To <span id="W_Name1" className={`text-${(darkMode==="light")? "dark":"light"}`}>PrashNoteBook</span>
      </h2>
      <p className={`text-${(darkMode==="light")? "dark":"light"}`}>
      <strong>PrashNoteBook </strong><i>(Quickly Capture What’s on your mind)</i>  is a secure platform that provides you a safe space where you can make notes. Quickly capture precious ideas when inspiration strikes in here, add to-do lists and photos and more. When we go to the market we forget what to buy many times, here you can make a list of what to buy and delete it later. You can save your notes as pictures for easier sharing on social media platforms. You can add infinite notes and you can keep them as long as you want and your data will be safe here.
      </p>
      <p className={`text-${(darkMode==="light")? "dark":"light"}`} style={{ "font-weight": "bold", "text-align": "center" }}>
        Thanks For Visiting Our Site
        <br />
        <br />
        <span
          style={{
            color: "blue",
            "font-size": "16px",
            "font-weight": "bold",
            "text-align": "center",
          }}
          className={`text-${(darkMode==="light")? "dark":"light"}`}
        >
          Have a nice day !
        </span>
      </p>
      <p style={{"text-align": "end"}} className={`text-${(darkMode==="light")? "dark":"light"}`}>Credit: <i>Tanishk Jain</i></p>
    </>
  );
};

export default About;
