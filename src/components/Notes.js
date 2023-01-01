import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import { Addnote } from "./Addnote";
import Noteitem from "./Noteitem";


const Notes = () => {
  const context = useContext(noteContext);
  const { notes,addNote } = context;
  return (
    <>
    <Addnote/>
    <div className="row my-3">
      <h1>Your Note</h1>
      {notes.map((note) => {
        return <Noteitem key={note._id} note={note} />;
      })}
    </div>
    </>
  );
};

export default Notes;
