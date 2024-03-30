import React from 'react';
import './InfoPage.css';
import { FaClock, FaHeadset,FaHouseUser  } from "react-icons/fa";
import { Link } from 'react-router-dom';

const InfoPage = () => {
    return (
        <section className="why-us mt-2 mb-1">
            <div className="container">

                <div className="row">
                    <div className="col-lg-4 d-flex align-items-stretch">
                        <div className="content">
                            <h3>Why Choose Us?</h3>
                            <p>
                            we offer a wide range of home services to tackle those nagging projects and restore serenity to your space. From plumbing woes to electrical mysteries, our licensed and insured professionals are here to help.  We can spruce up your kitchen with a backsplash installation,  mount that new TV you've been eyeing, or finally assemble that complicated flat-pack furniture.  We even offer handyman services for minor repairs and deep cleaning solutions to get your home sparkling.
                            </p>
                            <div className="text-center">
                                <Link href="/" className="more-btn">Learn More <i className="bx bx-chevron-right"></i></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 d-flex align-items-stretch">
                        <div className="icon-boxes d-flex flex-column justify-content-center">
                            <div className="row">
                                <div className="col-xl-4 d-flex align-items-stretch">
                                    <div className="icon-box mt-4 mt-xl-0">
                                        <FaHouseUser className="icon"/>
                                        <h4>24*7 Booking</h4>
                                        <small className='text-secondary'>24 Hours Service</small>
                                        <p>Forget the stress of DIY disasters and weekend warrior woes – Handy Haven is your one-stop shop for a more functional and beautiful home. Simply book your service online.</p>
                                    </div>
                                </div>
                                <div className="col-xl-4 d-flex align-items-stretch">
                                    <div className="icon-box mt-4 mt-xl-0">
                                        <FaHeadset className="icon"/>
                                        <h4>Avaliable at Everywhere</h4>
                                        <h6 className='text-secondary'>+88 01751 040425</h6>
                                        <p>Juggling a busy life can leave your home improvement to-do list gathering dust. At Handy Haven, we understand. That's why we offer a wide range of home services to tackle those nagging projects and restore serenity to your space. </p>
                                    </div>
                                </div>
                                <div className="col-xl-4 d-flex align-items-stretch">
                                    <div className="icon-box mt-4 mt-xl-0">
                                        <FaClock className="icon"/>
                                        <h4>Affordable Prices</h4>
                                        
                                    <p>
                                    We're committed to exceeding your expectations with upfront, affordable pricing, clear communication, and a focus on quality workmanship. With Handy Haven, your home improvement dreams become reality, without breaking the bank.
                                    </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default InfoPage