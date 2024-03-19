import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { Link } from "react-router-dom";

function ProfileTool({ onClick, label, userName, path }) {
  const cn = bem("Profile-tool");

  return (
    <div className={cn()}>
      {userName && <Link to={path}>{userName}</Link>}
      <button type="button" onClick={onClick}>
        {label}
      </button>
    </div>
  );
}

export default memo(ProfileTool);
