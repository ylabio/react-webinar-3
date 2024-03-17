import { memo } from "react";
import "./style.css"

function ProfileCard(props) {
  return (
    <div className="ProfileCard">
      <h2 className="ProfileCard-title">{props.title}</h2>
      <ul className="ProfileCard-list">
        <li>Имя: <b>{props?.user?.profile?.name}</b></li>
        <li>Телефон: <b>{props?.user?.profile?.phone}</b></li>
        <li>email: <b>{props?.user?.email}</b></li>
      </ul>
    </div>
  )
}

export default memo(ProfileCard)