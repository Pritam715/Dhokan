import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { createData } from '../../../Backend/components/config/Service';
import { Alert } from 'react-bootstrap';


export default function Resend() {
    const history = useHistory();
    const [error_msg, setErrorMsg] = useState('');

    const [emailormobile, setEmailorMobile] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            'emailormobile': emailormobile
        }
        let response = await createData('/resend-otp', { data });
        // console.log(response.data.message);
        if (response.data.errormessage) {
            setErrorMsg(response.data.errormessage);
        }
        if (response.data.message == 'success') {
            history.push(`/verify-account/${emailormobile}`);

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
                                    <h5><strong>Please Enter Your Email or Mobile Number to activate your account!</strong></h5>
                                    {/* <hr style={{ borderTop: '2px solid #C12200' }}></hr>
                                    <p>A OTP(One Time Passcode) has been sent to {email}.</p>
                                    <p>Please Enter the OTP in the Field below to verify your Account</p> */}
                                    {
                                        error_msg &&

                                        <Alert variant="danger" onClick={e => setErrorMsg()} dismissible>
                                            <h5>{error_msg}</h5>
                                        </Alert>

                                    }
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group p-4">
                                            <input type="text" className="form-control" style={{ padding: 10, minWidth: 400 }} onChange={e => setEmailorMobile(e.target.value)} placeholder="soomeone@example.com" />
                                        </div>
                                        <div className="row mb-3 px-3 justify-content-center"> <button type="submit" className="btn login-btn">Submit</button> </div>
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
