import React, { useContext, Redirect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthContext } from '../context/auth';

function AuthRoute({ component: Component, ...rest}) {
    const { user } = useContext(AuthContext);
    return (
        <Router>
        <Routes>
            <Route
                render = { (props) => user ? <Redirect to = '/'/> : <Component {...props} /> }
            />
        </Routes>
        </Router>
    )
}

export default AuthRoute;