import React, { useEffect, useState } from 'react'
import { FaAddressCard, FaBriefcase, FaCheck, FaDollarSign, FaEnvelope, FaFlag, FaLocationArrow, FaLock, FaMobile, FaNotesMedical, FaPhone, FaRegObjectUngroup, FaStickyNote, FaTimes, FaUser } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal';
import './profile.css'
import { UserprofileupdateAPI, getallUsersAPI, getallworkersAPI, workerprofileupdateAPI } from '../../Services/allAPI';
import { BASE_URL } from '../../Services/BASE_URL';


function WorkerProfile() {
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
    // address: '',
    contactnumber:'',
    // email: '',
    // password: '',
    userimage:'',
    // state: '',
    district: '',
    worktype: '',
    description: '',
    price: '',
    organisation: ''
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
    const result = await getallworkersAPI();
    setAllUsers(result.data);
  };

  const FetchCurrentUser = () => {
    const user = allUsers.find((user) => user._id == existingUser.existingUser._id);
    setCurrentUser(user);
    if (currentUser) {
      setUserDetails({
        name: currentUser.name || '',
        contactnumber: currentUser.contactnumber || '',
        district: currentUser.district || '',
        worktype: currentUser.worktype || '',
        description: currentUser.description || '',
        price: currentUser.price || '',
        organisation: currentUser.organisation || ''
      });
    }
  };


const handleDistrictchange = (event) => {
    setUserDetails({
        ...userDetails,
        district: event.target.value
    })
};
const HandleWorktypeChange = (event) => {
    setUserDetails({
        ...userDetails,
        worktype: event.target.value
    })
};



 const handleProfileUpdate = async()=>{
    const {name,contactnumber,userimage,district,worktype,description,price,organisation} = userDetails
    const userid = currentUser._id
    if(!name || !contactnumber || !userimage || !district || !worktype || !description || !price ||!organisation){
      toast.info(`Please Fill the Profile Completely`)
    }
    else{
      if(token){
        const reqBody = userDetails
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        const result = await workerprofileupdateAPI(userid,reqBody,reqHeader)
        if(result.status == 200){
          await FetchALLUsers();
          toast.success(`Profile Updated Successfully`)
          setpreview("")
          handleClose()
        }
        else{
          toast.error(`Profile Updation Failed`)
          console.log(result);
          handleClose()
          setpreview("")
        }
      }
      else{
        toast.error(`Your Session Timed out,Please Login`)
        handleClose()
        setpreview("")

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
            <img src={currentUser ? `${BASE_URL}/uploads/${currentUser.userimage}` : 'https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg'} alt="Image unavliable"
              style={{ height: '380px', width: '380px', border: '2px solid black', borderRadius: '50%' }}
            />
            <h1 className='text-light'>{currentUser.name ? currentUser.name : "Username unavaliable"}</h1>
          </div>
          <div className='box-2 text-light'>
            <h3>{currentUser.email ? currentUser.email : "email unavaliable"}</h3>
            <h3>{currentUser.address ? currentUser.address : "Address unavaliable"}</h3>
            <h3>{currentUser.contactnumber ? currentUser.contactnumber : "contact no unavaliable"}</h3>
            <h3>{currentUser.organisation ? currentUser.organisation : "Organisation no unavaliable"}</h3>  <h3>{currentUser.worktype ? currentUser.worktype : "Worktype no unavaliable"}</h3>  
            <h3>{currentUser.description ? currentUser.description : "contact no unavaliable"}</h3> 
            <h3>{currentUser.district ? currentUser.district  : "contact no unavaliable"}</h3> 
            
         
         
           

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
              <span className="fIcon"><FaMobile /></span>
              <input placeholder="Contact Number" name="firstName" type="text"
                onChange={(e) => setUserDetails({ ...userDetails, contactnumber: e.target.value })}
                maxLength={'10'}
                value={userDetails.contactnumber}
              />
            </div>
           
            <div className='input-field'>
                       <span className="fIcon"><FaBriefcase /></span>
                        <select
                           
                            aria-label="select"
                            value={userDetails.worktype} // Set the value attribute to the state variable
                            onChange={HandleWorktypeChange} // Attach event handler to capture changes
                        >
                            <option value="">Select Worktype</option>
                         
                            <option value="Plumber">Plumber</option>
                            <option value="Electrician">Electrician</option>
                            <option value="Painter">Painter</option>
                            <option value="Interior Cleaner">Interior Cleaner</option>
                            <option value="Exterior Cleaner">Exterior Cleaner</option>
                            <option value="Carpenter">Carpenter</option>
                            <option value="Gardener">Gardener</option>
                            <option value="Laundry">Laundry</option>
                            {/* <option value="Malappuram">Malappuram</option>
                            <option value="Palakkad	">Palakkad	</option>
                            <option value="Pathanamthitta">Pathanamthitta</option>
                            <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                            <option value="Thrissur">Thrissur</option>
                            <option value="Wayanad">Wayanad</option> */}
                        </select>
                    </div>
                    <div className="input-field">
                        <span className="fIcon"><FaStickyNote /></span>
                        <input placeholder="Description" name="Address" type="text"
                            value={userDetails.description}
                            onChange={(e) => setUserDetails({ ...userDetails, description: e.target.value })}
                        />
                    </div>
                    <div className="input-field">
                        <span className="fIcon"><FaDollarSign/></span>
                        <input type="text" name="password" placeholder="Price"
                            value={userDetails.price}
                            onChange={(e) => setUserDetails({ ...userDetails, price: e.target.value })}
                        />
                    </div>
                   
                    <div className='input-field'>
                             <span className="fIcon"><FaLocationArrow /></span>
                        <select
                        
                            aria-label="select"
                            value={userDetails.district} // Set the value attribute to the state variable
                            onChange={handleDistrictchange} // Attach event handler to capture changes
                        >
                            <option value="">Select District</option>
                         
                            <option value="kerala">Alappuzha</option>
                            <option value="Ernakulam">Ernakulam</option>
                            <option value="Idukki">Idukki</option>
                            <option value="Kannur">Kannur</option>
                            <option value="Kasaragod">Kasaragod</option>
                            <option value="Kollam">Kollam</option>
                            <option value="Kottayam">Kottayam</option>
                            <option value="Kozhikode">Kozhikode</option>
                            <option value="Malappuram">Malappuram</option>
                            <option value="Palakkad	">Palakkad	</option>
                            <option value="Pathanamthitta">Pathanamthitta</option>
                            <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                            <option value="Thrissur">Thrissur</option>
                            <option value="Wayanad">Wayanad</option>
                        </select>
                    </div>
                    <div className="input-field">
                        <span className="fIcon"><FaRegObjectUngroup /></span>
                        <input type="text" name="password" placeholder="organisation"
                            value={userDetails.organisation}
                            onChange={(e) => setUserDetails({ ...userDetails, organisation: e.target.value })}
                        />
                    </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className='cancelbtn' onClick={handleClose}>
            Cancel
          </button>
          <button  onClick={handleProfileUpdate}  className='updatebtn'>Update</button>  \
         
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

export default WorkerProfile