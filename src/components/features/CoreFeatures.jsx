import React from 'react'
import { FaCheckDouble } from "react-icons/fa";
import './style.css';
import carp from '../../images/carpenter.png'
import elect from '../../images/electrician.png'
import mech from '../../images/mechanic.png'
import gard from '../../images/gardener.png'
import cleans from '../../images/cleaning-staff.png'
import laundry from '../../images/folding-clothes.png'
import painter from '../../images/painter.png'
import plumber from '../../images/plumber.png'
import delivery from '../../images/delivery.png'
import support from '../../images/help-desk.png'



function CoreFeatures() {
    
  return (
    <>
	<section className="section section-specialities position-relative">
			<div className="container-fluid">
				<div className='mb-5 section-title text-center'>
					<h2>Home Service Specialities</h2>
					<p className='m-0'>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
				</div>

				<div className="row justify-content-center">
                <marquee width="40%" direction="left" height="200px" behavior="scroll" scrollamount="20" loop="-1">
                <div className="col-md-9 hovermetostop">
						<div className="specialities-slider d-flex justify-content-center align-items-center gap-5">
							<div className="speicality-item text-center">
								<div className="speicality-img">
									<img src={carp} className="img-fluid" alt="" />
									<span><i><FaCheckDouble/></i></span>
								</div>
								<p>Carpenter</p>
							</div>
							<div className="speicality-item text-center">
								<div className="speicality-img">
									<img src={mech} className="img-fluid" alt="" />
									<span><i><FaCheckDouble/></i></span>
								</div>
								<p>Mechanic</p>
							</div>
							<div className="speicality-item text-center">
								<div className="speicality-img">
									<img src={gard} className="img-fluid" alt="" />
									<span><i><FaCheckDouble/></i></span>
								</div>
								<p>Gardener</p>
							</div>
							<div className="speicality-item text-center">
								<div className="speicality-img">
									<img src={plumber} className="img-fluid" alt="" />
									<span><i><FaCheckDouble/></i></span>
								</div>
								<p>Plumber</p>
							</div>
							<div className="speicality-item text-center">
								<div className="speicality-img">
									<img src={elect} className="img-fluid" alt="" />
									<span><i><FaCheckDouble/></i></span>
								</div>
								<p>Electrian</p>
							</div>
                            <div className="speicality-item text-center">
								<div className="speicality-img">
									<img src={laundry} className="img-fluid" alt="" />
									<span><i><FaCheckDouble/></i></span>
								</div>
								<p>Laundry</p>
							</div>
                            <div className="speicality-item text-center">
								<div className="speicality-img">
									<img src={cleans} className="img-fluid" alt="" />
									<span><i><FaCheckDouble/></i></span>
								</div>
								<p>Cleaner</p>
							</div>
                            <div className="speicality-item text-center">
								<div className="speicality-img">
									<img src={painter} className="img-fluid" alt="" />
									<span><i><FaCheckDouble/></i></span>
								</div>
								<p>Painter</p>
							</div>
                            <div className="speicality-item text-center">
								<div className="speicality-img">
									<img src={support} className="img-fluid" alt="" />
									<span><i><FaCheckDouble/></i></span>
								</div>
								<p>24*7 Support</p>
							</div>
						</div>
					</div>
    </marquee>
				</div>
			</div>
		</section>
    </>
  )
}

export default CoreFeatures