import { useState } from 'react';
import noteContext from './noteContext';


const NoteState = (props)=>{

    const s1 = {
        "name":"jamil",
        "class":"12a"
    }

    const [state,setState]  = useState(s1);
    const update = ()=>{
        setTimeout(() => {
            setState({
                "name":"zubair",
                "class":"7a"
            })
        }, 1000);
    }

    return(
        <noteContext.Provider value={{state:state, update:update}} >
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState