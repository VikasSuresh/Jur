import React from 'react';
import {
    BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import { SignIn, SignUp } from './Component';
import { Auth, Home } from './Screens';
import { ProtectedRoute } from './Helpers';

const App = () => (
    <div>
        <Router>
            <Switch>
                <Route path="/login" render={() => <Auth passedComponent={SignIn} />} />
                <Route path="/register" render={() => <Auth passedComponent={SignUp} />} />
                <ProtectedRoute path="/" component={Home} />
            </Switch>
        </Router>
    </div>
);

export default App;
