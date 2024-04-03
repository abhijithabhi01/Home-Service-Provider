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
import { approveUserWorkRequestAPI, declineUserWorkRequestAPI, deleteworkersAPI, getworkerrequestAPI, workdoneAPI } from '../../Services/allAPI';

function WorkerDash() {
  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);
  const [show4, setShow4] = useState(false);
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);
  const [token, setToken] = useState('');
  const [workerid, setWorkerid] = useState('');
  const [existingUser, setExistingUser] = useState({});
  const [workrequests, setWorkRequests] = useState([]);
  const [accepted,setAccepted]  = useState(null)
  const [rejected,setRejected] = useState()
  const [showbtn,setShowbtn] = useState()
  const [workdone,setworkdone] = useState()
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
  const  reqBody = {}
    if(token){
      const reqHeader = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
     
      const result = await approveUserWorkRequestAPI(id,reqBody,reqHeader);
      if(result.status == 200){
        toast.success(`You Have Accepted the Work`)
        setAccepted(true)
      }
    }
    else{
      console.log(`Session timed out,Please Login`);
    }
   
  }

  // handle decline
  const handledeclineUserRequest = async(bookingid)=>{
    const id = bookingid
  const  reqBody = {}
    if(token){
      const reqHeader = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
     
      const result = await declineUserWorkRequestAPI(id,reqBody,reqHeader);
      if(result.status == 200){
        toast.error(`You Have Declined the Work`)
        setRejected(true)
      }
    }
    else{
      console.log(`Session timed out,Please Login`);
    }
   
  }
 
 console.log(workrequests);
 
 const fetchworkdone = async()=>{
  if(token){
    const reqHeader = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
    const result = await workdoneAPI(workerid,reqHeader)
    if(result.status == 200){
      toast.success(`You Have Completed the Work`)
      setworkdone(true)
    }
  }
  else{

  }
 }

 // delete  account 
const handledeleteaccount = async()=>{
  if(token){
    const reqHeader = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
      const reqBody ={}
      const result = await deleteworkersAPI(workerid,reqBody,reqHeader)
      if(result.status == 200){
        toast.error(`Your Account have been Deleted`)
        setTimeout(() => {
          handlelogout()
          navigate('/')
        }, 5000);
      }
    }
}
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
                    <th className='service'>Charge</th>
                    <th className='status'>Status</th>
                    <th className='status'>Action</th>
                    <th className='status'>Review</th>
                  </tr>
                </thead>
                {workrequests.length > 0 ? (
                  <tbody className='table-body'>
                    {workrequests.map((request, index) => (
                      <tr className='table-row' key={request._id}>
                        <td className='srno'>{index + 1}</td>
                        <td className='name'>{request.bookersusername}</td>
                        <td>{request.date} {request.time}</td>
                        <td className='location'>
                          <p>{request.location}</p>
                          <a href={request.locationURL} target='blank'>
                            {request.locationURL}
                          </a>
                        </td>
                        <td className='status'>{request.service}</td>
                        <td className='status'>{request.price}</td>
                        
                        <td className='status'>{request.status ? `Work Accepted` : `Work not Accepted`}</td>
                        <td className='status'>
                     
                          <button onClick={(e)=>handleapproveUserRequest(request._id)} className='approvebtn'>Approve</button>
                          <button  onClick={(e)=>handledeclineUserRequest(request._id)} className='declinebtn'>Decline</button>
                        </td>
                        <td className='status'>{request.review}</td>
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
          {/* <Tab eventKey='contact' title='Contact'>
            Tab content for Contact
          </Tab> */}
          
          <Tab eventKey="settings" title="Settings">
                  <div style={{display:'flex',flexDirection:'column'}}>
                    <h3 className='text-light'>Logout from this Account</h3>
                      <button onClick={handleShow3} className='m-2 text-danger'  style={{cursor:'pointer',padding:'10px',margin:'10px' }}>Logout</button>
                      <h3 className='text-light'>Delete the  Account</h3>
                      <button onClick={handleShow4} className='m-2 text-danger'  style={{cursor:'pointer',padding:'10px',margin:'10px' }}>Delete Account</button>
                   </div>
                    </Tab>
        </Tabs>
      </div>

      <Modal show={show3} onHide={handleClose3}  keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <h1>Logout</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='editform'>
            <button className='updatebtn' onClick={handleClose3}>
              Cancel
            </button>
            <button className='cancelbtn' onClick={handlelogout}>
              Logout
            </button>
          </div>
        </Modal.Body>
      </Modal>


      <Modal
        show={show4}
        onHide={handleClose4}

        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title ><h1>Delete ACcount</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='editform'>
            <h3>All your data Regarding the account will be deleted.This is an irreversible action</h3>
          <div style={{display:'flex'}}>
            <button  className='updatebtn' onClick={handleClose4}>Cancel</button>
            <button className='cancelbtn' onClick={handledeleteaccount}>
              Delete
            </button>
          </div>
         
          </div>
        </Modal.Body>
      </Modal>



      <ToastContainer
position="top-right"
autoClose={2500}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover={false}
theme="colored"
/>
    </>
  );
}

export default WorkerDash;
