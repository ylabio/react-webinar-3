import React, {memo, useEffect} from "react";
import LogoutBtn from "../logout-btn";
import LoginBtn from "../login-btn";
import { cn as bem } from "@bem-react/classname";
import PropTypes from 'prop-types';
import 'style.css'
import { Link } from "react-router-dom";
import useTranslate from "../../hooks/use-translate";

function Auth({user, isAuth, signOut}) {

    const cn = bem('Auth-header')
    const {t} = useTranslate()

    return (
        <div className={cn()}>
            {
            user && isAuth
            ? 
            <span className={cn('logged')}>
                <Link className={cn('username')} to={'/profile'}>{user.profile.name}</Link>
                <LogoutBtn title={t('quit')} signOut={signOut}/> 
            </span>
            : 
            <LoginBtn title={t('enter')}/>
            }
        </div>
    )
}

Auth.propTypes = {
    isAuth: PropTypes.bool,
}
Auth.defaltProps = {
    signOut: () => {}
}

export default memo(Auth);