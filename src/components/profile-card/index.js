import { memo } from "react";
import "./style.css";

function ProfileCard(props) {
  return (
    <div className="ProfileCard">
      <h1>Профиль</h1>
      <div className="ProfileCard-info">
        {" "}
        <div className="ProfileCard-label">Имя: </div>{" "}
        <div className="ProfileCard-value">{props.name}</div>
      </div>
      <div className="ProfileCard-info">
        {" "}
        <div className="ProfileCard-label">Телефон: </div>
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

export default memo(ProfileCard);
