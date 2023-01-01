import { useState } from 'react';
import noteContext from './noteContext';


const NoteState = (props)=>{

    // hardcode for a moment
    const notesInitial = [
        {
          "_id": "63af62a815a1a66d1630d2685",
          "user": "63ae45321e861dfe25d6fec5",
          "title": "new note 2 ",
          "description": " notes app using reactjs",
          "tag": "personal",
          "date": "2022-12-30T22:47:29.628Z",
          "__v": 0
        },
        {
          "_id": "63af63a815a1a66d1630d2685",
          "user": "63ae45321e861dfe25d6fec5",
          "title": "new note 2 ",
          "description": " notes app using reactjs",
          "tag": "personal",
          "date": "2022-12-30T22:47:29.628Z",
          "__v": 0
        },
        {
          "_id": "63af6a8154a1a66d1630d2685",
          "user": "63ae45321e861dfe25d6fec5",
          "title": "new note 2 ",
          "description": " notes app using reactjs",
          "tag": "personal",
          "date": "2022-12-30T22:47:29.628Z",
          "__v": 0
        },
        {
          "_id": "63af6a8155a1a66d1630d2685",
          "user": "63ae45321e861dfe25d6fec5",
          "title": "new note 2 ",
          "description": " notes app using reactjs",
          "tag": "personal",
          "date": "2022-12-30T22:47:29.628Z",
          "__v": 0
        },
        {
          "_id": "63af6a815a61a66d1630d2685",
          "user": "63ae45321e861dfe25d6fec5",
          "title": "new note 2 ",
          "description": " notes app using reactjs",
          "tag": "personal",
          "date": "2022-12-30T22:47:29.628Z",
          "__v": 0
        },
        {
          "_id": "63af6a815a1a676d1630d2685",
          "user": "63ae45321e861dfe25d6fec5",
          "title": "new note 2 ",
          "description": " notes app using reactjs",
          "tag": "personal",
          "date": "2022-12-30T22:47:29.628Z",
          "__v": 0
        },
        {
          "_id": "63af6a815a1a668d1630d2685",
          "user": "63ae45321e861dfe25d6fec5",
          "title": "new note 2 ",
          "description": " notes app using reactjs",
          "tag": "personal",
          "date": "2022-12-30T22:47:29.628Z",
          "__v": 0
        }
      ]

      const [notes, setNotes] = useState(notesInitial)

    return(
        <noteContext.Provider value={{notes, setNotes}} >
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState