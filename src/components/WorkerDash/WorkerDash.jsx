import React, { useEffect, useState } from 'react';
import img from '../../images/Worker-logo-design-template-vector-removebg-preview.png';
import './dash.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import WorkerProfile from './WorkerProfile';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { approveUserWorkRequestAPI, getworkerrequestAPI } from '../../Services/allAPI';

function WorkerDash() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [token, setToken] = useState('');
  const [workerid, setWorkerid] = useState('');
  const [existingUser, setExistingUser] = useState({});
  const [workrequests, setWorkRequests] = useState([]);
  const navigate = useNavigate();
  const handlelogout = () => {
    sessionStorage.removeItem('Activeuser');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('logger');
    navigate('/');
    //   window.location.reload();
  };

  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem('Activeuser'));
    if (currentUser) {
      setExistingUser(currentUser.existingUser);
      setToken(sessionStorage.getItem('token'));
      setWorkerid(currentUser.existingUser._id); // Fix this line
    }
  }, []);

  useEffect(() => {
    FetchWorkRequest();
  }, [existingUser,workerid]); // Empty dependency array, so it runs only once when the component mounts

  const FetchWorkRequest = async () => {
    if (token) {
      const reqHeader = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
      const result = await getworkerrequestAPI(workerid, reqHeader);
      setWorkRequests(result.data);
    } else {
     console.log(`Session timed out,Please Login`);
    }
  };

  const handleapproveUserRequest = async(bookingid)=>{
    const id = bookingid
    if(token){
      const reqHeader = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
      const result = await approveUserWorkRequestAPI(id,"",reqHeader);
      if(result.status == 200){
        toast.success(`You Have Accepted the Work`)
      }
    }
    else{
      console.log(`Session timed out,Please Login`);
    }
   
  }

  // handle decline
  const handledeclineUserRequest = async(bookingid)=>{
    const id = bookingid
    if(token){
      const reqHeader = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
      const result = await approveUserWorkRequestAPI(id,reqHeader);
      if(result.status == 200){
        toast.success(`You Have Accepted the Work`)
      }
    }
    else{
      console.log(`Session timed out,Please Login`);
    }
   
  }
  console.log(workrequests);
  return (
    <>
      <div>
        <div className='d-flex align-items-center justify-content-between ps-5 pe-5 p-2 nav'>
          <div className='d-flex'>
            <img
              src={img}
              alt=''
              style={{ height: '80px', width: '80px', border: '2px solid black', borderRadius: '50%' }}
            />
            <h3 className='mt-4 ms-2'>User</h3>
          </div>
          <div className='d-flex'>
            <h5 onClick={handleShow} className='m-2 text-danger' style={{ cursor: 'pointer' }}>
              Logout
            </h5>
            <h5 className='m-2'>
              {' '}
              <a href='/' style={{ textDecoration: 'none', color: 'white', cursor: 'pointer' }}>
                Home
              </a>
            </h5>
          </div>
        </div>

        <div className='userprofile'></div>

        <Tabs defaultActiveKey='profile' id='uncontrolled-tab-example' className='control-tab'>
          <Tab eventKey='worklist' title='Work Requests'>
            <div className='worklistdiv'>
              <table className='listtable'>
                <thead className='tablehead'>
                  <tr className='table-row'>
                    <th className='srno'>SR NO</th>
                    <th className='name'>Employer Name</th>
                    <th className='date'>Date</th>
                    <th className='location'>Location</th>
                    <th className='service'>Service</th>
                    <th className='status'>Status</th>
                    <th className='status'>Action</th>
                  </tr>
                </thead>
                {workrequests.length > 0 ? (
                  <tbody className='table-body'>
                    {workrequests.map((request, index) => (
                      <tr className='table-row' key={request._id}>
                        <td className='srno'>{index + 1}</td>
                        <td className='name'>{request.bookersusername}</td>
                        <td>{request.date}</td>
                        <td className='location'>
                          <p>{request.location}</p>
                          <a href={request.locationURL} target='blank'>
                            {request.locationURL}
                          </a>
                        </td>
                        <td className='status'>{request.service}</td>
                        <td className='status'>{request.status ? `Work Accepted` : `Work not Accepted`}</td>
                        <td className='status'>
                          <button onClick={(e)=>handleapproveUserRequest(request._id)} className='approvebtn'>Approve</button>
                          <button  onClick={(e)=>handledeclineUserRequest(request._id)} className='declinebtn'>Decline</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody>
                    <tr>
                      <td colSpan='7' style={{ textAlign: 'center' }}>
                        No Request Available Now
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </Tab>

          <Tab eventKey='profile' title='Profile'>
            <WorkerProfile />
          </Tab>
          <Tab eventKey='contact' title='Contact'>
            Tab content for Contact
          </Tab>
          <Tab eventKey='settings' title='Settings'>
            Tab content for settings
          </Tab>
        </Tabs>
      </div>

      <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <h1>Logout</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='editform'>
            <button className='updatebtn' onClick={handleClose}>
              Cancel
            </button>
            <button className='cancelbtn' onClick={handlelogout}>
              Logout
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default WorkerDash;
