import React, { useEffect, useState } from 'react';
import './navbar.css'
import logo from '../../images/Worker-logo-design-template-vector-removebg-preview.png'
import { getallUsers, getallUsersAPI } from '../../Services/allAPI';

function Navbar() {
  const [token, setToken] = useState('');
  const [logger, setLogger] = useState('');
  const [existingUser, setExistingUser] = useState({});
  const [allUsers,setAllUsers] = useState([])

  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem("Activeuser"));
    if (currentUser) {
      setExistingUser(currentUser);
      setLogger(currentUser.logger);
      setToken(sessionStorage.getItem("token"));
      FetchUser()
    }
  }, []);

  const FetchUser = async()=>{
    const result = await getallUsersAPI()
  setAllUsers(result.data)
  }
 //console.log(allUsers);
  return (
    <>
      {token ? (
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
              {logger === 'user' ? (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="/user-dashboard"><i className="fas fa-tachometer-alt"></i>Dashboard</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="view-service"><i className="far fa-address-book"></i> Book Now</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="view-service"><i className="far fa-clone"></i>Categories</a>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <a className="nav-link" href="/worker-dashboard"><i className="fas fa-tachometer-alt"></i>Dashboard</a>
                </li>
              )}
            </ul>
          </div>
        </nav>
      ) : (
        <nav className="navbar navbar-expand-custom navbar-mainbg">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className='m-3 text-light d-flex '>
              <img src={logo} alt="logo" style={{height:'50px',width:'50px',borderRadius:"10px"}}/>
              <h3 className='mt-2 ms-2'>Home Service</h3>
            </div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="/"><i className="fas fa-home-alt"></i>Home</a>
              </li>
             
              <li className="nav-item">
                <a className="nav-link" href="/login"><i className="fas fa-user"></i>Login</a>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </>
  );
}

export default Navbar;
