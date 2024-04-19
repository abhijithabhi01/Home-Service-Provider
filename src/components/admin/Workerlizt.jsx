import React, { useEffect, useState } from 'react'
import { AllworkersAPI, admindeleteworkersAPI, deleteworkersAPI } from '../../Services/allAPI';
import { BASE_URL } from '../../Services/BASE_URL';
import { Link } from 'react-router-dom';

function Workerlizt() {
    const [users, setUsers] = useState([]);
    const handledelete = async (id) => {
        try {
           const reqHeader ={}
            const reqBody = {}
            const result = await deleteworkersAPI(id,reqBody,reqHeader);
            console.log(result);
            if (result.status == 200) {
                alert(`worker deleted`)
                getallworkers();
            } else {
                alert(`something went wrong`)
                console.log(result.response.data);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };


    const getallworkers = async () => {
        try {
            const result = await AllworkersAPI();
            console.log(result);
            setUsers(result.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        getallworkers();
    }, []);


  return (
    <div className="container mt-5 mb-5">
    <div className="mt-5 text-center">
        <h2 className="fw-bolder">
             <span className="text-white"> WORKERS    LIST</span>
        </h2>
    </div>
    <Link to="/adminpage" className="btn btn-primary mb-3">Back to Admin</Link> {/* Back button */}
    <div className="row mt-5">
        <div className="col-md-12">
            <table className="table align-middle mb-0 bg-white">
                <thead className="bg-light">
                    <tr>
                        <th> WORKER ID</th>
                        <th>IMAGE</th> 
                        <th>NAME</th>
                        <th>E-MAIL</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user._id}</td>
                            <td>
                                {user.userimage ? (
                                   <img
                                   src={`${BASE_URL}/uploads/${user.userimage}`}
                                   alt="User"
                                   width="50"
                                   height="50"
                                   style={{ borderRadius: '50%' }} // Make the image round
                               />
                                ) : (
                                    <span>No Image</span>
                                )}
                            </td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                           
                            <td>
                                <button
                                    onClick={(e) => handledelete(user._id)}
                                    type="button"
                                    className="btn btn-danger btn-sm btn-rounded"
                                >
                                    Delete User
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
</div>
    )
}

export default Workerlizt