import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { FaAngleDoubleRight } from "react-icons/fa";
import logo from '../../images/Worker-logo-design-template-vector-removebg-preview.png'
const Footer = () => {
	return (
		<footer className="footer position-relative">
			<div className="footer-top">
				<div className="container-fluid">
					<div className="row">
						<div className="col-6 col-md-6 col-lg-3">
							<div className="footer-widget footer-about">
								<div className="footer-logo">
									<Link to={'/'}>
										<img className='logoimg' src={logo} alt="logo" />
									</Link>
								</div>
								<div className="footer-about-content">
									<p className='form-text' style={{ maxWidth: 200 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
								</div>
							</div>
						</div>

						<div className="col-6 col-md-6 col-lg-3">
							<div className="footer-widget footer-menu">
								<h2 className="footer-title">For User</h2>
								<ul>
									<li><Link to={'/'}><FaAngleDoubleRight className='icon' />  Search for Service</Link></li>
									<li><Link to={'/login'}><FaAngleDoubleRight className='icon' />  Login</Link></li>
									<li><Link to={'/login'}><FaAngleDoubleRight className='icon' />  Register</Link></li>
									<li><Link to={'/login'}><FaAngleDoubleRight className='icon' />  Booking</Link></li>
									<li><Link to={'/login'}><FaAngleDoubleRight className='icon' />User Dashboard</Link></li>
								</ul>
							</div>
						</div>

						<div className="col-6 col-md-6 col-lg-3">

							<div className="footer-widget footer-menu">
								<h2 className="footer-title">For Worker</h2>
								<ul>
									<li><Link to={'/login'}><FaAngleDoubleRight className='icon' /> Appointments</Link></li>
									<li><Link to={'/login'}><FaAngleDoubleRight className='icon' /> Login</Link></li>
									<li><Link to={'/register'}><FaAngleDoubleRight className='icon' /> Register</Link></li>
									<li><Link to={'/login'}><FaAngleDoubleRight className='icon' /> worker Dashboard</Link></li>
								</ul>
							</div>
						</div>

						<div className="col-6 col-md-6 col-lg-3">
							<div className="footer-widget footer-contact">
								<h2 className="footer-title mt-3 mt-md-0">Contact Us</h2>
								<div className="footer-contact-info">
									<div className="footer-address">
										<span><i className="fas fa-map-marker-alt"></i></span>
										<p> 121, Bommanahalli HQ,<br /> Hosur, Bengaluru 03214 </p>
									</div>
									<p>
										<i className="fas fa-phone-alt"></i>
										+91 1231 2312 30
									</p>
									<p className="mb-0">
										<i className="fas fa-envelope"></i>
										Homeservice@gmail.com
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="footer-bottom">
				<div className="container-fluid">

					<div className="copyright">
						<div className="row">
							<div className="col-md-6 col-lg-6">
								<div className="copyright-text">
									<p className="mb-0"><a href="templateshub.net">
										<div className="copyRight text-center">
											<p>Copyright {(new Date()).getFullYear()} All Rights Reserved</p>
										</div></a></p>
								</div>
							</div>
							<div className="col-md-6 col-lg-6">
								<div className="copyright-menu">
									<ul className="policy-menu d-flex gap-2 justify-content-center">
										<Link to={'/'} className='text-white'>Terms and Conditions</Link>
										<Link to={'/'} className='text-white'>Policy</Link>
									</ul>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>

		</footer>
	);
};

export default Footer;