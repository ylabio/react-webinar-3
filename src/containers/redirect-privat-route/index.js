import React from 'react';
import {Navigate} from 'react-router-dom';
import useSelector from '../../hooks/use-selector';

function RedirectPrivateRoute ({children, redirectTo}) {
    const isAuth = useSelector(state => state.authentication.isAuth);
    const waiting = useSelector(state => state.authentication.waiting);

    if (!isAuth && !waiting) {
        return <Navigate to={redirectTo}/>
    }

    return children;
}
 
export default RedirectPrivateRoute;