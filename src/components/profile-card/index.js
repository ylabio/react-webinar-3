import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";

function ProfileCard(props) {
  return (
    <div className="ProfileCard">
      <h1>{props.t("profile")}</h1>
      <div className="ProfileCard-info">
        {" "}
        <div className="ProfileCard-label">
          {props.t("profile.name")}:{" "}
        </div>{" "}
        <div className="ProfileCard-value">{props.name}</div>
      </div>
      <div className="ProfileCard-info">
        {" "}
        <div className="ProfileCard-label">
          {props.t("profile.phoneNumber")}:{" "}
        </div>
        <div className="ProfileCard-value">{props.phoneNumber}</div>
      </div>
      <div className="ProfileCard-info">
        {" "}
        <div className="ProfileCard-label">email: </div>
        <div className="ProfileCard-value">{props.email}</div>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  name: PropTypes.string,
  phoneNumber: PropTypes.string,
  email: PropTypes.string,
  t: PropTypes.func,
};

ProfileCard.defaultProps = {
  t: (text) => text,
};

export default memo(ProfileCard);
