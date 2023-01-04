import React from 'react'
import { Link , useLocation, useNavigate} from "react-router-dom";



export const Navbar = () => {

  let location = useLocation();
  let navigate = useNavigate();
  // useEffect(() => {
  //   console.log(location.pathname)
  // }, [location]);

  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate('/login')
  }
  return (
   <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container">
      <Link className="navbar-brand" to="/">Navbar</Link>
      <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
        aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav me-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/"?"active":""}`} to="/" aria-current="page">Home <span className="visually-hidden">(current)</span></Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
          </li>
        </ul>
       {!localStorage.getItem('token')?<form className="d-flex my-2 my-lg-0">
          <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
          <Link className="btn btn-primary " to="/signup" role="button">Sign up</Link>
        </form>:<button onClick={handleLogout} className='btn btn-primary'>logout</button>}
      </div>
     </div>
   </nav>
   
  );
};
