import React, { useEffect, useState } from 'react'
import { FaAddressCard, FaBriefcase, FaCheck, FaDollarSign, FaEnvelope, FaFlag, FaLocationArrow, FaLock, FaMobile, FaNotesMedical, FaPhone, FaRegObjectUngroup, FaStickyNote, FaTimes, FaUser } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal';
import './profile.css'
import { UserprofileupdateAPI, getallUsersAPI } from '../../Services/allAPI';
import { BASE_URL } from '../../Services/BASE_URL';

function UserProfile() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [token, setToken] = useState('');
  const [logger, setLogger] = useState('');
  const [existingUser, setExistingUser] = useState({});
  const [allUsers, setAllUsers] = useState([])
  const [preview, setpreview] = useState("")
  const [currentUser, setCurrentUser] = useState([])
  const [userDetails, setUserDetails] = useState({
    name:'',
    address: '',
    contactnumber:'',
    // email: '',
    // password: '',
    userimage:'',
    // state: '',
    // district: '',
    // worktype: '',
    // description: '',
    // price: '',
    // organisation: ''
  })
  useEffect(() => {
    if (userDetails.userimage) {
      setpreview(URL.createObjectURL(userDetails.userimage))
    }
  }, [userDetails.userimage])

  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem("Activeuser"));
    if (currentUser) {
      setExistingUser(currentUser);
      setLogger(currentUser.logger);
      setToken(sessionStorage.getItem("token"));
      FetchALLUsers()
    }
  }, []);

  useEffect(() => {
    if (allUsers.length > 0) {
      FetchCurrentUser();
    }
  }, [allUsers]);

  const FetchALLUsers = async () => {
    const result = await getallUsersAPI();
    setAllUsers(result.data);
  };

  const FetchCurrentUser = () => {
    const user = allUsers.find((user) => user._id == existingUser.existingUser._id);
    setCurrentUser(user);
    if (currentUser) {
      setUserDetails({
        name: currentUser.name || '',
        address: currentUser.address || '',
        contactnumber: currentUser.contactnumber || '',
      });
    }
  };

 const handleProfileUpdate = async()=>{
    const {name,address,contactnumber,userimage} = userDetails
    const userid = currentUser._id

    if(!name || !address || !contactnumber || !userimage){
      toast.info(`Please Fill the Profile Completely`)
    }
    else{
      if(token){
        const reqBody = userDetails
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        const result = await UserprofileupdateAPI(userid,reqBody,reqHeader)
        if(result.status == 200){
          await FetchALLUsers();
          toast.success(`Profile Updated Successfully`)
          handleClose()
        }
        else{
          toast.error(`Profile Updation Failed`)
          handleClose()
        }
      }
      else{
        toast.error(`Your Session Timed out,Please Login`)

      }
    }
  }

  
  return (
    <>
      <div className='profile-box'>
        <div className='d-flex align-items-end justify-content-end'>
          <button onClick={handleShow} type='button' className='editbtn'><i class="fa-solid fa-pencil"></i></button>
        </div>
        <div className='box-1'>
          <div className='box-11'>
            <img src={currentUser ? `${BASE_URL}/uploads/${currentUser.userimage}` : 'https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg'} alt=""
              style={{ height: '380px', width: '380px', border: '2px solid black', borderRadius: '50%' }}
            />
            <h1 className='text-light'>{currentUser ? currentUser.name : "Username unavaliable"}</h1>
          </div>
          <div className='box-2 text-light'>
           <div className='d-flex'>
            <h3 className='text-dark'>Email:</h3>
             <h3>{currentUser ? currentUser.email : "email unavaliable"}</h3>
             </div>
             <div className='d-flex'>
            <h3 className='text-dark'>Address:</h3>
            <h3>{currentUser ? currentUser.address : "Address unavaliable"}</h3>
            </div>
            <div className='d-flex'>
            <h3 className='text-dark'>Mob No:</h3>
            <h3>{currentUser ? currentUser.contactnumber : "contact no unavaliable"}</h3>
</div>
            {/* <h3>{currentUser?currentUser.address:"Address unavaliable"}</h3>
           <h3>{currentUser?currentUser.address:"Address unavaliable"}</h3>
           <h3>{currentUser?currentUser.address:"Address unavaliable"}</h3> */}
           

          </div>
        </div>
      </div>


      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='editform'>
            <div className='ms-3'>
              <label for="file" class="custum-file-upload">

                <div class="addimage" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                  <img src={preview ? preview : `${BASE_URL}/uploads/${currentUser.userimage}`} alt="" style={{ height: '150px', width: '150px', borderRadius: '50%', border: '5px solid black' }} />
                </div>
                <input id="file" type="file" onChange={(e) => setUserDetails({ ...userDetails, userimage: e.target.files[0] })} style={{ display: 'none' }} />

              </label>
             
            </div>
            <p>Please add a new image</p>
            <div className="input-field">
              <span className="fIcon"><FaUser /></span>
              <input placeholder="Full Name" name="firstName" type="text"
                onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                value={userDetails.name}
              />
            </div>
            <div className="input-field">
              <span className="fIcon"><FaAddressCard /></span>
              <textarea
                name="address"
                placeholder="Address"
                onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })}
                value={userDetails.address}
                style={{ resize: 'none', overflow: 'hidden', width: '100%', minHeight: '50px', border: 'none' }}
              />

            </div>
            <div className="input-field">
              <span className="fIcon"><FaMobile /></span>
              <input placeholder="contact number" name="Address" type="text"
            
                maxLength={'10'}
                onChange={(e) => setUserDetails({ ...userDetails, contactnumber: e.target.value })}
                value={userDetails.contactnumber}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className='cancelbtn' onClick={handleClose}>
            Cancel
          </button>
          <button onClick={handleProfileUpdate} className='updatebtn'>Update</button>
        </Modal.Footer>
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
  )
}

export default UserProfile