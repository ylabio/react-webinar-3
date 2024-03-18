import React, { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function ProfileCart({ user }) {
  const cn = bem("ProfileCart");

  

  return (
    <div className={cn()}>
      <h2>Профиль</h2>
      <p>Имя:<span>{user.profile.name}</span></p>
      <p>Телефон: <span>{user.profile.phone}</span></p>
      <p>Email: <span>{user.email}</span></p>
    </div>
  );
}

ProfileCart.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.number,
    email: PropTypes.string,
  }),
};



export default memo(ProfileCart);
