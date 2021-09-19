import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const initialNotes = []
  const [notes, setNotes] = useState(initialNotes);

  //Get all notes 
  const getAllNotes = async(str) => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"),
      },
    });
    let json = await response.json();
    if(str!==""){
      json=json.filter((elm)=>{
        return  elm.title.includes(str);
      })
    }
    // console.log(json);
    setNotes(json);
    };





  // Delete a note
  const deleteNote = async(id) => {

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"),
      }
    });
    const json=response.json();
    console.log(json );


    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit a note
  const editNote = async (id, title, discription, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"),
      },
      body: JSON.stringify({title, discription, tag}),
    });
    const json = await response.json();
    // console.log(json.note);


    const newNotes=
    notes.map((note) => {
      if (note._id === id) {
        return json.note;
      }
      return note;
    });
    setNotes(newNotes);
  };

  //Add a new note
  const addNote = async(title, discription,tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"),
      },
      body: JSON.stringify({title,discription,tag}),
    });
    const json =await response.json();
    // console.log(json);
    
    setNotes(notes.concat(json)); //contact return a array after push the new note
  };

  return (
    <NoteContext.Provider value={{getAllNotes,notes, deleteNote, addNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
