import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
function NoteItem(props) {
  const context = useContext(noteContext);

  const { deleteNote } = context;
  const { note, updateNote } = props;

  return (
    <div className="col-md-3 my-2">
    <div className="card">
    {(note.tag)? 
      <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{"zIndex":"1","left":"90%"}}>Tag: {(note.tag.length)>10? note.tag.substr(0,10)+"...":note.tag}
      <span class="visually-hidden">unread messages</span>
      </span>
      :""}
    
        <div className="card-body">
          <h5 className="card-title">
            <strong>Title: </strong>
            {note.title}
          </h5>
          <hr />
          <p className="card-text">{note.discription}</p>
          <i
            className="fas fa-trash-alt mx-2"
            onClick={() => {
              deleteNote(note._id);
              props.showAlert("Deleted Successfully", "success");
            }}
          ></i>
          <i
            className="fas fa-edit mx-3"
            onClick={() => {
              updateNote(note);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
