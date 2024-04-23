import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../Services/BASE_URL';
import { AllusersAPI, deleteuserAPI } from '../../Services/allAPI';
import { Link } from 'react-router-dom';

function Userlizt() {
    const [users, setUsers] = useState([]);

    const handledelete = async (id) => {
        try {
            const result = await deleteuserAPI(id);
            console.log(result);
            if (result.status === 200) {
                getallusers();
            } else {
                console.log(result.response.data);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const getallusers = async () => {
        try {
            const result = await AllusersAPI();
            console.log(result);
            setUsers(result.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        getallusers();
    }, []);

    return (
   <>
            <div className="container mt-5 mb-5">
                <div className="mt-5 text-center">
                    <h2 className="fw-bolder">
                       <span className="text-white">  USERS LIST</span>
                    </h2>
                </div>
                <Link to="/adminpage" className="btn btn-primary mb-3">Back to Admin</Link> {/* Back button */}
                <div className="row mt-5">
                    <div className="col-md-12">
                        <table className="table align-middle mb-0 bg-white">
                            <thead className="bg-light">
                                <tr>
                                    <th> USER ID</th>
                                    <th>IMAGE</th> {/* New column for user image */}
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
                                               alt="no image"
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
                                                onClick={() => handledelete(user._id)}
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
   </>
    );
}

export default Userlizt;
