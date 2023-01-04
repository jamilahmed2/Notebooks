import React,{useState} from 'react'
import {  useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"",email:"",password:""})
  let navigate = useNavigate();
  const url = 'http://localhost:5000'

  // signup handle
  const handleSignup = async (e)=>{
      e.preventDefault();
      // API CALL
    const {name,email,password} = credentials;
  const response = await fetch(`${url}/api/auth/createuser`, {
    // destructuring
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name,email,password})
    });
    const json = await response.json(); 
    console.log(json)
    if(json.success){
      // save the authtoken and redirect
      localStorage.setItem('token',json.authtoken)
      props.showAlert("Account Creadted Successfully","success")
      navigate('/login')
    }else{
      props.showAlert("Invalid Credentials","danger")
    }
  }

  const onChange =(e)=>{
      setCredentials({...credentials, [e.target.name]: e.target.value})
  }

  return (
    <div>
       <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp"onChange={onChange} minLength={3} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp"onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={6} required/>
          </div>
          <button type="submit" className="btn btn-primary">Sign up</button>
        </form>
    </div>
  )
}

export default Signup