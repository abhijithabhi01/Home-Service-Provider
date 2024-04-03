import React, { useEffect, useState } from 'react';
import { FaAddressCard, FaBriefcase, FaCheck, FaDollarSign, FaEnvelope, FaFlag, FaLocationArrow, FaLock, FaMobile, FaNotesMedical, FaPhone, FaRegObjectUngroup, FaStickyNote, FaTimes, FaUser } from 'react-icons/fa';
import Spinner from 'react-bootstrap/Spinner'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userRegisterAPI, workerRegisterAPI } from '../../Services/allAPI';
import userlogo from '../../images/user-logo.jpg'

const SignUp = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [preview, setpreview] = useState("")
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const [who, setWho] = useState('')
    const [loading, setLoading] = useState(false)
    const [worker, setworker] = useState(false)
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
       
        // Update worker state based on who state
        if (who === 'User') {
            setworker(false);
        } else {
            setworker(true);
        }
    }, [who]);

    const handleSelectChange = (event) => {
        setWho(event.target.value);
    };
    // console.log(worker);
    const handleStateChange = (event) => {
        setUserDetails({
            ...userDetails,
            state: event.target.value
        })
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
    useEffect(() => {
        if (userDetails.userimage) {
            setpreview(URL.createObjectURL(userDetails.userimage))
        }
    }, [userDetails.userimage])

    // Registration

    // console.log(userdata);
    // register
    const handleuserregister = async (e) => {

        e.preventDefault()
        const { name, address, contactnumber, email, password ,userimage} = userDetails
        if (!name || !address || !contactnumber || !email || !password || !userimage) {
            toast.info('please fill the form completely')
        }
        else {
            const reqHeader = {
                "Content-Type": "multipart/form-data",

            };
            setLoading(true)
            //api call
            const result = await userRegisterAPI(userDetails, reqHeader)
            if (result.status == 200) {
                setLoading(false)
                toast.success('Registration success')
                console.log(result);
                setUserDetails({
                    name: "",
                    address: "",
                    contactnumber: "",
                    email: "",
                    password: "",
                    userimage: ""
                })
                setpreview("")

            }
            else {
                toast.error(result.response.data)
                setLoading(false)
                setUserDetails({
                    name: "",
                    address: "",
                    contactnumber: "",
                    email: "",
                    password: "",
                    userimage: ""
                })
                setpreview("")
                console.log(result.response.data);
            }

        }
    }


    // worker register
    const handleworkerregister = async (e) => {

        e.preventDefault()
        const { name, address, contactnumber, email, password, state, district, worktype, description, price, organisation,userimage } = userDetails
        if (!name || !address || !contactnumber || !email || !password || !state || !district || !worktype || !description || !price || !organisation || !userimage) {
            toast.info('please fill the form completely')
        }
        else {
            const reqHeader = {
                "Content-Type": "multipart/form-data",

            };
            setLoading(true)
            //api call
            const result = await workerRegisterAPI(userDetails, reqHeader)
            if (result.status == 200) {
                setLoading(false)
                toast.success('Registration success')
                console.log(result);
                setUserDetails({
                    name: "",
                    address: "",
                    contactnumber: "",
                    email: "",
                    password: "",
                    userimage: "",
                    state: '',
                    district: '',
                    worktype: '',
                    description: '',
                    price: '',
                    organisation: ''

                })

            }
            else {
                toast.error('Registration failed')
                setLoading(false)
                setUserDetails({
                    name: "",
                    address: "",
                    contactnumber: "",
                    email: "",
                    password: "",
                    userimage: "",
                    state: '',
                    district: '',
                    worktype: '',
                    description: '',
                    price: '',
                    organisation: ''

                })

                console.log(result);
            }

        }
    }
    console.log(userDetails);
    return (

        <>





            <form className="sign-up-form" style={{ marginTop: worker ? '600px' : '100px' }}>


                <h2 className="title">Sign Up</h2>


                <div className='input-field'>
                    <div className='mt-4 ms-1 text-light'>I'M A</div>
                    <select
                     
                        aria-label="select"
                        value={who} // Set the value attribute to the state variable
                        onChange={handleSelectChange} // Attach event handler to capture changes
                    >
                        <option value="">Select option</option>
                        <option value="User">User</option>
                        <option value="Worker">Worker</option>
                    </select>
                </div>
                <div className='ms-3'>
                    <label for="file" class="custum-file-upload">

                        <div class="addimage" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                            <img src={preview ? preview : `${userlogo}`} alt="" style={{ height: '150px', width: '150px', borderRadius: '50%', border: '5px solid black' }} />
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
                <div className="input-field">
                    <span className="fIcon"><FaAddressCard /></span>
                    <textarea
                        name="address"
                        placeholder="Address"
                        value={userDetails.address}
                        onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })}
                        style={{ resize: 'none', overflow: 'hidden', width: '100%', minHeight: '50px', border: 'none' }}
                    />

                </div>
                <div className="input-field">
                    <span className="fIcon"><FaMobile /></span>
                    <input placeholder="contact number" name="Address" type="text"
                        value={userDetails.contactnumber}
                        maxLength={'10'}
                        onChange={(e) => setUserDetails({ ...userDetails, contactnumber: e.target.value })}
                        
                    />
                </div>
                <div className="input-field">
                    <span className="fIcon"><FaEnvelope /></span>
                    <input placeholder="Email" name="email" type="email"
                        value={userDetails.email}
                        onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                    />
                </div>
                {who === 'Worker' && (
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
                    </div>)}
                {who === 'Worker' && (
                    <div className="input-field">
                        <span className="fIcon"><FaStickyNote /></span>
                        <input placeholder="Description" name="Address" type="text"
                            value={userDetails.description}
                            onChange={(e) => setUserDetails({ ...userDetails, description: e.target.value })}
                        />
                    </div>)}
                {who === 'Worker' && (
                    <div className='input-field'>
                             <span className="fIcon"><FaFlag /></span>
                        <select
                        
                            aria-label="select"
                            value={userDetails.state} // Set the value attribute to the state variable
                            onChange={handleStateChange} // Attach event handler to capture changes
                        >
                            <option value="">Select State</option>
                            <option value="kerala">Kerala</option>

                        </select>
                    </div>)}
                {who === 'Worker' && (
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
                    </div>)}
                {who === 'Worker' && (
                    <div className="input-field">
                        <span className="fIcon"><FaDollarSign/></span>
                        <input type="text" name="password" placeholder="Price"
                            value={userDetails.price}
                            onChange={(e) => setUserDetails({ ...userDetails, price: e.target.value })}
                        />
                    </div>)}
                {who === 'Worker' && (
                    <div className="input-field">
                        <span className="fIcon"><FaRegObjectUngroup /></span>
                        <input type="text" name="password" placeholder="organisation"
                            value={userDetails.organisation}
                            onChange={(e) => setUserDetails({ ...userDetails, organisation: e.target.value })}
                        />
                    </div>)}
                <div className="input-field">
                    <span className="fIcon"><FaLock /></span>
                    <input type="password" name="password" placeholder="password"
                        value={userDetails.password}
                        onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                    />
                </div>


                {worker ?

                    <button type="submit"
                        onClick={handleworkerregister}
                        className="btn btn-primary btn-block mt-2 iBtn"

                    >
                        {loading ? <Spinner animation="border" variant="info" /> : "Sign Up"}
                    </button>
                    : <button type="submit"
                        onClick={handleuserregister}
                        className="btn btn-primary btn-block mt-2 iBtn"

                    >
                        {loading ? <Spinner animation="border" variant="info" /> : "Sign Up"}
                    </button>}





            </form>






















            <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover={false}
theme="colored"
style={{marginTop:'100px'}}
/>

            {/* loader */}
            {/* <div class="loader"
        style={{
        
        margin:'-350px 0px 0px 350px'
        }}
        >
    <div class="bar1"></div>
    <div class="bar2"></div>
    <div class="bar3"></div>
    <div class="bar4"></div>
    <div class="bar5"></div>
    <div class="bar6"></div>
    <div class="bar7"></div>
    <div class="bar8"></div>
    <div class="bar9"></div>
    <div class="bar10"></div>
    <div class="bar11"></div>
    <div class="bar12"></div>
</div> */}
        </>

    );
};

export default SignUp;