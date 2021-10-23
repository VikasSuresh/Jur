import React from 'react';
import '../../CSS/index.css';
import { observer } from 'mobx-react';
import { emailRegEx } from '../../Helpers';
import Store from '../../Store';

const SignIn = observer(() => {
    const checkData = () => {
        const {
            email, password,
        } = Store.user;

        if (email && password) {
            return false;
        }
        return true;
    };

    const submit = async () => {
        const { email, password } = Store.user;
        if (!emailRegEx.test(email)) {
            Store.setError('emailErr');
        } else {
            try {
                Store.signIn(email, password);
            } catch (error) {
                Store.setError('invalidCred');
            }
        }
    };

    const activateSignIn = checkData();

    let errorWhenSubmitting;

    const { err } = Store.user;

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

            <div className="col-6 form" id="signInForm">
                <h4>Sign In</h4>

                <p>Let&apos;s get started with Jur</p>
                <p id="error">
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
                                Store.setEmail(e.target.value);
                                Store.errorHandler(e);
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
                            id="visibility"
                            type="button"
                            onClick={() => Store.setShow()}
                        >
                            <span className={Store.user.showPassword ? 'Show' : 'Hide'}>{Store.user.showPassword ? 'Show' : 'Hide'}</span>
                        </button>
                    </div>

                    <div className="col-12">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="gridCheck"
                                onChange={(e) => Store.setCheck(e.target.checked)}
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
                <div id="signInFooter">Copyright &copy;2021 Product By Jur Inc.</div>
            </div>
        </div>
    );
});

export default SignIn;
