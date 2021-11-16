import React, { useState, useEffect } from 'react';
import './SignIn.css';
import { Link, useHistory } from 'react-router-dom';
import { createData, retriveData } from '../../../Backend/components/config/Service';
import Logo from '../../../../../public/Frontend/assets/images/logo2.png';
import { useForm } from 'react-hook-form';
import HashLoader from "react-spinners/HashLoader";

export default function Signup() {

    const history = useHistory();

    const [loading, setLoading] = useState(false);
    const [emailerror, setEmailError] = useState('');
    const [mobileerror, setMobileError] = useState('');



    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        // console.log(data);
        setEmailError();
        setMobileError();
        setLoading(true);
        let response = await createData('/signup', { data });

        if (response.data.message == 'success') {
            // history.push({
            //     pathname: '/verify-account',
            //     search: `?query=${data.email}`,
            //     state: { email: data.email }
            // });
            history.push(`/verify-account/${data.email}`);
        }
        else if (response.data.emailerror) {
            setLoading(false);
            setEmailError(response.data.emailerror);

        }
        else if (response.data.mobileerror) {
            setLoading(false);
            setMobileError(response.data.mobileerror)

        }
        else {
            setLoading(false);
        }
    }


    useEffect(() => {
        window.scrollTo(0, 0);

    }, []);


    return (
        <div>


            {
                loading ?

                    <div className="container" style={{ height: 600 }}>
                        <div className="row text-center h-100">
                            <div className="col-md-12 text-center my-auto">
                                <div>
                                    <HashLoader color={'#C12200'} loading={loading} size={150} />

                                </div>
                            </div>
                        </div>

                    </div>

                    :

                    <section>
                        <div className="container px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
                            <div className="card card0 border-0">
                                <div className="row d-flex">
                                    <div className="col-lg-6">
                                        <div className="card2 card border-0 px-4 py-5">
                                            <div className="row mb-4 px-3">
                                                <h6 className="mb-0 mr-4 mt-2">Sign Up with</h6>
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
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div className="row px-3 mb-3">
                                                    <label className="mb-1">
                                                        <h6 className="mb-0 text-sm">UserName</h6>
                                                    </label>
                                                    <input type="text" name="username" {...register("username",
                                                        {
                                                            required:
                                                            {
                                                                value: true,
                                                                message: "UserName is Required"
                                                            },
                                                            minLength:
                                                            {
                                                                value: 4,
                                                                message: "UserName Must be more then 4 characters"
                                                            },
                                                            maxLength:
                                                            {
                                                                value: 20,
                                                                message: "UserName Must be Less Then 20 characters"
                                                            }
                                                        })} placeholder="UserName" />
                                                    <small className="text-danger mt-0"><b>{errors.username && errors.username.message}</b></small>
                                                </div>
                                                <div className="row px-3 mb-3">
                                                    <label className="mb-1">
                                                        <h6 className="mb-0 text-sm">Email</h6>
                                                    </label>
                                                    <input type="email" name="email" {...register("email",
                                                        {
                                                            required:
                                                            {
                                                                value: true,
                                                                message: "Email is Required"
                                                            },
                                                            pattern:
                                                            {
                                                                value: /^\S+@\S+$/i,
                                                                message: "Email is Not Valid"
                                                            }


                                                        })} placeholder="Enter Your Email" />
                                                    {
                                                        emailerror &&
                                                        <small className="text-danger mt-0"><b>{emailerror}</b></small>

                                                    }
                                                    <small className="text-danger mt-0"><b>{errors.email && errors.email.message}</b></small>

                                                </div>
                                                <div className="row px-3 mb-3"> <label className="mb-1">
                                                    <h6 className="mb-0 text-sm">Mobile No</h6>
                                                </label> <input type="number" name="mobile_no" {...register("mobile_no",
                                                    {
                                                        required:
                                                        {
                                                            value: true,
                                                            message: "Mobile No is Required"
                                                        },
                                                        minLength:
                                                        {
                                                            value: 10,
                                                            message: "Mobile Must be 10 digit"
                                                        },
                                                        maxLength:
                                                        {
                                                            value: 11,
                                                            message: "Mobile should not be more then 10 digit"
                                                        },


                                                    })} placeholder="Enter Mobile No" />
                                                    {
                                                        mobileerror &&
                                                        <small className="text-danger mt-0"><b>{mobileerror}</b></small>

                                                    }
                                                    <small className="text-danger mt-0"><b>{errors.mobile_no && errors.mobile_no.message}</b></small>

                                                </div>

                                                <div className="row px-3 mb-3" > <label className="mb-1">
                                                    <h6 className="mb-0 text-sm">Password</h6>
                                                </label> <input type="password" name="password" {...register("password",
                                                    {
                                                        required:
                                                        {
                                                            value: true,
                                                            message: "Passsword is Required"
                                                        },
                                                        minLength:
                                                        {
                                                            value: 6,
                                                            message: "Password Must be atleast 6 characters"
                                                        },
                                                        pattern:
                                                        {
                                                            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/,
                                                            message: "Password should contain atleast uppercase and numbers as Character "
                                                        }
                                                    })} placeholder="Enter password" />
                                                    <small className="text-danger mt-0"><b>{errors.password && errors.password.message}</b></small>


                                                </div>

                                                <div className="row mb-3 px-3"> <button type="submit" className="btn login-btn text-center">SignUp</button> </div>
                                            </form>
                                            <div className="row mb-4 px-3"> <small className="font-weight-bold">Already have an account? <Link to="/signin" className="text-danger ">SignIn</Link></small> </div>
                                        </div>

                                    </div>
                                    <div className="col-lg-6">
                                        <div className="card1 w-100 pt-4">
                                            {/* <div className="row"> <img src={Logo} className="logo" /> </div> */}
                                            <div className="justify-content-center p-4" style={{ textAlign: 'center', color: '#C12200' }}>
                                                <h2><strong><b>Welcome To Dhokan</b></strong></h2>
                                            </div>
                                            <div className="row px-3 justify-content-center mt-4">
                                                <img src="Frontend/assets/Images/signup.png" className="image w-100 " />
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>

                    </section>


            }



        </div >
    )
}
