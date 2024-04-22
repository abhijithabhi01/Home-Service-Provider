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
import { approveUserWorkRequestAPI, declineUserWorkRequestAPI, deletePackageAPI, deleteworkersAPI, getAllPackagesAPI, getworkerrequestAPI, startWorkAPI, workdoneAPI } from '../../Services/allAPI';
import AddPackage from '../AddPackage/AddPackage';
import { BASE_URL } from '../../Services/BASE_URL';

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
  const [myPackages,setmyPackages] = useState([])
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

  // useEffect(() => {
  //   FetchWorkRequest();
  // }, [existingUser,workerid]); // Empty dependency array, so it runs only once when the component mounts

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

  // handle approve work
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
// start work
const handlestartwork = async(bookingid)=>{
  const id = bookingid
const  reqBody = {}
  if(token){
    const reqHeader = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
   
    const result = await startWorkAPI(id,reqBody,reqHeader);
    if(result.status == 200){
      toast.success(`You Have Started the Work`)
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
 
 //console.log(workrequests);
 const handlecompletework = async(bookingid)=>{
  const id = bookingid
const  reqBody = {}
  if(token){
    const reqHeader = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
   
    const result = await workdoneAPI(id,reqBody,reqHeader);
    if(result.status == 200){
      toast.success(`You Have Completed the Work`)
    }
  }
  else{
    console.log(`Session timed out,Please Login`);
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

useEffect(()=>{
  FetchWorkRequest();
},[handleapproveUserRequest,handledeclineUserRequest])

useEffect(()=>{
  fetchPackages()
},[existingUser])

const fetchPackages = async()=>{

  const result = await getAllPackagesAPI(workerid)
  if(result.status == 200){
  setmyPackages(result.data)
  }
  else{
    // toast.error(`Error While Fetching Packages`)
    console.log(result);
  }
}

const handleDeletePackage = async(id)=>{
if(token){
  const reqBody = {}
  const reqHeader = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  const result = await deletePackageAPI(id,reqBody,reqHeader)
  if(result.status == 200){
    toast.success(`Package Deleted Successfully`)
    fetchPackages()
    }
    else{
      toast.error(`Please Try Again later`)
      console.log(result);
    }
}
}

console.log(myPackages);

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
            <h3 className='mt-4 ms-2'>{existingUser.name}</h3>
          </div>
          <div className='d-flex'>
          
            <h5 className='m-2'>
              {' '}
              {/* <a href='/' style={{ textDecoration: 'none', color: 'white', cursor: 'pointer' }}>
                Home
              </a> */}
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
                    <th className='name' >Employer Name</th>
                    <th className='date'>Date & Time</th>
                    <th className='location'>Location</th>
                    <th  style={{width:'500px'}}>Service</th>
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
                        <td className='status'>
                       <p> {request.package} </p>
                        <p>  {request.service} </p>
                        
                       
                        
                        </td>
                        <td className='status'>{request.price}</td>
                        
                        <td className='status'>{request.workstatus}</td>
                       {request.workstatus === 'work completed' ?
                       <td>You Have Completed the work

<div className="loader2 mb-2"></div>
                       </td>
                       
                       :
                       <td className='status'>
                         {request.status && request.workstatus == 'work Started'  ?
                      <>
                      

                           <p>Have You Completed the  Work</p>
                                                     
<div className="loader00">
  <div className="loading00"></div>
</div>
                           <button onClick={(e)=>handlecompletework(request._id)} className='approvebtn bg-primary'>Yes</button>

                      </>
                         :
                         <>
                           <button onClick={(e)=>handleapproveUserRequest(request._id)} className='approvebtn'>Approve</button>
                          <button  onClick={(e)=>handledeclineUserRequest(request._id)} className='declinebtn'>Decline</button>
                      {request.status &&  
                     <>
                         <p>Have You Started Work</p>
                           <button onClick={(e)=>handlestartwork(request._id)} className='approvebtn bg-primary'>Yes</button>
                     </>
                         
                         }
                    </>
                         }
                        </td>}
                        <td className='review'>{request.review?request.review:'no review yet'}</td>
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
          
          <Tab eventKey='Package' title='Add Package'>
          <AddPackage/>
          </Tab>
          <Tab eventKey="mypackages" title="My Packages">
              { myPackages.length>0 ?     <div className='worklistdiv excarddiv d-flex' >
                     
                     {myPackages.map((mypackages, index) => (
                      <div className="card" key={index} style={{ flexGrow: 1, flexBasis: '200px', maxWidth: '210px', height: '340px', margin: '10px 20px 10px 20px', position: 'relative', borderRadius: 'px', backgroundColor: '#103253', boxShadow: 'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px' }}>
                          <img src={`${BASE_URL}/uploads/${mypackages.workimage}`} className="card-img-top" alt="Service" style={{ height: "200px", width: "100%" }} />
                          <div className="card-body">
                              <h5 className="card-title" style={{ color: 'white' }}>{mypackages.package}</h5>
                              <h6 className="card-title" style={{ color: 'white' }}>{mypackages.description}</h6>
                              <h6 className="card-title" style={{ color: 'white' }}>${mypackages.price}</h6>
                              <p className="card-text" style={{ color: 'white', overflow: 'hidden' }}>{mypackages.service}</p>
                              <div className="viewbtbdiv">
                         
                                      <button onClick={(e)=>handleDeletePackage(mypackages._id)} className="btn btn-danger viewbtn" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', backgroundColor: 'rgb(247, 236, 255)', color: 'black' }}>Delete</button>
                          
                          
                              </div>
                          </div>
                      </div>
                  ))}
                 </div>
                :
                <div className='worklistdiv excarddiv' style={{display:'flex',alignItems:'center',justifyContent:'center'}} >
                  <h3 style={{color:'white',marginTop:"-100px"}}>No Packages Added</h3>
                  </div>
                }
                    </Tab>
          <Tab eventKey="settings" title="Settings">
          <div style={{display:'flex',height:'70vh',alignContent:'center',justifyContent:'center',textAlign:'center'}}>
                    <div style={{display:'flex',flexDirection:'column', width:'500px',alignContent:'center',justifyContent:'center'}}>
                    <h3 className='text-light'>Logout from this Account</h3>
                      <button onClick={handleShow3} className='m-2 text-danger'  style={{cursor:'pointer',padding:'10px',margin:'10px' }}>Logout</button>
                      <h3 className='text-light'>Delete the  Account</h3>
                      <button onClick={handleShow4} className='m-2 text-danger'  style={{cursor:'pointer',padding:'10px',margin:'10px' }}>Delete Account</button>
                   </div>
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
