import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllCategoryAPI, getallworkersAPI } from '../../Services/allAPI';
import { BASE_URL } from '../../Services/BASE_URL';
import Navbar from '../Navbar/Navbar';
import logo from '../../images/Worker-logo-design-template-vector-removebg-preview.png';
import './style.css';
import Modal from 'react-bootstrap/Modal';
import { useParams } from 'react-router-dom';

function CategorywiseView() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [currentCategory, setCurrentCategory] = useState({});
    const [allCategories, setAllCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState('');
    const [logger, setLogger] = useState('');
    const [existingUser, setExistingUser] = useState({});
    const [allUsers, setAllUsers] = useState([])
    const [preview, setpreview] = useState("")
    const [currentUser, setCurrentUser] = useState([])
    const [error, setError] = useState(null);
    const { catid } = useParams();

    useEffect(() => {
        const fetchAllCategories = async () => {
            try {
                const result = await getAllCategoryAPI();
                if (result.status === 200) {
                    setAllCategories(result.data);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllCategories();
    }, []);

    useEffect(() => {
        const category = allCategories.find((cat) => cat._id === catid);
        setCurrentCategory(category);
    }, [catid, allCategories]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !currentCategory) {
        return <div>Error: Category not found.</div>;
    }


        const getcurrentUser = JSON.parse(sessionStorage.getItem("Activeuser"));
        if (getcurrentUser) {
          setExistingUser(getcurrentUser);
          setLogger(getcurrentUser.logger);
          setToken(sessionStorage.getItem("token"));

          const FetchALLUsers = async () => {
            const result = await getallworkersAPI();
            setAllUsers(result.data);
          };
       
          const FetchCurrentUser = () => {
            const user = allUsers.find((user) => user._id == existingUser.existingUser._id);
            setCurrentUser(user);
        }}
   
    
 
        console.log(allUsers); 
console.log(currentUser);
    return (
        <>
            <div>
                <Navbar />
                <div>
                    <div className='viewbox-1'>
                        <div className="">
                            <div className="card2">
                                <img src={`${BASE_URL}/uploads/${currentCategory.images[0]}`} alt="logo" />
                            </div>
                        </div>
                        <div>
                            <h1>{currentCategory.title}</h1>
                            <h5>{currentCategory.text}</h5>
                            <button className='bookbtn'><h6 className='text-center mt-1'>Book Now</h6></button>
                        </div>
                    </div>
                    <hr className='hr' />
                    <div className='viewbox-2'>
                        
                        <div className='p-5'>
                        <h3 className='m-2'>Description</h3>
                            <p>{currentCategory.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CategorywiseView;
