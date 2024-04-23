import React, { useEffect, useState } from 'react'
import img from '../../images/Worker-logo-design-template-vector-removebg-preview.png'
import './dash.css'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import WorkerProfile from './UserProfile';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { CancelWorkAPI, addReviewAPI, deleteuserAPI, getworklistAPI, paymentAPI } from '../../Services/allAPI';
import Spinner from 'react-bootstrap/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import done from '../../images/icons8-done.svg'

function UserDash() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const [show3, setShow3] = useState(false);
    const handleClose3 = () => setShow3(false);
    const handleShow3 = (request) => {
      setSelectedRequest(request);
      setShow3(true);
  };
    const [show4, setShow4] = useState(false);
    const handleClose4 = () => setShow4(false);
    const handleShow4 = () => setShow4(true);
    const [loader,setloader] = useState(false)
    const [ispayment,setispayment] = useState(false)
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [takereview,settakereview] = useState({
      review:""
    })
    const [cardDetails, setCardDetails] = useState({
        cardno: '',
        cardname: '',
        cvv: '',
        mm:""
    });
    const handleShow2 = (request) => {
        setSelectedRequest(request);
        setShow2(true);
    };
  //  console.log(cardDetails);
    const [token, setToken] = useState('');
    const [userid, setuserid] = useState('');
    const [existingUser, setExistingUser] = useState({});
    const [worklist,setworklist] = useState([])
    const navigate = useNavigate()
    const handlelogout = ()=>{
  
        sessionStorage.removeItem("Activeuser")
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("logger")
      navigate('/')
    //   window.location.reload();
      }
      
  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem('Activeuser'));
    if (currentUser) {
      setExistingUser(currentUser.existingUser);
      setToken(sessionStorage.getItem('token'));
      setuserid(currentUser.existingUser._id); // Fix this line
    }
  }, []);
      const fetchworklist = async()=>{
        if(token){
            const reqHeader = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
              const result = await getworklistAPI(reqHeader)
              if(result.status == 200){
                setworklist(result.data)
                //console.log(result);
              }
              else{
                console.log(result);
              }
        }
        else{

        }
      }
      useEffect(()=>{
        fetchworklist()
      },[existingUser])



      const handlepay = async(id)=>{
        // console.log(id);
    const {cardno,cardname,cvv,mm} = cardDetails
if(!cardno || !cardname || !cvv || !mm){
    toast.info(`Please Fill the Details Completely`)
}
else{
    setloader(true)
    if(token){
      const reqHeader = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
        const reqBody = {}
        const result = await paymentAPI(id,reqBody,reqHeader)
       
        if(result.status == 200){
         
          setTimeout(() => {
            setispayment(true)
            fetchworklist()
            setloader(false)
            toast.success(`Payment Success`)
            handleClose2()
          
        }, 4000);
        }
        else{
          toast.error(`Something went wrong,try again later`)
        }
       
      }
      else{
        toast.error(`Something went wrong,try again later`)
      
      }

}
}


const handlesendreview = async(id)=>{
  const {review} = takereview

if(token){
  const reqHeader = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  const reqBody = new FormData()
  reqBody.append("feedback",review)
  const result = await addReviewAPI(id,reqBody,reqHeader)
  if(result.status == 200){
    toast.success(`Thanks For Giving Your Review`)
    handleClose3()
  }
  else{
    toast.error(`Something Went wrong`)
  }
}
else{
  toast.error(`Something went Wrong `)
}
}
console.log(worklist);
const handlecancelbooking = async(id)=>{
  // console.log(id);
setloader(true)
if(token){
const reqHeader = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  const reqBody = {}
  const result = await CancelWorkAPI(id,reqBody,reqHeader)
  setTimeout(() => {
    if(result.status == 200){
      fetchworklist()
  
        setloader(false)
        toast.error(`You have Deleted the Booking`)
   
    }
    else{
      setloader(false)
      toast.error(`Something went wrong,try again later`)
    } 
  }, 2000);
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
      const result = await deleteuserAPI(userid,reqBody,reqHeader)
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
                        <img src={img} alt=""
                            style={{ height: '80px', width: '80px', border: '2px solid black', borderRadius: '50%' }}
                        />
                        <h3 className='mt-4 ms-2'>{existingUser.name}</h3>
                    </div>
                    <div className='d-flex'>
                       
                        <h5 className='m-2'> <a href="/" style={{ textDecoration: 'none', color: 'white',cursor:'pointer' }}>Home</a></h5>
                    </div>

                </div>

                <div className='userprofile'>

                </div>


                <Tabs
                    defaultActiveKey="profile"
                    id="uncontrolled-tab-example"
                    className="control-tab"
                >
                    <Tab eventKey="worklist" title="Work Status">

                        <div className='worklistdiv'>
                        <table className='listtable'>
                <thead className='tablehead'>
                  <tr className='table-row'>
                    <th className='srno'>SR NO</th>
                    <th className='name' style={{width:'150px'}}>Worker Name</th>
                    <th className='date'>Date</th>
                    <th className='location' style={{maxWidth:'20px'}}>Location</th>
                    <th className='service'>Service</th>
                    <th className='status'>Charge</th>
                    <th className='status'>Status</th>
                    <th style={{width:'150px'}}>Action</th>
                    
                  </tr>
                </thead>
                {worklist.length > 0 ? (
                  <tbody className='table-body'>
                    {worklist.map((request, index) => (
                      <tr className='table-row' key={request._id}>
                        <td className='srno'>{index + 1}</td>
                        <td className='name'>{request.bookingworkername}</td>
                        <td>{request.date} {request.time}</td>

                        <td className='location'>
                          <p>{request.location}</p>
                          <a href={request.locationURL} target='blank'>
                            {request.locationURL}
                          </a>
                        </td>
                        <td className='status'>
                          
                         <p> {request.package}</p>
                         <p> {request.service}</p>
                          </td>
                        <td className='status'>{request.price}</td>
                      
                    <td className='status'>
                      
                     
                      {request.workstatus}
                    
{request.workstatus == 'work Started' &&



<div className="loader00">
  <div className="loading00"></div>
</div>



  
  }
  {request.workstatus == 'work completed' &&


<div>
<img src={done} alt="" />
</div>


}
                    </td>
                    
                        {request.payment ? (
  request.status ? (
    <td className='status'>
     <>
        Payment Done
        {/* <button className='p-2' onClick={(e) => handlecancelbooking(request._id)} style={{border:'3px solid black',backgroundColor:'red',color:'white',width:'100%'}}>Delete Booking</button> */}
        <button className='review p-2' onClick={(e)=>handleShow3(request)} style={{border:'3px solid black',backgroundColor:'#367591',color:'white',width:'100%'}}>Review</button>
     </>
    </td>
  ) : (
    <p>
      Worker has Declined the Work
      Your Payment will be Credited back to your Account</p>
  )
) : (
  <td className='status'>
    {request.status ? (
      <>
      <p>Work Accepted</p>
      
      <button className='p-2' onClick={(e) => handleShow2(request)} style={{border:'3px solid black',backgroundColor:'#4ef037',color:'white',width:'100%'}}>Pay</button>
      {/* <button className='p-2 mt-1' onClick={(e) => handlecancelbooking(request._id)} style={{border:'3px solid black',backgroundColor:'red',color:'white',width:'100%'}}>Delete Booking</button> */}
      </>
      
    ) : (
     <>
       <p>Work not Accepted</p>
        <button className='p-2' onClick={(e) => handlecancelbooking(request._id)} style={{border:'3px solid black',backgroundColor:'red',color:'white',width:'100%'}}>Delete Booking</button>
     </>
    )}
  </td>
)}



                        {/* <td className='status'>
                     
                          <button className='approvebtn'>Approve</button>
                          <button  className='declinebtn'>Decline</button>
                        </td> */}
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

                    <Tab eventKey="profile" title="Profile">
                        <WorkerProfile />
                    </Tab>
                   
                    <Tab eventKey="settings" title="Settings">
                 <div style={{display:'flex',height:'70vh',alignContent:'center',justifyContent:'center',textAlign:'center'}}>
                    <div style={{display:'flex',flexDirection:'column', width:'500px',alignContent:'center',justifyContent:'center'}}>
                      <h3 className='text-light'>Logout from this Account</h3>
                        <button onClick={handleShow} className='m-2 text-danger'  style={{cursor:'pointer',padding:'10px',margin:'10px' }}>Logout</button>
                        <h3 className='text-light'>Delete the  Account</h3>
                        <button onClick={handleShow4} className='m-2 text-danger'  style={{cursor:'pointer',padding:'10px',margin:'10px' }}>Delete Account</button>
                     </div>
                 </div>
                    </Tab>
                </Tabs>
            </div>









            <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title ><h1 >Logout</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='editform'>
            <div style={{display:'flex'}}>
          <button  className='updatebtn' onClick={handleClose}>Cancel</button>
          <button className='cancelbtn' onClick={handlelogout}>
            Logout
          </button>
          </div>
          </div>
        </Modal.Body>
      </Modal>




{/* payment modal */}

      <Modal
                show={show2}
                onHide={handleClose2}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Payment</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                  
                    <div style={{ display: 'grid', gridTemplateColumns: 'auto', gap: '0px'}}>
                    <div style={{ width: '100%', background: 'rgb(255, 250, 235)', boxShadow: '0px 187px 75px rgba(0, 0, 0, 0.01), 0px 105px 63px rgba(0, 0, 0, 0.05), 0px 47px 47px rgba(0, 0, 0, 0.09), 0px 12px 26px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1)' }}>
                   
                      <div style={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
                        <div style={{ display: 'grid', gap: '10px' }}>
                          <div>
                           
                          {selectedRequest && (
                           <>
                                <h5 style={{color:"black"}}>Worker Name: {selectedRequest.bookingworkername}</h5>
                                <div className='d-flex'>
                                  <h5 style={{color:"black"}}>Booking date:</h5>
                                  <div className='ms-2'>
                                <p style={{ fontSize: '18px', fontWeight: '600', color: '#000000' }}> {selectedRequest.date}</p>
                                {/* <p style={{ fontSize: '18px', fontWeight: '600', color: '#000000' }}>Time:<span className='ms-2'>{}</span></p> */}
                                </div>
                                </div>
                                <h5 style={{color:"black"}}>Service: {selectedRequest.service}</h5>
                                <h5 style={{color:"black"}}>Location: {selectedRequest.location}</h5>
                                <h5 style={{color:"black"}}>Price: {selectedRequest.price}</h5>
                                
                           </>
                          )  }
                          </div>
                          <hr style={{ height: '1px', backgroundColor: 'rgba(16, 86, 82, .75)', border: 'none' }} />
              
                          
              
        
              <p style={{color:'black',fontSize:'18px'}}>Payment Method : Online Payment</p>
              
             
                  <div className='payonliediv'>
              
                      
                               {/* card */}   <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-end', width: '410px', height: '200px', backgroundImage: 'radial-gradient(circle 897px at 9% 80.3%, rgba(55, 60, 245, 1) 0%, rgba(234, 161, 15, 0.9) 100.2%)', borderRadius: '10px', padding: '20px', fontFamily: 'Arial, Helvetica, sans-serif', position: 'relative', gap: '15px',margin:'0px 0px 0px 5px' }}>
                                  <h2 style={{color:"black"}}>Card Details</h2>
                            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', height: 'fit-content', position: 'absolute', top: '0', left: '0', padding: '18px' }}>
                      
                              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="23" height="23" viewBox="0 0 48 48" style={{ height: '40px', width: 'auto' }}>
                                <path fill="#ff9800" d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"></path>
                                <path fill="#d50000" d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"></path>
                                <path fill="#ff3d00" d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48C20.376,15.05,18,19.245,18,24z"></path>
                              </svg>
                            </div>
                            <div style={{ width: '100%', height: 'fit-content', display: 'flex', flexDirection: 'column' }}>
                              <label htmlFor="cardNumber" style={{ fontSize: '8px', letterSpacing: '1.5px', color: '#e2e2e2', width: '100%' }}>CARD NUMBER</label>
                              <input id="cardNumber" placeholder="XXXX XXXX XXXX XXXX" name="cardNumber" type="text" style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', color: 'white', caretColor: 'red', fontSize: '13px', height: '25px', letterSpacing: '1.5px', width: '100%' }} maxLength={'16'}
                                onChange={(e)=>setCardDetails({...cardDetails,cardno:e.target.value})}
                                value={cardDetails.cardno}
                              />
                            </div>
                            <div style={{ width: '100%', height: '45px', display: 'flex', gap: '10px' }}>
                              <div style={{ width: '60%', height: 'fit-content', display: 'flex', flexDirection: 'column' }}>
                                <label htmlFor="holderName" style={{ fontSize: '8px', letterSpacing: '1.5px', color: '#e2e2e2', width: '100%' }}>CARD HOLDER</label>
                                <input id="holderName" placeholder="NAME" type="text" style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', color: 'white', caretColor: 'red', fontSize: '13px', height: '25px', letterSpacing: '1.5px' }}  maxLength={'16'}
                                onChange={(e)=>setCardDetails({...cardDetails,cardname:e.target.value})}
                                value={cardDetails.cardname}
                                />
                              </div>
                              <div style={{ width: '30%', height: 'fit-content', display: 'flex', flexDirection: 'column' }}>
                                <label htmlFor="expiry" style={{ fontSize: '8px', letterSpacing: '1.5px', color: '#e2e2e2', width: '100%' }}>VALID THRU</label>
                                <input id="expiry" placeholder="MM/YY" type="text" style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', color: 'white', caretColor: 'red', fontSize: '13px', height: '25px', letterSpacing: '1.5px', width: '100%' }}  maxLength={'5'}
                                 onChange={(e)=>setCardDetails({...cardDetails,mm:e.target.value})}
                                 value={cardDetails.mm}
                                />
                              </div>
                              <div style={{ width: '10%', height: 'fit-content', display: 'flex', flexDirection: 'column' }}>
                                <label htmlFor="cvv" style={{ fontSize: '8px', letterSpacing: '1.5px', color: '#e2e2e2', width: '100%' }}>CVV</label>
                                <input placeholder="***" maxLength="3" id="cvv" type="password" style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', color: 'white', caretColor: 'red', fontSize: '13px', height: '25px', letterSpacing: '1.5px', width: '100%' }} 
                                 onChange={(e)=>setCardDetails({...cardDetails,cvv:e.target.value})}
                                 value={cardDetails.cvv}
                                />
                              </div>
                            </div>
                          </div>
                                  <hr style={{ height: '1px', backgroundColor: 'rgba(16, 86, 82, .75)', border: 'none' }} />
                                
                                  <div className="payments">
                                  
                                    <div className="details" style={{ display: 'grid', gridTemplateColumns: '5fr 1fr', padding: '0px', gap: '5px' }}>
                                      
                                      <span style={{ fontSize: '18px', fontWeight: '600', color: '#000000', margin: 'auto auto auto 0' }}>Total:</span>
                                      <span style={{ fontSize: '18px', fontWeight: '600', color: '#000000' }}>{selectedRequest && selectedRequest.price }</span>
                                    </div>
                                  </div>
                                  <div style={{ width: '100%', background: 'rgb(255, 250, 235)', boxShadow: '0px 187px 75px rgba(0, 0, 0, 0.01), 0px 105px 63px rgba(0, 0, 0, 0.05), 0px 47px 47px rgba(0, 0, 0, 0.09), 0px 12px 26px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1)'}}>
                              <div style={{ display:'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 10px 10px 20px', }}>
                              
                                <button  style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', height: '36px', background: 'green', boxShadow: '0px 0.5px 0.5px rgba(16, 86, 82, .75), 0px 1px 0.5px rgba(16, 86, 82, .75)', borderRadius: '7px', border: '1px solid rgb(16, 86, 82)', color: 'white', fontSize: '18px', fontWeight: '600', transition: 'all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1)' }} onClick={(e)=>handlepay(selectedRequest._id)}>Pay Now</button>
                              </div>
                            </div>
                              </div>
                              {loader && <div style={{margin:'-400px 0px 0px 35%'}}>
  
  <div className="dot-spinner">
  <div className="dot-spinner__dot"></div>
  <div className="dot-spinner__dot"></div>
  <div className="dot-spinner__dot"></div>
  <div className="dot-spinner__dot"></div>
  <div className="dot-spinner__dot"></div>
  <div className="dot-spinner__dot"></div>
  <div className="dot-spinner__dot"></div>
  <div className="dot-spinner__dot"></div>
</div>

</div>
}   
                              
                            </div>
                          
                  </div>
              
                        </div>
                  </div>
        
   
        </Modal.Body>
      
      </Modal>



      <Modal
        show={show3}
        onHide={handleClose3}
      
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title ><h1 >Give Review</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
              
        {selectedRequest && 
        (
          <>
          <h4>Enter Your Experience with our Service</h4>
        <div className="input-field m-3">
                                
                                <input type="text" 
                              
                               onChange={(e)=>settakereview({...takereview,review:e.target.value})}
                               value={takereview.review}
                                placeholder="Enter Your review" 
                                style={{width:'400px'}}
                                />
                            </div>
                            <div style={{ width: '100%', background: 'rgb(255, 250, 235)', boxShadow: '0px 187px 75px rgba(0, 0, 0, 0.01), 0px 105px 63px rgba(0, 0, 0, 0.05), 0px 47px 47px rgba(0, 0, 0, 0.09), 0px 12px 26px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1)'}}>
                              <div style={{ display:'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 10px 10px 20px', }}>
                              
                                <button  style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', height: '36px', background: 'green', boxShadow: '0px 0.5px 0.5px rgba(16, 86, 82, .75), 0px 1px 0.5px rgba(16, 86, 82, .75)', borderRadius: '7px', border: '1px solid rgb(16, 86, 82)', color: 'white', fontSize: '18px', fontWeight: '600', transition: 'all 0.3s cubic-bezier(0.15, 0.83, 0.66, 1)' }} onClick={(e)=>handlesendreview(selectedRequest._id)}>Post Review</button>
                              </div>
                            </div>
      </>
        )
        }
     
        </Modal.Body>
      </Modal>


      <Modal
        show={show4}
        onHide={handleClose4}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title ><h1>Delete Account</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='editform'>
            <h3>All your data Regarding the account will be deleted.This is an irreversible action</h3>
          <div style={{display:'flex'}}>
            <button  className='updatebtn' onClick={handleClose}>Cancel</button>
            <button className='cancelbtn' onClick={handledeleteaccount}>
              Delete Account
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
{loader && <div style={{margin:'-35% 0px 0px 45%',position:'fixed'}}>
  
  <div className="dot-spinner" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
  <div className="dot-spinner__dot"></div>
  <div className="dot-spinner__dot"></div>
  <div className="dot-spinner__dot"></div>
  <div className="dot-spinner__dot"></div>
  <div className="dot-spinner__dot"></div>
  <div className="dot-spinner__dot"></div>
  <div className="dot-spinner__dot"></div>
  <div className="dot-spinner__dot"></div>
</div>

</div>
}   
        </>
    )
}

export default UserDash