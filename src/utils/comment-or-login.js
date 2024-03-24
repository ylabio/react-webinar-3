import useSelector from "../hooks/use-selector";
import { Link } from "react-router-dom";
import React from 'react';

function IsLogin({ Component, componentProps, baseIndent, level }) {
    const loginLink = "/login"; 
    const paddingLeft = baseIndent * level + 40;
    const profileState = useSelector(state => ({
        name: state.session.user.profile?.name,
    }));

    if (!profileState.name) {
        return <p className="link" style={{ paddingLeft: `${paddingLeft}px` }}><Link to={loginLink}>Войдите</Link>, чтобы иметь возможность комментировать   </p>;
    }

    return <Component style={{ paddingLeft: `${paddingLeft}px` }} {...componentProps} />;
}

export default IsLogin;