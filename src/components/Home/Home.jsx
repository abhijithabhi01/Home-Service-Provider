import React from 'react';
import './home.css';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <section id="hero" className="d-flex align-items-center">
            <div className="container">
                <div>
                    <small>TOTAL HOME WORK SOLUTION</small>
                    <h1>Your Most Trusted <br />Work Partner</h1>
                    <small>A perfect place to get your Work done</small>
                </div>
                <div className="d-flex justify-content-start gap-2">
                    <Link to={'/login'} className="btn-get-started scrollto">Get Started</Link>
                    <Link to={''} className="btn-get-started scrollto">Track Appointment</Link>
                </div>
            </div>
        </section>
    )
}
export default Home;