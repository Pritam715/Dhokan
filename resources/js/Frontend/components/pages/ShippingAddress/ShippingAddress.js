import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
// import '../../Auth/SignIn.css';

export default function ShippingAddress() {
    return (
        <div>
            <section>
                <div className="container px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
                    <div className="card card0 ">
                        <div className="row d-flex">
                            <div className="col-md-6">
                                <div className="justify-content-center w-100 border-0 px-4 py-5 m-4">
                                    <div className="mb-0 mr-4 mt-2 text-center">
                                        <h3 style={{ color: 'rgb(193, 34, 0)' }}><strong>SHIPPING ADDRESS</strong></h3>

                                    </div>
                                    <div className="p-4 mt-2">
                                        <form>
                                            <div className="form-group">
                                                <label>Full Name:</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="form-group">
                                                <label>Email:</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="form-group">
                                                <label>Mobile No:</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="form-group">
                                                <label>Address:</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                            <div className="form-group">
                                                <label>Pin Code:</label>
                                                <input type="text" className="form-control" />
                                            </div>

                                        </form>
                                    </div>

                                </div>
                            </div>
                            <div className="col-md-1" style={{ borderRight: '5px solid rgb(193, 34, 0)' }}>
                            </div>
                            <div className="col-md-5">
                                <div className=" justify-content-center w-100 border-0 px-4 py-5 m-4">
                                    <div className="text-center mb-0 mr-4 mt-2">
                                        <h2 style={{ color: 'rgb(193, 34, 0)' }}><strong>PAYMENT</strong></h2>
                                    </div>

                                    <div className="p-4 mt-2" style={{ width: 400 }}>
                                        <form>
                                            <div className="form-check">
                                                <input
                                                    type="radio" name="payment"
                                                    id="paypal" class="input-hidden" />
                                                <label for="paypal">
                                                    <img src="/Frontend/assets/images/paypal.png" width="80px" height="80px" />
                                                </label>

                                            </div>
                                            <div className="form-check">
                                                <input
                                                    type="radio" name="payment"
                                                    id="esewa" class="input-hidden" />
                                                <label for="esewa">
                                                    <img src="/Frontend/assets/images/esewa.png" width="80px" height="80px" />
                                                </label>

                                            </div>
                                            <div className="form-check">
                                                <input
                                                    type="radio" name="payment"
                                                    id="Khalti" class="input-hidden" />
                                                <label for="Khalti">
                                                    <img src="/Frontend/assets/images/khalti.png" width="80px" height="80px" />

                                                </label>

                                            </div>
                                            <div className="form-check">
                                                <input
                                                    type="radio" name="payment"
                                                    id="cod" class="input-hidden" />
                                                <label for="cod">
                                                    <img src="/Frontend/assets/images/cod.png" width="80px" height="80px" />

                                                </label>

                                            </div>




                                        </form>
                                    </div>




                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </div>
    )
}
