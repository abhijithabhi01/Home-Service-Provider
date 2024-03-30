import React, { useEffect, useState } from 'react';
import './navbar.css'
import logo from '../../images/Worker-logo-design-template-vector-removebg-preview.png'
function Navbar() {
  const[token,sdetToken] = useState('')
  const[logger,setLogger] = useState()
  const[existinguser,setExistingUser] = useState({})

  useEffect(()=>{
    setExistingUser(JSON.parse(sessionStorage.getItem("Current-user")))
    setLogger(existinguser.logger)
  },[])
 console.log(existinguser);   



  return (
<>
        <nav className="navbar navbar-expand-custom navbar-mainbg">
        
          
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
             
          <div className='m-3 text-light d-flex '>
          <img src={logo} alt="logo" style={{height:'50px',width:'50px',borderRadius:"10px"}}/>
                <h3 className='mt-2 ms-2'>Home Service</h3>
              </div>

            <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <a className="nav-link" href="/"><i className="fas fa-tachometer-alt"></i>Home</a>
              </li>
             
          {logger == 'user' ?    <li className="nav-item">
                <a className="nav-link" href="/user-dashboard"><i className="fas fa-tachometer-alt"></i>Dashboard</a>
              </li> :
              <li className="nav-item">
                <a className="nav-link" href="/worker-dashboard"><i className="fas fa-tachometer-alt"></i>Dashboard</a>
              </li>}
              {logger == 'user' &&
              
                 <li className="nav-item">
                  <a className="nav-link" href="javascript:void(0);"><i className="far fa-address-book"></i> Book Now</a>
                </li>}
                {logger == 'user' &&      
                <li className="nav-item">
                  <a className="nav-link" href="view-service"><i className="far fa-clone"></i>Categories</a>
                </li>
              }
          
              {/* <li className="nav-item">
                <a className="nav-link" href="view-contact"><i className="far fa-chart-bar"></i>Contact</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="javascript:void(0);"><i className="far fa-copy"></i>Documents</a>
              </li> */}
            </ul>
          </div>
        </nav>
</>
  );
}

export default Navbar;
