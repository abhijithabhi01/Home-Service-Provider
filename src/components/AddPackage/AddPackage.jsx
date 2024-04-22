import React, { useEffect, useState } from 'react'
import { FaAddressCard, FaBriefcase, FaCheck, FaDollarSign, FaEnvelope, FaFlag, FaLocationArrow, FaLock, FaMobile, FaNotesMedical, FaPhone, FaRegObjectUngroup, FaStickyNote, FaTimes, FaUser } from 'react-icons/fa';
import { useLocation, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../Services/BASE_URL';
import { AddPackageAPI } from '../../Services/allAPI';

function AddPackage() {
    const [workerid,setWorkerid] = useState()
    const [currentWorker, setCurrentWorker] = useState([])
    const [token, setToken] = useState('');
    const [existingUser, setExistingUser] = useState({});
    const [preview, setpreview] = useState("")
    const [time, setTime] = useState('');
    const location = useLocation()
    const [loader,setloader] = useState(false)
    const {categoryWorkers} = location.state || {}
    const[addpackage,setAddpacakgeDetails]=useState({
        workername: "",
        Packagename:"",
        service:"",
        price:"",
        workimage:""
    })
 
      
    useEffect(() => {
        if (addpackage.workimage) {
          setpreview(URL.createObjectURL(addpackage.workimage))
        }
      }, [addpackage.workimage])

      useEffect(() => {
        const currentUser = JSON.parse(sessionStorage.getItem("Activeuser"));
        if (currentUser) {
          setExistingUser(currentUser);
          setToken(sessionStorage.getItem("token"));
          setWorkerid(currentUser.existingUser._id);
          const wname = currentUser.existingUser.name;
        //   console.log(wname);
          setAddpacakgeDetails({ ...addpackage, workername: wname });
        }
      }, []);

   // console.log(workerid);

      const handleaddpackage = async()=>{
          
        const { workername,Packagename,service,price,workimage} = addpackage
        if(!workername || !Packagename || !service || !price || !workimage){
          toast.info(`Please Fill the Details Completely`)
        }
        else{
          if(token){
            const reqHeader = {
            "Content-Type": "multipart/form-data",
              "Authorization": `Bearer ${token}`
            }
            const reqBody = new FormData()
            reqBody.append("workername",workername)
            reqBody.append("package",Packagename)
            reqBody.append("service",service)
            reqBody.append("price",price)
            reqBody.append("workimage",workimage)

            const result = await AddPackageAPI(workerid,reqBody,reqHeader)
            if(result.status == 200){
              toast.success(`Package Added Successfully`)
             
              setAddpacakgeDetails({
                workername: "",
                Packagename:"",
                service:"",
                price:"",
                workimage:""
              })
              setpreview("")
              setTimeout(() => {
                window.location.reload()
              }, 1300);
            }
            else{
              // console.log(result.data);
              toast.error(`Something went wrong`)
              setAddpacakgeDetails({
                workername: "",
                Packagename:"",
                service:"",
                price:"",
                workimage:""
              })
              setpreview("")
            }
          }
          else{
            toast.warning(`session Timed out,please Login`)
            setAddpacakgeDetails({
                workername: "",
                Packagename:"",
                service:"",
                price:"",
                workimage:""
            })
            setpreview("")
          }
        }
      }


    //  console.log(addpackage);
  return (
    <>
    <div>
        <h1 className='text-center text-light m-2'>Add Package</h1>     
    </div> 
    
      <div className='bookbox-1' style={{marginTop:"7%",display:'flex',flexDirection:'column',alignItems:'center',justifyContent:"center"}}>
            <h3 className='text-light'>Fill up the Details to Add Package</h3>
            
      
            <div className='ms-3'>
                <h3 className='text-light  mt-1'>Add Image</h3>
              <label for="file" class="custum-file-upload">

                <div class="addimage" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                  <img src={preview ? preview :"https://png.pngtree.com/png-vector/20190505/ourmid/pngtree-vector-add-icon-png-image_1023418.jpg"} alt="" style={{ height: '150px', width: '150px', borderRadius: '50%', border: '5px solid black' }} />
                </div>
                <input id="file" type="file" onChange={(e) => setAddpacakgeDetails({ ...addpackage, workimage: e.target.files[0] })} style={{ display: 'none' }} />
                
              </label>
            </div>   
            <h5 className='text-light'>Please Mention Package Name</h5>
                      <div className="input-field">
                        
                          <input placeholder="Package Name" name="Address" type="text"
                      onChange={(e)=>setAddpacakgeDetails({...addpackage,Packagename:e.target.value})}
                      value={addpackage.Packagename}
                            style={{width:'300px'}}/>
                      </div>
                   
                      <h5 className='text-light'>Please Mention Your Package Services</h5>
                      <div className="input-field">
                        
                          <input placeholder="Services" name="Address" type="text"
                      onChange={(e)=>setAddpacakgeDetails({...addpackage,service:e.target.value})}
                      value={addpackage.service}
                            style={{width:'300px'}}/>
                      </div>
                      <h5 className='text-light'>Package Charge</h5>
      <div className='input-field'>
      <input placeholder="Price" name="Address" type="text"
    onChange={(e)=>setAddpacakgeDetails({...addpackage,price:e.target.value})}
    value={addpackage.price}
                            style={{width:'300px'}}/>
      </div>
                     
                      <div>
                      <button onClick={handleaddpackage} className='bookbtn mb-5' style={{width:'380px'}}><h6 className='text-center mt-1'>Add Package</h6></button>
      
                      </div>
            </div>
    </>
  )
}

export default AddPackage