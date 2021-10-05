/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
    Route, Redirect,
} from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }: any) => (
    <Route
        {...rest}
        render={(props) => (
            localStorage.getItem('token')
                ? (
                    <Component {...props} />
                )
                : (
                    <Redirect to="/login" />
                )
        )}
    />
);

export default ProtectedRoute;
