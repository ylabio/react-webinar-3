import {memo, useEffect} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { Link, useNavigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";

function AuthBar({t, logout, user}) {

    const cn = bem('AuthBar');

    const navigate = useNavigate();

    return (
        <div className={cn()}>
            {user ? <>
                <Link to="/profile">{user.username}</Link>
                <button onClick={logout}>{t("authbar.logout")}</button>
            </> : <button onClick={() => navigate('/login')}>{t("authbar.login")}</button>}
        </div>
    )
}

export default memo(AuthBar);