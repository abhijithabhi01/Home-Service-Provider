import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

const Service = () => {
    
    return (
        <section className="container" style={{marginTop: 200, marginBottom:200}}>
            <div className='mb-5 section-title text-center'>
                <h1>Services We Provide</h1>
              
            </div>
            <div className="carddiv">

            <div className="card" >
          <img src="https://homecarepro.com/wp-content/uploads/2019/07/interior-home-cleaning-services.jpg" className="card-img-top"  alt="..." style={{height:"200px",width:'100%'}} />
          <div className="card-body">
            <h5 className="card-title">Interior Cleaning</h5>
            <p className="card-text">Transform your outdoor space with our professional exterior cleaning service.  </p>
           <div className='viewbtbdiv'> <a href="#" className="btn btn-danger viewbtn">View More</a></div>
          </div>
        </div>
        <div className="card" >
          <img src="https://advantageproservices.com/wp-content/uploads/2023/01/shutterstock_1116910898.jpg" className="card-img-top"  alt="..." style={{height:"200px",width:'100%'}} />
          <div className="card-body">
            <h5 className="card-title">Exterior Cleaning</h5>
            <p className="card-text">Transform your outdoor space with our professional exterior cleaning service.  </p>
           <div className='viewbtbdiv'> <a href="#" className="btn btn-danger viewbtn">View More</a></div>
          </div>
        </div>
        <div className="card" >
          <img src="https://t4.ftcdn.net/jpg/02/20/20/41/360_F_220204174_vfgB0Vo2i4MZ8Sv5hmtsx5IwcvrDCZox.jpg" className="card-img-top"  alt="..." style={{height:"200px",width:'100%'}} />
          <div className="card-body">
            <h5 className="card-title">Plumbing Works</h5>
            <p className="card-text">Resolve plumbing issues swiftly with our expert service for your home or business.  </p>
           <div className='viewbtbdiv'> <a href="#" className="btn btn-danger viewbtn">View More</a></div>
          </div>
        </div>
        {/* Add more cards similarly */}
        <div className="card" >
          <img src="https://media.istockphoto.com/id/511990814/photo/industrial-electric-panel-repair.jpg?s=612x612&w=0&k=20&c=ZMQMHaywhO3UBZ0NA-bYWqlvGx2QJPCTXFlMK6Kch9I=" className="card-img-top"  alt="..." style={{height:"200px",width:'100%'}} />
          <div className="card-body">
            <h5 className="card-title">Electrical Works</h5>
            <p className="card-text">Experience seamless electrical solutions with our skilled technicians guaranteeing safety.   </p>
           <div className='viewbtbdiv'> <a href="#" className="btn btn-danger viewbtn">View More</a></div>
          </div>
        </div>
        <div className="card" >
          <img src="https://img.freepik.com/free-photo/carpenter-cutting-mdf-board-inside-workshop_23-2149451066.jpg" className="card-img-top"  alt="..." style={{height:"200px",width:'100%'}} />
          <div className="card-body">
            <h5 className="card-title">Carpenting Works</h5>
            <p className="card-text">Crafting spaces with precision and passion. We transform your visions into reality.  </p>
           <div className='viewbtbdiv'> <a href="#" className="btn btn-danger viewbtn">View More</a></div>
          </div>
        </div>
        <div className="card" >
          <img src="https://media.istockphoto.com/id/938085736/photo/workamn-painting-wall-indoors.jpg?s=612x612&w=0&k=20&c=wW_LTcleg_2L21j8FTRMxFMwzMamIYjRAyRgQyjEjyc=" className="card-img-top"  alt="..." style={{height:"200px",width:'100%'}} />
          <div className="card-body">
            <h5 className="card-title">Painting</h5>
            <p className="card-text">Bring color to life with our expert painting services, enhancing your space with us.   </p>
           <div className='viewbtbdiv'> <a href="#" className="btn btn-danger viewbtn">View More</a></div>
          </div>
        </div>
        <div className="card" >
          <img src="https://i.pinimg.com/originals/b2/b8/46/b2b846c502dd52147daedb7401741c57.jpg" className="card-img-top"  alt="..." style={{height:"200px",width:'100%'}} />
          <div className="card-body">
            <h5 className="card-title">Gardening</h5>
            <p className="card-text">Elevate your outdoor space with our expert team, crafting lush landscapes to your vision.  </p>
           <div className='viewbtbdiv'> <a href="#" className="btn btn-danger viewbtn">View More</a></div>
          </div>
        </div>
        <div className="card" >
          <img src="https://media.istockphoto.com/id/459292777/photo/laundry-service.jpg?s=612x612&w=0&k=20&c=V-fCS_ZhDA8_sqySt4-twQhovKdDrB9b71WBE_M6k1Q=" className="card-img-top"  alt="..." style={{height:"200px",width:'100%'}} />
          <div className="card-body">
            <h5 className="card-title">Laundry</h5>
            <p className="card-text">Refresh your fabrics with our efficient service, delivering cleanliness and convenience.  </p>
           <div className='viewbtbdiv'> <a href="#" className="btn btn-danger viewbtn">View More</a></div>
          </div>
        </div>
        <div className="card" >
          <img src="https://media.istockphoto.com/id/469295486/photo/handyman-with-tools.jpg?s=612x612&w=0&k=20&c=7lHfQZsWXPZfisO_NktYj7EJymUHbp23TsC8ZeifSA8=" className="card-img-top"  alt="..." style={{height:"200px",width:'100%'}} />
          <div className="card-body">
            <h5 className="card-title">Additional Services</h5>
            <p className="card-text">Discover tailored solutions for convenience and satisfaction with our additional services.  </p>
           <div className='viewbtbdiv'> <a href="#" className="btn btn-danger viewbtn">View More</a></div>
          </div>
        </div>
        <div className="card" >
          <img src="https://img.freepik.com/free-photo/person-taking-care-office-cleaning_23-2149374423.jpg?size=626&ext=jpg&ga=GA1.1.632798143.1705363200&semt=ais" className="card-img-top"  alt="..." style={{height:"200px",width:'100%'}} />
          <div className="card-body">
            <h5 className="card-title">Exciting Packages</h5>
            <p className="card-text">Experience excitement unleashed with our custom-tailored packages. </p>
           <div className='viewbtbdiv'> <a href="#" className="btn btn-danger viewbtn">View More</a></div>
          </div>
        </div>
      </div>
   
        </section>
    )
}

export default Service