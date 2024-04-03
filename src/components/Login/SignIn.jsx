import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useForm } from "react-hook-form";
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userloginAPI, workerloginAPI } from '../../Services/allAPI';

const SignIn = () => {
    const [infoError, setInfoError] = useState('');
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false)
    const [who, setWho] = useState('')
    const [worker, setworker] = useState(null)
    const [userDetails,setUserDetails] = useState({
        email:"",
        password:""
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

 // user login
 const handleuserlogin = async (e) => {
    e.preventDefault();
    const { email, password } = userDetails;
    if (email == 'admin@gmail.com' && password == 'admin') {
        sessionStorage.setItem("Activeuser", JSON.stringify({ email: 'admin@gmail.com' }));
        sessionStorage.setItem("token", "adminToken"); 
        alert('Welcome, Admin!'); // Display an alert after admin login
        navigate('/adminpage');
    } else {
        if (!email || !password) {
            toast.info('Please fill the form completely');
        } else {
            setLoading(true);
            // API call
            const result = await userloginAPI(userDetails);
            if (result.status === 200) {
                setLoading(false);
                toast.success('Login success');
                sessionStorage.setItem("Activeuser", JSON.stringify(result.data));
                sessionStorage.setItem("token", result.data.token);
                setTimeout(() => {
                    navigate('/');
                }, 3000);
                setUserDetails({
                    email: "",
                    password: ""
                });
            } else {
                toast.error('Login failed');
                setLoading(false);
                setUserDetails({
                    email: "",
                    password: ""
                });
                console.log(result);
            }
        }
    }
};

    //    worker login
    const handleworkerlogin = async (e)=>{
 
        e.preventDefault()
         const{email,password}= userDetails
         if(!email || !password){
             toast.info('please fill the form completely')
         }
         else{
            setLoading(true)
             //api call
          const result = await workerloginAPI(userDetails)
          if(result.status == 200){
            setLoading(false)
            toast.success('Login success')
            console.log(result.data);
            sessionStorage.setItem("Activeuser",JSON.stringify(result.data))
            sessionStorage.setItem("token",result.data.token)
            sessionStorage.setItem("logger",result.data.logger)
            setTimeout(() => {
                navigate('/')
            }, 3000);
       // console.log(result.data);
            setUserDetails({
                email:"",
                password:""
            })
           
          }
          else{
            toast.error('Registration failed')
            setLoading(false)
            setUserDetails({
                email:"",
                password:""
            })
           console.log(result);
          }
          
         }
       }
// console.log(worker);
// console.log(who);
// console.log(userDetails);
    return (
        <>
           
      
                        <form className="sign-in-form">
    
                            <h2 className="title">Sign in</h2>
                            <div className='input-field'>
                    <div className='mt-4 ms-1 text-light'>I'M A</div>
                    <select
                       
                        aria-label="select"
                        value={who}
                        onChange={handleSelectChange}
                    >
                        <option value="">Select option</option>
                        <option value="User">User</option>
                        <option value="Worker">Worker</option>
                    </select>
                </div>
                            <div className="input-field">
                                <span className="fIcon"><FaEnvelope /></span>
                                <input {...register("email", { required: true })} placeholder="Enter Your Email" 
                               value={userDetails.email}
                               onChange={(e)=>setUserDetails({...userDetails,email:e.target.value})}
                                type="email" />
                            </div>
                            {errors.email && <span className="text-danger">This field is required</span>}
                            <div className="input-field">
                                <span className="fIcon"><FaLock /></span>
                                <input {...register("password", { required: true })} type="password" 
                                value={userDetails.password}
                               onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})}
                                placeholder="Enter Your Password" />
                            </div>
                            {errors.password && <span className="text-danger">This field is required</span>}
                            {infoError && <p className="text-danger">{infoError}</p>}
                           
                          {worker?
                            <button onClick={handleworkerlogin} className="iBtn" type="submit" value="sign In" >
                            Sign In
                            </button>
                            :
                          <button onClick={handleuserlogin} className="iBtn" type="submit" value="sign In" >
                            Sign In
                            </button>}
                            
                        </form>
    
    
                        <ToastContainer


theme="colored"
style={{marginTop:'900px',marginLeft:'-90%'}}
/>
        </>
    );
};

export default SignIn;