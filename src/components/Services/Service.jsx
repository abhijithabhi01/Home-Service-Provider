import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllCategoryAPI } from '../../Services/allAPI';
import { BASE_URL } from '../../Services/BASE_URL';
import './servicestyle.css'
const Service = () => {
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const result = await getAllCategoryAPI();
                if (result.status === 200) {
                    setCategory(result.data);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategory();
    }, []);

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
console.log(category);
    return (
        <section className="container" style={{ marginTop: 200, marginBottom: 200 }}>
            <div className='mb-5 section-title text-center'>
                <h1>Services We Provide</h1>
            </div>
            <div className='categorydiv' style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
                {category.map((service, index) => (
                    <div className="card" key={index} style={{ flexGrow: 1, flexBasis: '200px', width: '210px', height: '340px', margin: '10px 20px 10px 20px', position: 'relative', borderRadius: 'px', backgroundColor: '#103253', boxShadow: 'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px' }}>
                        <img src={`${BASE_URL}/uploads/${service.images[0]}`} className="card-img-top" alt="Service" style={{ height: "200px", width: "100%" }} />
                        <div className="card-body">
                            <h5 className="card-title" style={{ color: 'white' }}>{service.title}</h5>
                            <p className="card-text" style={{ color: 'white', overflow: 'hidden' }}>{service.text}</p>
                            <div className="viewbtbdiv">
                                <Link to={`/category-view-div/${service._id}`}className="btn btn-danger viewbtn" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', backgroundColor: 'rgb(247, 236, 255)', color: 'black' }}>View More</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Service;
