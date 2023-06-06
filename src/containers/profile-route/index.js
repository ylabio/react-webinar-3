import React, { memo, useEffect } from 'react';
import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import useSelector from "../../hooks/use-selector";
import Login from '../../app/login';

function ProfileRoute({children}) {

    const navigate = useNavigate()
    const select = useSelector(state => ({
    isAuth: state.user.isAuth,
    isChecked: state.user.isChecked
  }))

    useEffect(() => {
        if (!select.isAuth && select.isChecked){
            navigate('/login');
       }
    })

  return <>{select.isAuth  ? children : <></>}</>;
}

export default memo(ProfileRoute);