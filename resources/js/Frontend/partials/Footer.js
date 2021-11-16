import React from 'react';
import Logo from '../../../../public/Frontend/assets/images/logo2.png';

export default function Footer() {
    return (
        <div>
            <footer>
                <div className="container py-5 mt-4">
                    <div className="row">

                        <div className="col-12 col-md-12 col-lg-4">
                            <div className="company-info p-4">
                                <a href="index.html" className="footer-logo">
                                    <img src={Logo} alt="footer_logo" className="img-fluid" />
                                </a>
                                <p className="mt-4">
                                    Reference site about Lorem Ipsum, giving information on its origins, as well as a random
                                    Lipsum generator. Reference site about Lorem Ipsum, giving information on its origins, as
                                    well as a random
                                    Lipsum generator.
                                </p>
                                <div className="footer-social-link mt-5">
                                    <h6 className="poppins-bold text-white">Follow us</h6>
                                    <ul>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-facebook"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-twitter"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-linkedin"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fa fa-instagram"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>


                        <div className="col-12 col-md-12 col-lg-8">
                            <div className="row mt-4">
                                <div className="col-12 col-md-6">
                                    <div className="contact-info text-white">
                                        <h6 className="poppins-bold">
                                            <i className="fa fa-map-o pr-3" aria-hidden="true"></i>
                                            Butwal Traffic Chwok
                                        </h6>
                                        <p className="pl-5">Rupandehi, Nepal</p>
                                    </div>

                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="contact-info text-white">
                                        <h6 className="poppins-bold">
                                            <i className="fa fa-volume-control-phone pr-3" aria-hidden="true"></i>
                                            +977 071 597000
                                        </h6>
                                        <p className="pl-5">Give us a call</p>
                                    </div>

                                </div>
                            </div>
                            <div className="row mt-5">
                                <div className="col-12 col-md-12 col-lg-6 mb-3">
                                    <div className="footer-links">
                                        <h6 className="poppins-semibold text-white">Useful Links</h6>
                                        <div className="row">
                                            <div className="col-6">
                                                <ul>
                                                    <li>
                                                        <a href="#">About us</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Services</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Projects</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Our Team</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Contact us</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Blog</a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-6">
                                                <ul>
                                                    <li>
                                                        <a href="#">About us</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Services</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Projects</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Our Team</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Contact us</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Blog</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-12 col-md-12 col-lg-6 mb-3">
                                    <div className="footer-widget">
                                        <div className="section-heading">
                                            <h6 className="poppins-semibold text-white">Subscribe</h6>
                                            <span className="animate-border border-black"></span>
                                        </div>
                                        <p>
                                            Reference site about Lorem Ipsum, giving information on its origins, as well.</p>
                                        <form action="#" className="mt-4">
                                            <div className="form-row">
                                                <div className="col footer-form">
                                                    <input type="email" className="form-control" placeholder="Email Address" />
                                                    <button type="submit">
                                                        <i className="fa fa-send"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="copyright py-2">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <span>Copyright © Dhokan 2020, All Right Reserved</span>
                            </div>
                            <div className="col-md-6">
                                <div className="copyright-menu">
                                    <ul>
                                        <li>
                                            <a href="#">Terms</a>
                                        </li>
                                        <li>
                                            <a href="#">Privacy Policy</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    )
}
