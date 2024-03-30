import React from 'react'
import img from '../../images/Worker-logo-design-template-vector-removebg-preview.png'
import './dash.css'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import WorkerProfile from './UserProfile';


function UserDash() {
    return (
        <>

            <div>
                <div className='d-flex align-items-center justify-content-between ps-5 pe-5 p-2 nav'>
                    <div className='d-flex'>
                        <img src={img} alt=""
                            style={{ height: '80px', width: '80px', border: '2px solid black', borderRadius: '50%' }}
                        />
                        <h3 className='mt-4 ms-2'>User</h3>
                    </div>
                    <div className='d-flex'>
                        <h5 className='m-2 text-danger'>Logout</h5>
                        <h5 className='m-2'> <a href="/" style={{ textDecoration: 'none', color: 'white' }}>Home</a></h5>
                    </div>

                </div>

                <div className='userprofile'>

                </div>


                <Tabs
                    defaultActiveKey="profile"
                    id="uncontrolled-tab-example"
                    className="control-tab"
                >
                    <Tab eventKey="worklist" title="Work Status">

                        <div className='worklistdiv'>
                            <table className='listtable'>
                                <thead className='tablehead'>
                                    <tr className='table-row'>
                                        <th className='srno'>SR NO</th>
                                        <th className='name'>Employee Name</th>
                                        <th className='location'>Location</th>
                                        <th>Work</th>
                                        <th className='status'>Status</th>
                                    </tr>
                                </thead>
                                <tbody className='table-body'>
                                    <tr className='table-row'>
                                        <td className='srno'>1</td>
                                        <td className='name'>Mark</td>
                                        <td className='location'>Otto</td>
                                        <td>Otto</td>
                                        <td className='status'>@mdo</td>
                                    </tr>

                                </tbody>
                                <tbody className='table-body'>
                                    <tr className='table-row'>
                                        <td className='srno'>1</td>
                                        <td className='name'>Mark</td>
                                        <td className='location'>Otto</td>
                                        <td>Otto</td>
                                        <td className='status'>@mdo</td>
                                    </tr>

                                </tbody>
                                <tbody className='table-body'>
                                    <tr className='table-row'>
                                        <td className='srno'>1</td>
                                        <td className='name'>Mark</td>
                                        <td className='location'>Otto</td>
                                        <td>Otto</td>
                                        <td className='status'>@mdo</td>
                                    </tr>

                                </tbody>
                                <tbody className='table-body'>
                                    <tr className='table-row'>
                                        <td className='srno'>1</td>
                                        <td className='name'>Mark</td>
                                        <td className='location'>Otto</td>
                                        <td className='status'>@mdo</td>
                                    </tr>

                                </tbody>
                                <tbody className='table-body'>
                                    <tr className='table-row'>
                                        <td className='srno'>1</td>
                                        <td className='name'>Mark</td>
                                        <td className='location'>Otto</td>
                                        <td className='status'>@mdo</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </Tab>

                    <Tab eventKey="profile" title="Profile">
                        <WorkerProfile />
                    </Tab>
                    <Tab eventKey="contact" title="Book Now">
                        Tab content for Book appointment
                    </Tab>
                    <Tab eventKey="settings" title="Settings">
                        Tab content for settings
                    </Tab>
                </Tabs>
            </div>
        </>
    )
}

export default UserDash