import React, { useState } from "react";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import "./style.css";

const UserInfo = ({ user }) => {
  const cn = bem("UserInfo");

  return (
    <div className={cn("")}>
      <h2 className={cn("title")}>Профиль</h2>
      <div className={cn("string")}>
        Имя:&nbsp;
        <span className={cn("info")}>{user?.profile.name}</span>
      </div>
      <div className={cn("string")}>
        Телефон:&nbsp;
        <span className={cn("info")}>{user?.profile.phone}</span>
      </div>
      <div className={cn("string")}>
        email:&nbsp;
        <span className={cn("info")}>{user?.email}</span>
      </div>
    </div>
  );
};

UserInfo.propTypes = {
  user: PropTypes.object,
};

UserInfo.defaultProps = {
  user: null,
};
export default UserInfo;
