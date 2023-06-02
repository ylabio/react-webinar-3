import React from "react";
import { Link } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
import './style.css';

const UserControl = ({ isAuthorized, user, loginTitle, logOutTitle, onLogOut }) => {

  const cn = bem('User-container')

  return (
    <div className={cn()}>
      {!isAuthorized ? (
        <Link className={cn('link')} to={"/login"}>{loginTitle}</Link>
      ) : (
        <>
        <Link className={cn('user-link')} to={"/profile"}>{user.username}</Link>
          <button className={cn('link')} onClick={onLogOut}>{logOutTitle}</button>
        </>
      )}
    </div>
  );
};

export default UserControl;
