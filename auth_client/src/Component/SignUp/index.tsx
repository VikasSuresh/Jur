import React from 'react';
import '../../CSS/index.css';
import { observer } from 'mobx-react';
import { emailRegEx, passwordRegex } from '../../Helpers';
import Store from '../../Store';

const SignUp = observer(() => {
    const checkData = () => {
        const {
            first, last, email, password, verify, check,
        } = Store.user;

        if (first && last && email && password && verify && check) {
            return false;
        }
        return true;
    };

    const submit = async () => {
        const {
            first, last, email, password, verify,
        } = Store.user;

        if (!emailRegEx.test(email)) {
            Store.setError('emailErr');
        } else if (password !== verify || !passwordRegex.test(password)) {
            if (Store.user.err.filter((el) => el === 'passwordVerifyErr').length === 0) {
                Store.setError('passwordVerifyErr');
            }
        } else {
            Store.signUp(first, last, email, password);
        }
    };

    const activateSignUp = checkData();
    let errorWhenSubmitting;

    const { err } = Store.user;

    if (err.includes('passwordVerifyErr')) {
        errorWhenSubmitting = 'Password Must Have 8-16 char with 1 symbol and Verify - Password must be the same.';
    } else if (err.includes('emailErr')) {
        errorWhenSubmitting = 'It must be a Valid Email!';
    } else if (err.includes('usernameErr')) {
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

                <p>Let&apos;s get started with Jur</p>
                <p id="error">
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
                                Store.setFirst(e.target.value);
                                Store.errorHandler(e);
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
                                Store.setLast(e.target.value);
                                Store.errorHandler(e);
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
                                Store.setEmail(e.target.value);
                                Store.errorHandler(e);
                            }}
                        />
                    </div>

                    <div>
                        Password
                        <span className="required">*</span>
                    </div>
                    <div className="input-group mb-3">
                        <input
                            type={Store.user.showPassword ? 'password' : 'text'}
                            className={err.includes('password') ? 'form-control is-invalid' : 'form-control'}
                            autoComplete="on"
                            id="password"
                            placeholder="Password"
                            onChange={(e) => {
                                Store.setPassword(e.target.value);
                                Store.errorHandler(e);
                            }}
                        />
                        <button
                            className="btn bg-white border-start-0 border ms-n3"
                            type="button"
                            id="visibility"
                            onClick={() => Store.setShow()}
                        >
                            <span className={Store.user.showPassword ? 'Show' : 'Hide'}>{Store.user.showPassword ? 'Show' : 'Hide'}</span>
                        </button>
                    </div>
                    <div>
                        Verify Password
                        <span className="required">*</span>
                    </div>
                    <div className="input-group mb-3">
                        <input
                            type={Store.user.showVerify ? 'password' : 'text'}
                            className={err.includes('verifyPassword') ? 'form-control is-invalid' : 'form-control'}
                            autoComplete="on"
                            id="verifyPassword"
                            placeholder="Password"
                            onChange={(e) => {
                                Store.setVerify(e.target.value);
                                Store.errorHandler(e);
                            }}
                        />
                        <button
                            className="btn bg-white border-start-0 border ms-n3"
                            type="button"
                            id="visiblity"
                            onClick={() => Store.setShowVerify()}
                        >
                            <span className={Store.user.showVerify ? 'Show' : 'Hide'}>{Store.user.showVerify ? 'Show' : 'Hide'}</span>
                        </button>
                    </div>

                    <div className="col-12">
                        <div className="form-check">
                            <input
                                defaultChecked={Store.user.check}
                                className="form-check-input"
                                type="checkbox"
                                id="gridCheck"
                                onChange={(e) => Store.setCheck(e.target.checked)}
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
                <div id="signUpfooter">Copyright &copy;2021 Product By Jur Inc.</div>
            </div>
        </div>
    );
});

export default SignUp;
