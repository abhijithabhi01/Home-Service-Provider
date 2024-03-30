import React, { useEffect, useState } from 'react'
import { FaAddressCard, FaBriefcase, FaCheck, FaDollarSign, FaEnvelope, FaFlag, FaLocationArrow, FaLock, FaMobile, FaNotesMedical, FaPhone, FaRegObjectUngroup, FaStickyNote, FaTimes, FaUser } from 'react-icons/fa';

import img from '../../images/Worker-logo-design-template-vector-removebg-preview.png'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './profile.css'

function WorkerProfile() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [preview, setpreview] = useState("")
    const [userDetails, setUserDetails] = useState({
        name: '',
        address: '',
        contactnumber: '',
        email: '',
        password: '',
        userimage: '',
        state: '',
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

  return (
    <>
    <div className='profile-box'>
        <div className='d-flex align-items-end justify-content-end'>
           <button onClick={handleShow} type='button' className='editbtn'><i class="fa-solid fa-pencil"></i></button>
        </div>
        <div className='box-1'>
       <div className='box-11'>
            <img src={img} alt="" 
                style={{height:'380px',width:'380px',border:'2px solid black',borderRadius:'50%'}}
                />
                <h2>USERNAMER</h2>
       </div>
       <div className='box-2'>
           
           <h3>kuyfiuy</h3>
           <h3>kuyfiuy</h3>
           <h3>kuyfiuy</h3>
           <h3>kuyfiuy</h3>
           <h3>kuyfiuy</h3>
           <h3>kuyfiuy</h3>
           <h3>kuyfiuy</h3>
           
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
    
                                <img src={preview ? preview : `${img}`} alt="" style={{ height: '150px', width: '150px', borderRadius: '50%', border: '5px solid black' }} />
                            </div>
                            <input id="file" type="file" onChange={(e) => setUserDetails({ ...userDetails, userimage: e.target.files[0] })} style={{ display: 'none' }} />
    
                        </label>
                    </div>
    
                    <div className="input-field">
                        <span className="fIcon"><FaUser /></span>
                        <input placeholder="Full Name" name="firstName" type="text"
                            value={userDetails.name}
                            onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                        />
                    </div>
        </div>







        </Modal.Body>
        <Modal.Footer>
          <button className='cancelbtn' onClick={handleClose}>
            Cancel
          </button>
          <button className='updatebtn'>Update</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default WorkerProfile