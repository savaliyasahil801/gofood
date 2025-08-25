import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import Footer from '../component/Footer'

import ItemCart from '../component/ItemCart';
// import Slider from '../component/Slider';

import Carousel from 'react-bootstrap/Carousel';
import img1 from "../images/pizza-paneer-tikka.webp";
import img2 from "../images/slider-pizza.jpg";
import img3 from "../images/pizza-margherita.webp";

const Home = () => {

    const [Data, setdata] = useState([]);
    const [foodcat, setfoodcat] = useState([]);
    const [Search, setsearch] = useState('');


    useEffect(() => {
        fetchdata();
        foodcategory();
    }, [])

    const fetchdata = async () => {
        const response = await fetch('http://localhost:5000/getfood', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        console.log(data);
        setdata(data);
    }

    const foodcategory = async () => {
        const response = await fetch('http://localhost:5000/getcategory', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        console.log(data);
        setfoodcat(data);
    }

    return (
        <div className='bg-dark text-light'>
            <Header />

            <div>
                {/* <Slider Search={Search} setsearch={setsearch} /> */}
                <Carousel fade>
                    {[img1, img2, img3].map((img, index) => (
                        <Carousel.Item key={index}>
                            <img src={img} className="slider_image" style={{ filter: "brightness(30%)" }} alt="..." />
                            <div className="carousel-caption" style={{ zIndex: 10 }}>
                                {/* <SearchForm /> */}
                                <div className="d-flex justify-content-center">
                                    <input type="search" className="form-control me-2 bg-transparent text-light slider_input" placeholder="search" value={Search} onChange={(e) => { setsearch(e.target.value) }} />
                                    {/* <button className="btn btn-success text-light" type="submit">Search</button> */}
                                </div>
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>

            <div className='container'>
                {
                    (foodcat !== [])
                        ? foodcat.map((food) => {
                            return (
                                <>
                                    <div className="row mb-3" key={food._id}>
                                        <div className="fs-3 m-3 text-light">{food.category}</div>
                                        <hr />
                                        {
                                            (Data !== []) ?
                                                Data.filter((item) => (item.category === food.category) && (item.name.toLowerCase().includes(Search.toLowerCase())))
                                                .map((product) => {
                                                    return (
                                                        <div key={product._id} className='col-12 col-md-6 col-lg-3'>
                                                            <ItemCart foodItem={product} option={product.object[0]} />
                                                        </div>
                                                    )
                                                }) : <div>No Such Data Found</div>
                                        }
                                    </div>
                                </>
                            )
                        }) : ""
                }
            </div>

            <Footer />
        </div>
    )
}

export default Home
