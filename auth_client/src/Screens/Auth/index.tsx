import React from 'react';
import { StaticLeft } from '../../Component';

const Auth = ({ passedComponent: PassedComponent }: any) => (
    <div>
        <div className="container-fluid">
            <div className="row">
                <StaticLeft />
                <div className="col-8">
                    <PassedComponent />
                </div>
            </div>
        </div>
    </div>
);

export default Auth;
