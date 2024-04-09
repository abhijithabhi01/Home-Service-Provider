import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation
import { AllusersAPI, AllworkersAPI } from '../../Services/allAPI';

function Admin() {
  const [users, setUsers] = useState([]);
  const [workers, setworkers] = useState([]);
  const getallusers = async () => {
    try {
        const result = await AllusersAPI();
        console.log(result);
        setUsers(result.data);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};
const getallworkers = async () => {
  try {
      const result = await AllworkersAPI();
      console.log(result);
      setworkers(result.data);
  } catch (error) {
      console.error('Error fetching users:', error);
  }
};
useEffect(() => {
    getallusers();
    getallworkers();
}, []);
// console.log(workers.length);
  return (
    <div>
      <h1  style={{ display: 'flex', justifyContent: 'center',marginTop:"4%",fontWeight:"bolder" }}>Welcome <span className='text-white ms-3'>Admin</span></h1>
     
     <div style={{display:'flex',flexDirection:'row',margin:'20px',backgroundColor:'grey',alignItems:"center",justifyContent:'space-evenly',padding:'20px',borderRadius:'10px'}}>
      <div style={{display:'flex',flexDirection:"column",alignContent:'center',justifyContent:'center',textAlign:'center'}}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaL1sUcnnru-2KpKIviXyxE9fBXHjiM-3irLkIaDrcNA&s" alt="" 
        style={{height:'100px',width:'100px',borderRadius:'50%'}}
        />
        <h4 className='text-center me'>{users.length} + users</h4>
      </div>
      <div style={{display:'flex',flexDirection:"column",alignContent:'center',justifyContent:'center',textAlign:'center'}}>
        <img src="https://cdn2.vectorstock.com/i/1000x1000/31/46/construction-workers-team-vector-24173146.jpg" alt="" 
        style={{height:'100px',width:'100px',borderRadius:'50%'}}
        />
        <h4 className='text-center'>{workers.length} + Workers</h4>
      </div>
      <div style={{display:'flex',flexDirection:"column",alignContent:'center',justifyContent:'center',textAlign:'center'}}>
        <img src="https://5.imimg.com/data5/SELLER/Default/2022/10/VF/GW/GY/123178175/whatsapp-image-2022-10-31-at-6-53-30-am-500x500.jpeg" alt="" 
        style={{height:'100px',width:'100px',borderRadius:'50%'}}
        />
        <h4>150+ Bookings</h4>
      </div>
      <div style={{display:'flex',flexDirection:"column",alignContent:'center',justifyContent:'center',textAlign:'center'}}>
        <img src="https://img.freepik.com/free-vector/sale-offer-label-banner-discount-offer-promotion_157027-1250.jpg" alt="" 
        style={{height:'100px',width:'100px',borderRadius:'50%'}}
        />
        <h4>50+ Packages</h4>
      </div>
     </div>
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
