import React, { useState, useEffect } from 'react'
import { retriveData } from '../../Backend/components/config/Service';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"

// import Swiper core and required modules
import SwiperCore, {
    Autoplay
} from 'swiper/core';

// install Swiper modules
SwiperCore.use([Autoplay]);


export default function Home() {


    const [categorieswithproducts, setCategoriesWithProducts] = useState([])

    const getCategorieswithproducts = async () => {
        let response = await retriveData('/get-categories-products');
        console.log(response);
        setCategoriesWithProducts(response.data.categorieswithproducts)
    }


    useEffect(() => {
        getCategorieswithproducts();
    }, [])
    return (
        <div>
            <section>
                <div className="wrapper">

                    <video autoPlay loop muted className="wrapper__video">
                        <source src="Frontend/assets/images/store.mp4" />
                    </video>


                    <div className="banner-overly"></div>
                    <div className="banner-content">
                        <div className="pb-4">
                            <h4>Made In Nepal</h4>
                            <p>You can’t imagine, Sabai Samaan Dhokan maa</p>
                        </div>
                        <div className="container">

                            <div className="search-box p-2">
                                <div className="row pt-1">
                                    <div className="form-group col-12 col-md-10 mb-0">
                                        <input type="text" className="form-control" placeholder="What are you looking for?" />
                                    </div>

                                    <div className="col-12 col-md-2">
                                        <button className="btn w-100" style={{ color: '#C12200' }}><i className="fa fa-search"></i>
                                            Search</button>
                                    </div>
                                </div>
                            </div>

                            <div className="search-poppular py-4">
                                <h6>Or browse by poppular category</h6>
                                <ul className="mt-3">
                                    <li><a className="text-uppercase" href=""><i className="fa fa-utensils pr-2"></i>restaurant</a></li>
                                    <li><a className="text-uppercase" href=""><i className="fa fa-chalkboard pr-2"></i>Language
                                        Class</a></li>
                                    <li><a className="text-uppercase" href=""><i className="fa fa-car-crash pr-2"></i>auto care</a></li>
                                    <li><a className="text-uppercase" href=""><i className="fa fa-shopping-bag pr-2"></i>Shoping
                                        Store</a></li>
                                </ul>
                            </div>


                        </div>
                    </div>
                </div>
            </section >

            <section>
                <div className="container my-3">
                    <div className="row">

                        <div className="col-12 col-md-12 col-lg-12">
                            <div className="row">
                                <div className="col-12">


                                    {
                                        categorieswithproducts.map((categories, index) => (


                                            <div className="featured-wrapper bg-white p-4 mt-4" key={index}>
                                                <div className="title">
                                                    <h4 className="poppins-bold">{categories.name}</h4>
                                                    <span className="fr">
                                                        <strong>More</strong>
                                                    </span>
                                                    <hr></hr>
                                                </div>
                                                <div className="content">
                                                    <Swiper slidesPerView={4} autoplay={true} spaceBetween={10} pagination={{
                                                        "clickable": true
                                                    }} className="mySwiper">


                                                        {
                                                            categories.product.map((product, i) => (
                                                                <SwiperSlide>
                                                                    <Link to={`/products-info/${product.slug}`} >
                                                                        <div className="col-12 col-md-4 col-lg-3" key={i}>
                                                                            <div className="list">
                                                                                <img className="w-100" src={`/Images/Products/${product.image}`} alt="" />
                                                                                <div className="list-content p-3">
                                                                                    <p><a className="text-black" href="">{product.product_name}</a></p>
                                                                                    <p style={{ color: '#C12200' }}>Rs.
                                                                                        <span style={{ color: 'red', textDecoration: 'line-through', marginRight: 10, marginLeft: 5 }}>
                                                                                            <span style={{ color: "black" }}>{product.product_price}</span>
                                                                                        </span>
                                                                                        <span>
                                                                                            180
                                                                                        </span>

                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Link>
                                                                </SwiperSlide>



                                                            )
                                                            )
                                                        }
                                                    </Swiper>


                                                </div>
                                            </div>



                                        )
                                        )
                                    }



                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section >



        </div >
    )
}
