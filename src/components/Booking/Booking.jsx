  import React, { useEffect, useState } from 'react'
  import './booking.css'
  import Navbar from '../Navbar/Navbar'
  import { BASE_URL } from '../../Services/BASE_URL'
  import { FaAddressCard, FaBriefcase, FaCheck, FaDollarSign, FaEnvelope, FaFlag, FaLocationArrow, FaLock, FaMobile, FaNotesMedical, FaPhone, FaRegObjectUngroup, FaStickyNote, FaTimes, FaUser } from 'react-icons/fa';
  import { useLocation, useNavigate, useParams } from 'react-router-dom';
  import 'react-toastify/dist/ReactToastify.css';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { bookWorkerAPI } from '../../Services/allAPI';
  import Spinner from 'react-bootstrap/Spinner';


  function Booking() {
      const wid = useParams()
      const [workerid,setWorkerid] = useState(wid.wid)
      const [currentWorker, setCurrentWorker] = useState([])
      const [token, setToken] = useState('');
      const [existingUser, setExistingUser] = useState({});
      const [dateTime, setDateTime] = useState('');
      const [date, setDate] = useState('');
      const [time, setTime] = useState('');
      const location = useLocation()
      const [loader,setloader] = useState(false)
      const {categoryWorkers} = location.state || {}
      const[bookingDetails,setbookingDetails]=useState({
          bookersusername:existingUser.name,
          bookingworkername:"",
          date:"", 
          time:"",
          service:"",
          location:"", 
          locationURL:"",
          price:""
      })
    const navigate = useNavigate()
      const handleDateChange = (e) => {
          const selectedDate = e.target.value;
          setDate(selectedDate);
          setbookingDetails({
              ...bookingDetails,
              date: selectedDate,
          });
      };
      const handleTimeChange = (e) => {
        const selectedTime = e.target.value;
        setTime(selectedTime);
        setbookingDetails({
            ...bookingDetails,
            time: selectedTime,
        });
    };
      useEffect(() => {
          const currentUser = JSON.parse(sessionStorage.getItem("Activeuser"));
          if (currentUser) {
              setExistingUser(currentUser.existingUser);
            setToken(sessionStorage.getItem("token"));
          }
          else{
  setloader(true)
          }
        }, []);
      

        const FetchCurrentWorker = () => {
          const user = categoryWorkers.find((user) => user._id == wid.wid);
          setCurrentWorker(user);
        };

        useEffect(()=>{
  FetchCurrentWorker()
    setbookingDetails({
      ...bookingDetails,
      bookersusername: existingUser.name,
      bookingworkername:currentWorker.name,
      price:currentWorker.price
  });
  
        },[existingUser])


        const hanlebookWorker = async()=>{
          
          const { bookersusername,bookingworkername,date, service,location,locationURL,price} = bookingDetails
          if(!date || !service || !location || !locationURL){
            toast.info(`Please Fill the Details Completely`)
          }
          else{
            if(token){
              const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              }
              const reqBody = new FormData()
              reqBody.append("bookersusername",bookersusername)
              reqBody.append("bookingworkername",bookingworkername)
              reqBody.append("date",date)
              reqBody.append("time",time)
              reqBody.append("price",price)
              reqBody.append("service",service)
              reqBody.append("location",location)
              reqBody.append("locationURL",locationURL)

              const result = await bookWorkerAPI(workerid,reqBody,reqHeader)
              if(result.status == 200){
                console.log(result);
                toast.success(`Worker Request Send`)
                setbookingDetails({
                  bookersusername:"",
                  bookingworkername:"",
                  date:"", 
                  time:"",
                  service:"",
                  location:"", 
                  locationURL:""
                })

                setTimeout(() => {
                  navigate('/')
                }, 2000);
              }
              
              else if(result.status == 250){
                toast.error(`Worker Already have a Booking `)
                setTimeout(() => {
                  toast.info(`Please Choose Another Date`)
                }, 1500);
              }
              else{
                // console.log(result.data);
                toast.error(`Something went wrong`)
                setbookingDetails({
                  bookersusername:"",
                  bookingworkername:"",
                  date:"", 
                  time:"",
                  service:"",
                  location:"", 
                  locationURL:""
                })
              }
            }
            else{
              toast.warning(`session Timed out,please Login`)
              setCurrentWorker({
                bookersusername:"",
                bookingworkername:"",
                date:"", 
                time:"",
                service:"",
                location:"", 
                locationURL:""
              })
            }
          }
        }
        console.log(currentWorker);
    return (
      <>
  <Navbar/>

  <div>
      <div>
        <h1 className='ms-5 mt-2 text-light'>Book Worker</h1>
      <div className='profile-box book-box d-flex align-items-center justify-content-between' >
        
        <p>
              <div className='box-1 bookbox-2' style={{background:'#113946',border:'2px solid white'}}>
                <div className='box-2 text-light' style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                <img src={currentWorker ? `${BASE_URL}/uploads/${currentWorker.userimage}` : 'https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg'} alt="Image unavliable"
                    style={{ height: '150px', width: '150px', border: '2px solid black', borderRadius: '50%' }}
                  />
               <div className='d-flex'>
                <h2>Name :</h2>
                   <h2>{currentWorker.name ? currentWorker.name : "Username unavaliable"}</h2></div>

                   <div className='d-flex'>
                <h6 style={{marginRight:'10px'}}>Contact No :</h6>
                  <h6>{currentWorker.contactnumber ? currentWorker.contactnumber : "contact no unavaliable"}</h6> </div>
                  <div className='d-flex'>
                <h6 style={{marginRight:'10px'}}>Organisation :</h6>
                  <h6>{currentWorker.organisation ? currentWorker.organisation : "Organisation no unavaliable"}</h6> 
                  </div>
                  <div className='d-flex'>
                <h6 style={{marginRight:'10px'}}>Service:</h6>
                <h6>{currentWorker.worktype ? currentWorker.worktype : "Worktype no unavaliable"}</h6>  
                </div>
                
                <div className='d-flex'>
                <h6 style={{marginRight:'10px'}}>Description :</h6>
                  <h6>{currentWorker.description ? currentWorker.description : "description no unavaliable"}</h6> 
                  </div>
                  {/* <h6>{currentWorker.district ? currentWorker     .district  : "contact no unavaliable"}</h6>  */}
                  
              
              
                
      
                </div>
              </div>
        </p>
        <p>
              <div className='bookbox-1'>
            <h3 className='text-light'>Fill up the Details to Book Worker</h3>
            
      
                      <h5 className='text-light'>Worker Name</h5>
                      <div className="input-field">
                        
                          <input placeholder="bookingworkername" name="Address" type="text"
                            value={currentWorker.name || ""}
                          
                            style={{width:'300px'}}/>
                      </div>
                      <h5 className='text-light'>Worker Charge</h5>
      <div className='input-field'>
      <input placeholder="bookingworkername" name="Address" type="text"
                            value={currentWorker.price || ""}
                          
                            style={{width:'300px'}}/>
      </div>
                      <h5 className='text-light'>Select Date</h5>
                      <div className='input-field' >
                        {/* <p style={{ color: 'black', fontSize: "18px" }}>Please select a valid date and time <span style={{ color: 'red' }}>(Monday to Saturday, 9 AM to 5 PM)</span>.</p> */}
                          <label htmlFor="date" className='m-2 text-light'></label>
                      <input
                      className='mt-3'
                          type="date"
                          id="date"
                          value={bookingDetails.date}
                          onChange={handleDateChange}
                          style={{height:'40px'}}
                      />
                          </div>
                          <h5 className='text-light'>Select Time</h5>
      <div className='input-field'>
      <label htmlFor="time" ></label>
                      <input
                  className='mt-3'
                          type="time"
                          id="time"
                          value={time}
                          onChange={handleTimeChange}
                          style={{height:'40px'}}
                      />
      </div>
                      <h5 className='text-light'>Please Mention Your Service</h5>
                      <div className="input-field">
                        
                          <input placeholder="Service" name="Address" type="text"
                      onChange={(e)=>setbookingDetails({...bookingDetails,service:e.target.value})}
                      value={bookingDetails.service}
                            style={{width:'300px'}}/>
                      </div>
                      <h5 className='text-light'>Please Enter Location Name</h5>
                      <div className="input-field">
                        
                          <input placeholder="Location" name="Address" type="text"
                            onChange={(e)=>setbookingDetails({...bookingDetails,location:e.target.value})}
                            value={bookingDetails.location}
                            style={{width:'300px'}}/>
                      </div>
                      <h5 className='text-light'>Please Provide Your Location Url</h5>
                      <div className="input-field">
                        
                          <input placeholder="Location Url" name="Address" type="text"
                          onChange={(e) => setbookingDetails({ ...bookingDetails, locationURL: e.target.value })}
                          value={bookingDetails.locationURL}
                            style={{width:'300px'}}/>
                      </div>
                      <div>
                      <button onClick={hanlebookWorker} className='bookbtn' style={{width:'380px'}}><h6 className='text-center mt-1'>Book Now</h6></button>
      
                      </div>
            </div>
        </p>
        </div>
      </div>
  </div>


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




  {loader && <div>
    
  <div className="loader"></div>
  </div>}

      </>
    )
  }

  export default Booking