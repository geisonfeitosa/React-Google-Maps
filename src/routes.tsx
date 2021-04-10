import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/home/home';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact></Route>
        </BrowserRouter>
    );
}

export default Routes;