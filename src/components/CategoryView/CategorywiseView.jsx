import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { getAllCategoryAPI, getAllPackagesAPI, getWorkerbytypeAPI, getallworkersAPI } from '../../Services/allAPI';
import { BASE_URL } from '../../Services/BASE_URL';
import './style.css';

function CategorywiseView() {
    const { catid } = useParams();
    const [currentCategory, setCurrentCategory] = useState(null);
    const [allCategories, setAllCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [allpacks, setAllpacks] = useState([]);
    const [existingUser,setExistingUser] = useState([])
    const [token, setToken] = useState('');
    const [categoryWorkers, setCategoryWorkers] = useState([]);
    const navigate = useNavigate()
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
        const fetchAllUsers = async () => {
            try {
                const result = await getallworkersAPI();
                setAllUsers(result.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        const FetchAllPackages = async () => {
            try {
                const result = await getAllPackagesAPI();
                setAllpacks(result.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchAllUsers();
        FetchAllPackages();
    }, []);

    useEffect(() => {
        const getcurrentUser = JSON.parse(sessionStorage.getItem("Activeuser"));
        if (getcurrentUser) {
            setExistingUser(getcurrentUser);  
            setToken(sessionStorage.getItem("token"));
        }
    }, []);

    useEffect(() => {
        const category = allCategories.find(cat => cat._id === catid);
        setCurrentCategory(category);
    }, [catid, allCategories]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !currentCategory) {
        return <div>Error: Category not found.</div>;
    }

// console.log(currentCategory);
const fetchwokerbytype = async () => {
    const worktype = currentCategory.worktype
 console.log(worktype);
    try {
            
            const result = await getWorkerbytypeAPI(worktype);
            if (result.status == 200) {
                console.log(result.data);
                setCategoryWorkers(result.data)
        }
    } catch (error) {
        console.error("Error fetching workers by type:", error);
    }
};
fetchwokerbytype();
const handlebookuser = (wid) => {
    if (categoryWorkers) {
      navigate(`/booking/${wid}`, { state: { categoryWorkers } });
    } else {
      console.error('Property details are not available.');
    }
  };
  const handlebookpackage = (wid) => {
    if (allpacks) {
      navigate(`/packbooking/${wid}`, { state: { allpacks } });
    } else {
      console.error('Property details are not available.');
    }
  };
  
console.log(currentCategory);
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
                 
                 {currentCategory._id === '66091cbec69b4d252042df82' ?  
                 <>
                     <h3 className='text-light ms-5'>Exicting Packages</h3>  
                       <div className='worklistdiv excarddiv d-flex' >
                     
                       {allpacks.map((allpacks, index) => (
                        <div className="card" key={index} style={{ flexGrow: 1, flexBasis: '200px', maxWidth: '210px', height: '340px', margin: '10px 20px 10px 20px', position: 'relative', borderRadius: 'px', backgroundColor: '#103253', boxShadow: 'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px' }}>
                            <img src={`${BASE_URL}/uploads/${allpacks.workimage}`} className="card-img-top" alt="Service" style={{ height: "200px", width: "100%" }} />
                            <div className="card-body">
                                <h5 className="card-title" style={{ color: 'white' }}>{allpacks.package}</h5>
                                <h6 className="card-title" style={{ color: 'white' }}>${allpacks.price}</h6>
                                <p className="card-text" style={{ color: 'white', overflow: 'hidden' }}>{allpacks.service}</p>
                                <div className="viewbtbdiv">
                                {token ? 
                                        <button onClick={(e)=>handlebookpackage(allpacks._id)} className="btn btn-danger viewbtn" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', backgroundColor: 'rgb(247, 236, 255)', color: 'black' }}>Book Now</button>
                                :
                                             <Link to={'/login'}>   <button  style={{ background: 'blue', border: 'none', padding: '0px 10px', color: "white", fontWeight: 'bold', borderRadius: '5px' }}>
                                             Book
                                         </button></Link>
                                                }
                            
                                </div>
                            </div>
                        </div>
                    ))}
                   </div>
                 </>
                 :
                 <div className='worklistdiv'>
    <table className='listtable' style={{height:'fit-content'}}>
      <thead className='tablehead'>
        <tr className='table-row'>
          <th className='srno p-2'>SR NO</th>
          <th className='name'>Workers Name</th>
          <th className='location'>Location</th>
          <th className='status'>Price per Day</th>
          <th className='status'>Book Now</th>
        </tr>
      </thead>
      <tbody className='table-body'>
                                {categoryWorkers.map((worker, index) => (
                                    <tr key={index} className='table-row'>
                                        <td className='srno p-2'>{index + 1}</td>
                                        <td className='name'>{worker.name}</td>
                                        <td className='location'>{worker.district}</td>
                                        <td className='status'>{worker.price}</td>
                                        <th className='status'>
                                       {token ? <button onClick={(e)=>handlebookuser(worker._id)} style={{ background: 'blue', border: 'none', padding: '0px 10px', color: "white", fontWeight: 'bold', borderRadius: '5px' }}>
                                                Book
                                            </button> :
                                         <Link to={'/login'}>   <button  style={{ background: 'blue', border: 'none', padding: '0px 10px', color: "white", fontWeight: 'bold', borderRadius: '5px' }}>
                                         Book
                                     </button></Link>
                                            }
                                        </th>
                                    </tr>
                                ))}
                            </tbody>
    </table>
    </div>


  
    }    </div>
            </div>
        </>
    );
}

export default CategorywiseView;