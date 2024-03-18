import React from 'react'
import "./style.css"
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname"
import { Link } from 'react-router-dom'

function ProfileMenu(props) {

    const cn = bem("Profile-Menu")

    return (
        <div className={cn()}>
            {props.isAuthenticated && <Link className={cn("user-name")} to = "/profile">{props.profile.name}</Link>}
            {props.isAuthenticated ?  
            <button onClick = {props.logoutHandler}>
                {props.t("profile-nav.exit")}
            </button> :  
            <button onClick = {props.loginHandler}>
                {props.t("profile-nav.enter")}
            </button>}
           
        </div>
    )
}

ProfileMenu.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    profile: PropTypes.shape({
        name: PropTypes.string
    }),
    logoutHandler: PropTypes.func.isRequired,
    loginHandler: PropTypes.func.isRequired,
    t: PropTypes.func
};

export default ProfileMenu