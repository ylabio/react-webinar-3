import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css"

function ProfileCard(props) {
  return (
    <div className="ProfileCard">
      <h2 className="ProfileCard-title">{props.title}</h2>
      <ul className="ProfileCard-list">
        <li>{props.name}: <b>{props?.user?.profile?.name}</b></li>
        <li>{props.phone}: <b>{props?.user?.profile?.phone}</b></li>
        <li>email: <b>{props?.user?.email}</b></li>
      </ul>
    </div>
  )
}

ProfileCard.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string,
  phone: PropTypes.string,
  user: PropTypes.shape({
    profile: PropTypes.shape({
      name: PropTypes.string,
      phone: PropTypes.string
    }),
    email: PropTypes.string
  })
};
export default memo(ProfileCard)