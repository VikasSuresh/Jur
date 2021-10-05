import React from 'react';
import { StaticLeft, SignUp } from '../../Component';

const Register = () => (
    <div>
        <div className="container-fluid">
            <div className="row">
                <StaticLeft />
                <div className="col-8">
                    <SignUp />
                </div>
            </div>
        </div>
    </div>
);

export default Register;
