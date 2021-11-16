import React, { useState, useEffect } from 'react';
import { retriveData, createData } from '../../Backend/components/config/Service';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import ProductDetails from '../components/pages/Product/ProductDetails';
import Logo from '../../../../public/Frontend/assets/images/logo2.png';

import { Logout } from '../components/actions';
// import { isAuthenticated } from '../components/IsAuthenticated';


export default function Header() {

    const shoppingCart = useSelector((state) => state.carts.shoppingCart);
    const isAuthenticated = useSelector((state) => state.Auth.token);

    const dispatch = useDispatch();


    const [navcategories, setNavCategories] = useState([]);


    const getCategories = async () => {
        let response = await retriveData('/get-categories');
        console.log(response);
        setNavCategories(response.data.categories);

    }

    const logout = () => {
        // window.localStorage.removeItem("user-info");
        // window.localStorage.removeItem("token");
        // window.location.reload();
        dispatch(Logout({ token: null, user: null }));


    }


    // console.log(categories);

    useEffect(() => {
        getCategories();

        // if (isAuthenticated) {
        //     window.location.reload();

        // }




    }, [])
    return (
        <div>

            <nav className="navbar navbar-light navbar-expand-md bg-white justify-content-center">
                <div className="container">
                    <a href="index.html" className="mr-0">
                        {/* <img src="Frontend/assets/images/logo2.png" alt="" /> */}
                        <img src={Logo} alt="" />


                    </a>
                    <button className="navbar-toggler ml-1" type="button" data-toggle="collapse" data-target="#collapsingNavbar2">
                        <span className="navbar-toggler-icon"></span>
                    </button>


                    <div className=" nav-btn navbar-collapse collapse justify-content-between align-items-center w-100"
                        id="collapsingNavbar2">

                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>

                            <li className="nav-item active">
                                <a className="nav-link" href="#">Categories <i className="fas fa-caret-down"></i></a>
                                <div className="dropdown">
                                    <ul>
                                        {
                                            navcategories.map((c, i) => (

                                                <li className="dropdown-link" key={i}>
                                                    <a href="#">{c.name}<i className="fas fa-caret-down"></i></a>
                                                    <div className="dropdown second">
                                                        <ul>
                                                            {
                                                                c.subcategory.map((sub, j) => (

                                                                    <li key={j} className="dropdown-link third">
                                                                        <a href="#">{sub.subcategory_name}<i className="fas fa-caret-down"></i></a>
                                                                        <div className="dropdown second">
                                                                            <ul>

                                                                                {
                                                                                    sub.subsubcategory.map((subsub, k) => (

                                                                                        <li className="dropdown-link" key={k}>
                                                                                            <a href="#">{subsub.sub_subcategory_name}</a>
                                                                                        </li>


                                                                                    ))
                                                                                }
                                                                                {
                                                                                    sub.subsubcategory.length > 1 &&
                                                                                    <div className="arrow"></div>
                                                                                }


                                                                            </ul>
                                                                        </div>
                                                                    </li>

                                                                ))

                                                            }
                                                            {
                                                                c.subcategory.length > 1 &&
                                                                <div className="arrow"></div>
                                                            }

                                                        </ul>
                                                    </div>
                                                </li>

                                            ))
                                        }

                                    </ul>
                                </div>

                            </li>

                            <li className="nav-item">
                                <Link to="/shop" className="nav-link">Shop</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Other Services</a>
                            </li>
                            {
                                isAuthenticated ?

                                    <li className="nav-item active">
                                        <a className="nav-link" href="#">My Account <i className="fas fa-caret-down"></i></a>
                                        <div className="dropdown">
                                            <ul>
                                                <li className="dropdown-link">
                                                    <a href="#">My Profile</a>

                                                </li>
                                                <li className="dropdown-link">
                                                    <a href="#">My Orders</a>
                                                </li>


                                                <li className="dropdown-link">
                                                    <a href="#" onClick={logout}>LogOut</a>
                                                </li>

                                            </ul>
                                        </div>

                                    </li>


                                    :


                                    <li className="nav-item">
                                        <Link to="/signin" className="nav-link" >Sign In</Link>
                                    </li>


                            }

                            <li className="nav-item">
                                <Link className="nav-link" to="/view/cart">

                                    <span className="fa fa-shopping-basket"></span>
                                    <span className="cart_count">( {shoppingCart.length} ) </span>

                                </Link>
                            </li>
                        </ul>

                    </div>
                </div >
            </nav >


        </div >


    )
}
