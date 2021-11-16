import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { retrive, create, BASE_URL } from '../config/Service';
import { isAuthenticated } from '../config/Auth';

async function loginUser(credentials) {
    return axios.post(`${BASE_URL}/login`, credentials)
        .then(response => response)
        .catch(error => alert("Something went wrong!"))
}

function Login() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();


    const history = useHistory();

    const handleSubmit = async e => {
        e.preventDefault();
        let response = await loginUser({ email, password });
        console.log(response);
        if (response.data.user) {

            localStorage.setItem("user-info", JSON.stringify(response.data.user));
            localStorage.setItem("token", JSON.stringify(response.data.token));
            history.push("/admin/dashboard");
            window.location.reload();


        } else {
            return alert('Credentials doesnot match!');
        }
    }

    useEffect(() => {
        // window.localStorage.removeItem("user-info");
        // window.localStorage.removeItem("token");
        if (isAuthenticated) {
            history.push("/admin/dashboard");
            // window.location.reload();

        }
        else {
            history.push("/admin/login");
            // window.location.reload();
        }

    }, [])

    return (
        <div>


            <div className="login-page">
                <div className="login-box">
                    <div className="login-logo">
                        <a href="">  <img src="/Backend/assets/dist/img/logo2.png" alt="" /></a>
                    </div>

                    <div className="card">
                        <div className="card-body login-card-body">
                            <p className="login-box-msg">Sign in to start your session</p>

                            <form onSubmit={handleSubmit}>
                                <div className="input-group mb-3">
                                    <input type="email" className="form-control" onChange={e => setEmail(e.target.value)} placeholder="Email" />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-envelope"></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <input type="password" className="form-control" onChange={e => setPassword(e.target.value)} placeholder="Password" />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-lock"></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">


                                    <div className="col-4">
                                        <button type="submit" className="btn  btn-block" style={{ backgroundColor: '#C12200', color: 'white' }}>Sign In</button>
                                    </div>

                                </div>
                            </form>




                            <p className="mb-1">
                                <a href="forgot-password.html">I forgot my password</a>
                            </p>

                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}
export default Login