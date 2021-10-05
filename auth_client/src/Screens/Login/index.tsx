import React from 'react';
import { StaticLeft, SignIn } from '../../Component';

const Login = () => (
    <div>
        <div className="container-fluid">
            <div className="row">
                <StaticLeft />
                <div className="col-8">
                    <SignIn />
                </div>
            </div>
        </div>
    </div>
);

export default Login;
