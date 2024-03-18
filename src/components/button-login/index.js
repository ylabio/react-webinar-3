import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { Link } from "react-router-dom";
import "./style.css";

function ButtonLogin({title, profilePath }) {
  const cn = bem("ButtonLogin");
  // const userName = user && user.profile ? user.profile.name : "Guest";
  return (
    <div className={cn("wrapper")}>
    <div className={cn("users-name")}></div>
      <Link to={profilePath}>
        <button className={cn("button")} >
          {title}
        </button>
      </Link>
    </div>
  );
}
ButtonLogin.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  profilePath: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};

export default memo(ButtonLogin);
