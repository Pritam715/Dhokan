import React, { useState, useEffect } from 'react';
import './SignIn.css';
import { Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../../../../../public/Frontend/assets/images/logo2.png';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createData, retriveData } from '../../../Backend/components/config/Service';
import { Login } from '../actions';




export default function SignIn() {

    const dispatch = useDispatch();

    let history = useHistory();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [error_msg, setErrorMsg] = useState('');


    const onSubmit = async (data) => {
        console.log(data);
        setErrorMsg();
        let response = await createData('/signin', { data });
        console.log(response);

        if (response.data.errormessage) {
            setErrorMsg(response.data.errormessage);
        }
        else if (response.data.message == 'success') {
            // alert('Login Success');
            history.goBack();
            dispatch(Login({ token: response.data.token, user: response.data.user }));


            // localStorage.setItem("user-info", JSON.stringify(response));
            // localStorage.setItem("token", JSON.stringify(response.data.token));

        }





    }

    useEffect(() => {

    }, [])



    return (
        <div>
            <section>
                <div className="container px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
                    <div className="card card0 ">
                        <div className="row d-flex">
                            <div className="col-lg-6">
                                <div className="card1 justify-content-center w-100">
                                    {/* <div className="row"> <img src={Logo} className="logo" /> </div> */}
                                    {/* <div className="row justify-content-center w-100 p-4"> */}
                                    <img src="Frontend/assets/Images/signin.jpg" className="image" />
                                    {/* </div> */}
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="card2 card border-0 px-4 py-5">
                                    <div className="row mb-4 px-3">
                                        <h6 className="mb-0 mr-4 mt-2">Sign in with</h6>
                                        <div className="facebook text-center mr-3">
                                            <div className="fa fa-facebook"></div>
                                        </div>
                                        <div className="twitter text-center mr-3">
                                            <div className="fa fa-twitter"></div>
                                        </div>
                                        <div className="linkedin text-center mr-3">
                                            <div className="fa fa-linkedin"></div>
                                        </div>
                                    </div>
                                    <div className="row px-3 mb-4">
                                        <div className="line"></div> <small className="or text-center">Or</small>
                                        <div className="line"></div>
                                    </div>
                                    {
                                        error_msg &&

                                        <Alert variant="danger" onClick={e => setErrorMsg()} dismissible>
                                            <h5>{error_msg}</h5>
                                        </Alert>

                                    }
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="row px-3"> <label className="mb-1">
                                            <h6 className="mb-0 text-sm">Phone No or Email Address</h6>
                                        </label>
                                            <input type="text" name="emailormobile" {...register("emailormobile",
                                                {
                                                    required:
                                                    {
                                                        value: true,
                                                        message: "Email or Mobile No is Required"
                                                    },

                                                })} placeholder="Enter Your Email or Mobile No" />

                                            <small className="text-danger mt-0"><b>{errors.emailormobile && errors.emailormobile.message}</b></small>

                                        </div>
                                        <div className="row px-3"> <label className="mb-1">
                                            <h6 className="mb-0 text-sm">Password</h6>
                                        </label>
                                            <input type="password" name="password" {...register("password",
                                                {
                                                    required:
                                                    {
                                                        value: true,
                                                        message: "Passsword is Required"
                                                    },

                                                })} placeholder="Enter password" />
                                            <small className="text-danger mt-0"><b>{errors.password && errors.password.message}</b></small>

                                        </div>
                                        <div className="row px-3 mb-4">
                                            <div className="custom-control custom-checkbox custom-control-inline"> <input id="chk1" type="checkbox" name="chk" className="custom-control-input" /> <label htmlFor="chk1" className="custom-control-label text-sm">Remember me</label> </div> <a href="#" className="ml-auto mb-0 text-sm">Forgot Password?</a>
                                        </div>
                                        <div className="row mb-3 px-3"> <button type="submit" className="btn login-btn text-center">Login</button> </div>
                                    </form>
                                    <div className="row px-3"> <small className="font-weight-bold">If Account is not Verified Yet? <Link to="/resend-otp" className="text-danger ">Resend OTP</Link></small> </div>

                                    <div className="row mb-4 px-3"> <small className="font-weight-bold">Don't have an account? <Link to="/signup" className="text-danger ">SignUp</Link></small> </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}
