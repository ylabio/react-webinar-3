import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import { Link } from "react-router-dom";

import "./style.css";

function btnMain() {
  const cn = bem("ButtonMain");
  return (
    <div className={cn()}>
      <Link to="/" className={cn("btnBack")}>
        <u className="flag-ButtonMain">Главная</u>
      </Link>
    </div>
  );
}

export default memo(btnMain);
