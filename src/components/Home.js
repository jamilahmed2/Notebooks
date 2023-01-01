import React ,{useContext}from "react";
import NoteState from "../context/notes/NoteState";
import noteContext from "../context/notes/noteContext";

export const Home = () => {
  const context = useContext(noteContext);
  const {notes,setNotes} = context
  return (
    <>
      <div className="container">
        <h1>Add a Note</h1>
      </div>

      <div className="container">
        <form>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" for="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>

      <div className="container">
        <h1>Your Note</h1>
        {notes.map((note)=>{
          return note.title;
        })}
      </div>
    </>
  );
};
