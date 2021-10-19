import axios from 'axios';
import React, { useState } from 'react';
import '../../CSS/index.css';
import { emailRegEx } from '../../Helpers';

interface LoginResponse {
    detail: String,
    user: {
        username: String,
        email: String,
    },
    token: String
}

const SignIn = () => {
    const [user, setUser] = useState({
        email: '',
        password: '',
        check: false,
    });

    const [show, setShow] = useState(true);

    const [err, setError] = useState<String[]>([]);

    const errorHandler = (e: any) => {
        setError((state) => (
            e.target.value === '' ? [e.target.id, ...state] : state.filter((el) => el !== e.target.id)
        ));
    };

    const checkData = () => {
        const {
            email, password,
        } = user;

        if (email && password) {
            return false;
        }
        return true;
    };

    const submit = async () => {
        const { email, password } = user;
        if (!emailRegEx.test(email)) {
            setError((state) => ([
                ...state,
                'emailErr',
            ]));
        } else {
            try {
                const { data }: { data: LoginResponse } = await axios.post(`${process.env.REACT_APP_SERVER_API}/auth/login/`,
                    { email, password },
                    { withCredentials: true });

                localStorage.setItem('name', JSON.stringify(data.user.username));
                localStorage.setItem('token', JSON.stringify(data.token));
                window.location.href = '/';
            } catch (error) {
                setError(['invalidCred']);
            }
        }
    };

    const activateSignIn = checkData();

    let errorWhenSubmitting;

    if (err.includes('emailErr')) {
        errorWhenSubmitting = 'It must be a Valid Email!';
    } else if (err.includes('invalidCred')) {
        errorWhenSubmitting = 'Invalid Credentials';
    } else {
        errorWhenSubmitting = '';
    }

    return (
        <div className="container">
            <div className="SignUp">
                {'New to Jur? '}
                <a href="/register">Sign Up</a>
            </div>

            <div className="col-6 form" style={{ paddingTop: '170px' }}>
                <h4>Sign In</h4>

                <p>Let&apos;s get started with Jur</p>
                <p style={{ color: 'red' }}>
                    {errorWhenSubmitting}
                </p>
                <form className="row g-3">
                    <div>
                        Email Address
                        <span className="required">*</span>
                    </div>
                    <div className="col-mb-3">
                        <input
                            type="email"
                            className={err.includes('email') ? 'form-control is-invalid' : 'form-control'}
                            id="email"
                            placeholder="Email Address"
                            onChange={(e) => {
                                setUser((state: any) => ({ ...state, email: e.target.value }));
                                errorHandler(e);
                            }}
                        />
                    </div>

                    <div>
                        Password
                        <span className="required">*</span>
                        <a id="forgot" href="/login">Forgot Password</a>
                    </div>
                    <div className="input-group mb-3">
                        <input
                            type={show ? 'password' : 'text'}
                            className={err.includes('password') ? 'form-control is-invalid' : 'form-control'}
                            autoComplete="on"
                            id="password"
                            placeholder="Password"
                            onChange={(e) => {
                                setUser((state: any) => ({ ...state, password: e.target.value }));
                                errorHandler(e);
                            }}
                        />
                        <button
                            className="btn bg-white border-start-0 border ms-n3"
                            type="button"
                            style={{ zIndex: 100 }}
                            onClick={() => setShow((state: any) => !state)}
                        >
                            <span className={show ? 'Show' : 'Hide'}>{show ? 'Show' : 'Hide'}</span>
                        </button>
                    </div>

                    <div className="col-12">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="gridCheck"
                                onChange={(e) => setUser((state: any) => ({ ...state, check: e.target.checked }))}
                            />
                            Remember Me
                        </div>
                    </div>

                    <div className="col-12">
                        <button
                            type="button"
                            className={activateSignIn ? 'btn btn-secondary' : 'btn btn-primary'}
                            disabled={activateSignIn}
                            onClick={submit}
                        >
                            Sign In
                        </button>
                    </div>
                </form>
                <div id="footer" style={{ paddingTop: '50%' }}>Copyright &copy;2021 Product By Jur Inc.</div>
            </div>
        </div>
    );
};

export default SignIn;
