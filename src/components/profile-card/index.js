import React from 'react'
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname"

function ProfileCard(props) {
    const cn = bem("Profile-Card")
    return (
        <div className={cn()}>
            <h2>
                Профиль
            </h2>
            <p>{props.t("profile.name")}: <b>{props.profile.name}</b></p>
            <p>{props.t("profile.phone")}: <b>{props.profile.phone}</b></p>
            <p>{props.t("profile.email")}: <b>{props.profile.email}</b></p>
        </div>
    )
}
ProfileCard.propTypes = {
    profile: PropTypes.shape({
        name: PropTypes.string.isRequired,
        phone: PropTypes.string,
        email: PropTypes.string
    }).isRequired,
    t: PropTypes.func
};

export default ProfileCard