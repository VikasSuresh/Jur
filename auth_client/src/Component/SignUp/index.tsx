import axios from 'axios';
import React, { useState } from 'react';
import '../../CSS/index.css';
import { emailRegEx, passwordRegex } from '../../Helpers';

interface RegisterResponse {
    username: String
    user: {
        username: String,
        email: String,
    },
    token: String
}

const SignUp = () => {
    const [user, setUser] = useState({
        first: '',
        last: '',
        email: '',
        password: '',
        verify: '',
        check: false,
    });

    const [show, setShow] = useState({
        password: true,
        verify: true,
    });

    const [err, setError] = useState<String[]>([]);

    const errorHandler = (e: any) => {
        setError((state) => (
            e.target.value === '' ? [e.target.id, ...state] : state.filter((el) => el !== e.target.id)
        ));
    };

    const checkData = () => {
        const {
            first, last, email, password, verify, check,
        } = user;

        if (first && last && email && password && verify && check) {
            return false;
        }
        return true;
    };

    const submit = async () => {
        const {
            first, last, email, password, verify,
        } = user;

        if (!emailRegEx.test(email)) {
            setError((state) => ([
                ...state,
                'email_err',
            ]));
        } else if (password !== verify || !passwordRegex.test(password)) {
            if (err.filter((el) => el === 'password_verify_err').length === 0) {
                setError((state) => ([
                    ...state,
                    'password_verify_err',
                ]));
            }
        } else {
            try {
                const { data }: { data: RegisterResponse } = await axios.post(`${process.env.REACT_APP_SERVER_API}/auth/register/`,
                    { username: `${first} ${last}`, email, password },
                    { withCredentials: true });
                localStorage.setItem('name', JSON.stringify(data.user.username));
                localStorage.setItem('token', JSON.stringify(data.token));
                window.location.href = '/';
            } catch (error) {
                setError(['username_err']);
            }
        }
    };

    const activateSignUp = checkData();
    let errorWhenSubmitting;

    if (err.includes('password_verify_err')) {
        errorWhenSubmitting = 'Password Must Have 8-16 char with 1 symbol and Verify - Password must be the same.';
    } else if (err.includes('email_err')) {
        errorWhenSubmitting = 'It must be a Valid Email!';
    } else if (err.includes('username_err')) {
        errorWhenSubmitting = 'User with this Email already exists.';
    } else {
        errorWhenSubmitting = '';
    }

    return (
        <div className="container">
            <div className="SignIn">
                {'Already a member? '}
                <a href="/login">Sign In</a>
            </div>

            <div className="col-6 form">
                <h4>Sign Up</h4>

                <p>{'Let\'s get started with Jur'}</p>
                <p style={{ color: 'red' }}>
                    {errorWhenSubmitting}
                </p>
                <form className="row g-3">

                    <div>
                        Full Name
                        <span className="required">*</span>
                    </div>
                    <div className="col-md-6">
                        <input
                            type="text"
                            className={err.includes('first') ? 'form-control is-invalid' : 'form-control'}
                            id="first"
                            placeholder="First Name"
                            onChange={(e) => {
                                setUser((state: any) => ({ ...state, first: e.target.value }));
                                errorHandler(e);
                            }}
                        />
                    </div>
                    <div className="col-md-6">
                        <input
                            type="text"
                            className={err.includes('last') ? 'form-control is-invalid' : 'form-control'}
                            id="last"
                            placeholder="Last Name"
                            onChange={(e) => {
                                setUser((state: any) => ({ ...state, last: e.target.value }));
                                errorHandler(e);
                            }}
                        />
                    </div>

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
                    </div>
                    <div className="input-group mb-3">
                        <input
                            type={show.password ? 'password' : 'text'}
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
                            onClick={() => setShow((state: any) => ({ ...state, password: !state.password }))}
                        >
                            <span className={show.password ? 'Show' : 'Hide'}>{show.password ? 'Show' : 'Hide'}</span>
                        </button>
                    </div>
                    <div>
                        Verify Password
                        <span className="required">*</span>
                    </div>
                    <div className="input-group mb-3">
                        <input
                            type={show.verify ? 'password' : 'text'}
                            className={err.includes('verifyPassword') ? 'form-control is-invalid' : 'form-control'}
                            autoComplete="on"
                            id="verifyPassword"
                            placeholder="Password"
                            onChange={(e) => {
                                setUser((state: any) => ({ ...state, verify: e.target.value }));
                                errorHandler(e);
                            }}
                        />
                        <button
                            className="btn bg-white border-start-0 border ms-n3"
                            type="button"
                            style={{ zIndex: 100 }}
                            onClick={() => setShow((state: any) => ({ ...state, verify: !state.verify }))}
                        >
                            <span className={show.verify ? 'Show' : 'Hide'}>{show.verify ? 'Show' : 'Hide'}</span>
                        </button>
                    </div>

                    <div className="col-12">
                        <div className="form-check">
                            <input
                                defaultChecked={user.check}
                                className="form-check-input"
                                type="checkbox"
                                id="gridCheck"
                                onChange={(e) => setUser((state: any) => ({ ...state, check: e.target.checked }))}
                            />
                            {'I agree to the '}
                            <a href="/">terms</a>
                            {' and '}
                            <a href="/">conditions</a>
                        </div>
                    </div>

                    <div className="col-12">
                        <button
                            type="button"
                            className={activateSignUp ? 'btn btn-secondary' : 'btn btn-primary'}
                            disabled={activateSignUp}
                            onClick={submit}
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
                <div id="footer">Copyright &copy;2021 Product By Jur Inc.</div>
            </div>
        </div>
    );
};

export default SignUp;