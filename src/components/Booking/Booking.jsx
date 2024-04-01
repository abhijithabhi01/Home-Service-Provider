import React, { useState } from 'react'
import './booking.css'
import Navbar from '../Navbar/Navbar'
import { BASE_URL } from '../../Services/BASE_URL'
import { FaAddressCard, FaBriefcase, FaCheck, FaDollarSign, FaEnvelope, FaFlag, FaLocationArrow, FaLock, FaMobile, FaNotesMedical, FaPhone, FaRegObjectUngroup, FaStickyNote, FaTimes, FaUser } from 'react-icons/fa';

function Booking() {
    const [currentUser, setCurrentUser] = useState([])
    const[bookingDetails,setbookingDetails]=useState({
        bookersusername:"",
        bookingworkername:"",
        date:"", 
        service:"",
         location:"", 
         locationURL:""
    })
  return (
    <>
<Navbar/>

<div>
    <div>
    <div className='profile-box book-box'>
       <div className='bookbox-1'>
       <h3>Fill up the Details to Book Worker</h3>
       <div className="input-field">
                    <span className="fIcon"><FaMobile /></span>
                    <input placeholder="contact number" name="Address" type="text"
                        value={bookingDetails.bookersusername}
                     style={{width:'300px'}}
                      
                        
                    />
                </div>
                <div className="input-field">
                    <span className="fIcon"><FaMobile /></span>
                    <input placeholder="contact number" name="Address" type="text"
                        value={bookingDetails.bookingworkername}
                        
                       
                        
                    />
                </div>
                <div className="input-field">
                    <span className="fIcon"><FaMobile /></span>
                    <input placeholder="Service" name="Address" type="text"
                        value={bookingDetails.service}  
                    />
                </div>
                <div className="input-field">
                    <span className="fIcon"><FaMobile /></span>
                    <input placeholder="location" name="Address" type="text"
                        value={bookingDetails.location}  
                    />
                </div>
                <div className="input-field">
                    <span className="fIcon"><FaMobile /></span>
                    <input placeholder="location url" name="Address" type="text"
                        value={bookingDetails.locationURL}  
                    />
                </div>
       </div>
        <div className='box-1 bookbox-2'>
          <div className='box-2 text-light '>
          <img src={currentUser ? `${BASE_URL}/uploads/${currentUser.userimage}` : 'https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg'} alt="Image unavliable"
              style={{ height: '150px', width: '150px', border: '2px solid black', borderRadius: '50%' }}
            />
            <h5>{currentUser.name ? currentUser.name : "Username unavaliable"}</h5>
            <h6>{currentUser.contactnumber ? currentUser.contactnumber : "contact no unavaliable"}</h6>
            <h6>{currentUser.organisation ? currentUser.organisation : "Organisation no unavaliable"}</h6>  <h6>{currentUser.worktype ? currentUser.worktype : "Worktype no unavaliable"}</h6>  
            <h6>{currentUser.description ? currentUser.description : "description no unavaliable"}</h6> 
            {/* <h6>{currentUser.district ? currentUser.district  : "contact no unavaliable"}</h6>  */}
            
         
         
           

          </div>
        </div>
      </div>
    </div>
</div>
    </>
  )
}

export default Booking