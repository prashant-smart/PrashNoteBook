import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import './navbar.css'
import DarkModeContext from "../context/dark mode/darkModeContext";
const AddNote = (props) => {
  const darkModeContext = useContext(DarkModeContext);
  const { darkMode } = darkModeContext;
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNotes] = useState({ title: "", discription: "", tag: "" });
  const onChange = (e) => {
    setNotes({ ...note, [e.target.name]: e.target.value }); //all properties are same but those prperty that specified after "," will add is not present or update
  };
  const handleChange = (e) => {
    e.preventDefault();
    addNote(note.title, note.discription, note.tag);
    setNotes({ title: "", discription: "", tag: "" });
    props.showAlert("Added Successfully","success");
  };

  return (
    <div className={`my-3`} >
      <h1 className={`text-${(darkMode==="light")? "dark":"light"}`}>Add a note</h1>
      <form>
        <div className="form-group my-2">
          <label htmlFor="title" className={`text-${(darkMode==="light")? "dark":"light"}`}>Title</label>
          <input
            id="title"
            name="title"
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter Title Here"
            onChange={onChange}
            minLength={5}
            required
            value={note.title}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="discription" className={`text-${(darkMode==="light")? "dark":"light"}`}>Description</label>
          <input
            type="text"
            value={note.discription}
            className="form-control"
            id="discription"
            name="discription"
            aria-describedby="emailHelp"
            placeholder="Type Description Here"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="tag" className={`text-${(darkMode==="light")? "dark":"light"}`}>Tag</label>
          <input
          value={note.tag}
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            aria-describedby="emailHelp"
            placeholder="Type tag Here"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>

        <button
          type="submit"
          disabled={note.title.length < 5 || note.discription.length < 5}
          className={`btn btn-hover btn-primary my-2 `}
          onClick={handleChange}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
