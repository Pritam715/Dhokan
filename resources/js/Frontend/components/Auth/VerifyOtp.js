import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from "react-router-dom";
import { retriveData, createData } from '../../../Backend/components/config/Service';
import { Verified } from '../../../Backend/components/custom/toast';
import './VerifyOtp.css';
import { useDispatch } from 'react-redux';
import { Login } from '../actions';
export default function VerifyOtp() {

    const history = useHistory();
    const dispatch = useDispatch();

    const { email } = useParams();

    const [otp, setOtp] = useState('');
    // const [email, setEmail] = useState(email);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            'email': email,
            'otp': otp
        }
        console.log(data);
        let response = await createData('/verify-account', { data });
        console.log(response.data.token);
        console.log(response.data.user);
        if (response.data.message == 'success') {
            Verified.fire({
                icon: 'success',
                title: 'Your Account has been Verified',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }

            })
            history.push('/');
            dispatch(Login({ token: response.data.token, user: response.data.user }));


        }


    }
    useEffect(() => {
        window.scrollTo(0, 0);

    }, [])

    return (
        <div>
            <section>
                <div className="container">
                    <div className="row justify-content-center m-4">
                        <div className="col-md-8 m-4 justify-content-center">
                            <div className="card" style={{ minWidth: '40rem' }} >
                                <div className="card-body">
                                    <h5><strong>Validate OTP(One Time Passcode)</strong></h5>
                                    <hr style={{ borderTop: '2px solid #C12200' }}></hr>
                                    <p>A OTP(One Time Passcode) has been sent to {email}.</p>
                                    <p>Please Enter the OTP in the Field below to verify your Account</p>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group p-4">
                                            <input type="text" className="form-control" style={{ padding: 10, minWidth: 400 }} onChange={e => setOtp(e.target.value)} />
                                        </div>
                                        <div className="row mb-3 px-3  text-center"> <button type="submit" className="btn login-btn">Submit</button> </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

        </div>
    )
}
