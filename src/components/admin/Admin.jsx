import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation

function Admin() {
  return (
    <div>
      <h1  style={{ display: 'flex', justifyContent: 'center',marginTop:"4%",fontWeight:"bolder" }}>Welcome, <span className='text-white'>Admin</span></h1>
      <div style={{ display: 'flex', justifyContent: 'center',marginTop:"10%" }}>
        <div>
          <Link to="/workerlist">
            <button className="btn btn-success fs-4 fw-bolder me-5">View Workers</button>
          </Link>
        </div>
        <div style={{ marginLeft: '10px' }}>
          <Link to="/userlist">
            <button className="btn btn-dark fs-4 fw-bolder">View Users</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Admin;
