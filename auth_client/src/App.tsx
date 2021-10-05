import React from 'react';
import {
    BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import { Login, Register, Home } from './Screens';
import { ProtectedRoute } from './Helpers';

const App = () => (
    <div>
        <Router>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <ProtectedRoute path="/" component={Home} />
            </Switch>
        </Router>
    </div>
);

export default App;
