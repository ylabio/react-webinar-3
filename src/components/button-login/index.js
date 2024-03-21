import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { Link } from "react-router-dom";
import "./style.css";

function ButtonLogin({title, profilePath,onLogin }) {


  
  const cn = bem("ButtonLogin");
  return (
    <div className={cn("wrapper")}>
    <div className={cn("users-name")}></div>
      <Link to={profilePath}>
        <button className={cn("button")} onClick={onLogin}>
          {title}
        </button>
      </Link>
    </div>
  );
}
ButtonLogin.propTypes = {
  title: PropTypes.string.isRequired,
  profilePath: PropTypes.string.isRequired,
  onLogin: PropTypes.func,
};

export default memo(ButtonLogin);
