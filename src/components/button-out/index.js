import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { Link } from "react-router-dom";
import "./style.css";

function ButtonOut({ title, to, user, profilePath, onClick }) {
  const cn = bem("ButtonOut");
  const userName = user && user.profile && user.profile.name;
  return (
    <div className={cn("wrapper")}>
      <div className={cn("users")}>
        <Link to={profilePath}>
          <div className={cn("users-name")}>{userName}</div>
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
  user: PropTypes.object.isRequired,
};

export default memo(ButtonOut);
