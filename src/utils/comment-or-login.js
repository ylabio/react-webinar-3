import useSelector from "../hooks/use-selector";
import { Link } from "react-router-dom";
import React from 'react';

function IsLogin({ Component, componentProps }) {
    const loginLink = "/login"; 
    const profileState = useSelector(state => ({
        name: state.session.user.profile?.name,
    }));

    if (!profileState.name) {
    
        return <p>Войдите, чтобы иметь возможность комментировать   <Link to={loginLink}>link</Link></p>;
    }

   
    return <Component {...componentProps} />;
}

export default IsLogin;