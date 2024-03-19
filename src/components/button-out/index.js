import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { Link } from "react-router-dom";
import "./style.css";

function ButtonOut({  title, to,user,profilePath,onClick}) {
  const cn = bem("ButtonOut");
  const  userProfile = user && user.profile;
  return (
    <div className={cn("wrapper")}>
      <div className={cn("users")}>
      <Link to={profilePath}>
       <div className={cn("users-name")}>{user.profile.name}</div>
       </Link>
       <Link to={to}>
        <button className={cn("button")} onClick={onClick}>
          {title}
        </button>
       </Link>
      </div>
    </div>
  );
}

ButtonOut.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired
};

export default memo(ButtonOut);