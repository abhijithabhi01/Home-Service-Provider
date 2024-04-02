import React, { useEffect, useState } from 'react';
import './home.css';
import { Link } from 'react-router-dom';

const Home = () => {
    const[token,setToken] = useState('')
    const[logger,setLogger] = useState()
    const[existinguser,setExistingUser] = useState({})
    useEffect(() => {
        const currentUser = JSON.parse(sessionStorage.getItem("Activeuser"));
        if (currentUser) {
          setExistingUser(currentUser);
          setLogger(currentUser.logger);
          setToken(sessionStorage.getItem("token"));
        }
      }, []);
// console.log(existinguser,token,logger);
    return (
        <section id="hero" className="d-flex align-items-center">
            <div className="container">
                <div>
                    <small>TOTAL HOME WORK SOLUTION</small>
                    <h1>Your Most Trusted <br />Work Partner</h1>
                    <small>A perfect place to get your Work done</small>
                </div>
                <div className="d-flex justify-content-start gap-2">
{token ?                    <Link to={'/view-service'} className="btn-get-started scrollto">Book Appointment</Link>
:<Link to={'/login'} className="btn-get-started scrollto">Get Started</Link>
                    }
                </div>
            </div>
        </section>
    )
}
export default Home;