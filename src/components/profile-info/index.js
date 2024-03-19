import { memo } from "react"
import "./style.css"
import PropTypes from 'prop-types';

function ProfileInfo({title, name, phone, email, user}){

    return(
        <div className="ProfileInfo">
            <h1 className="ProfileInfo-title"> {title} </h1>
            <p className="Profile-value">{name}: <strong> {user.name} </strong></p>
            <p className="Profile-value">{phone}: <strong> {user.phone} </strong></p>
            <p className="Profile-value">email: <strong> {email} </strong></p>
        </div>
    )
}

ProfileInfo.defaultProps = {
    user: {
        profile: {
            name: '',
            phone: ''
        }
    },
    name: "",
    phone: ''
  }

export default memo(ProfileInfo)