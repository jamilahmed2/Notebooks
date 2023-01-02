import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  // hardcode for a moment
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);

  //   GET all notes
  const getNotes = async () => {
     // API CALL
     const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhZTQ1MzIxZTg2MWRmZTI1ZDZmZWM1In0sImlhdCI6MTY3MjM2NjI0Mn0.uVN_qQUgYBtVXYX_kG_pQkfihMOnBYx-zxuiISUFM2s'
      },
    });
    const json = await response.json() 
    console.log(json)
    setNotes(json)
  };

  //   Add a note
  const addNote = async (title, description, tag) => {
     // API CALL
     const response = await fetch(`${host}/api/notes/addnote/`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhZTQ1MzIxZTg2MWRmZTI1ZDZmZWM1In0sImlhdCI6MTY3MjM2NjI0Mn0.uVN_qQUgYBtVXYX_kG_pQkfihMOnBYx-zxuiISUFM2s'
      },
      body: JSON.stringify({title, description, tag})
    });

    console.log("Adding a new note");
    const note = {
      title: title,
      description: description,
      tag: tag,
    };
    setNotes(notes.concat(note));
  };

  //   DELETE a note
  const deleteNote = async (id) => {
    // API CALL
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhZTQ1MzIxZTg2MWRmZTI1ZDZmZWM1In0sImlhdCI6MTY3MjM2NjI0Mn0.uVN_qQUgYBtVXYX_kG_pQkfihMOnBYx-zxuiISUFM2s'
      },
      body: JSON.stringify()
    });
    const json =  response.json(); 
    console.log(json)

    console.log("Deleting note" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //   EDIT a note
  const editNote = async (id,title,description,tag) => {
    // API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhZTQ1MzIxZTg2MWRmZTI1ZDZmZWM1In0sImlhdCI6MTY3MjM2NjI0Mn0.uVN_qQUgYBtVXYX_kG_pQkfihMOnBYx-zxuiISUFM2s'
      },
      body: JSON.stringify({title, description, tag})
    });
    const json =  response.json(); 

    // logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if(element._id===id){
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <noteContext.Provider
      value={{ notes, setNotes, addNote, editNote, deleteNote, getNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
