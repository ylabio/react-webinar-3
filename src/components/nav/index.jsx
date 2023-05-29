import React from "react";
import "./style.css";
import { translate } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import { Link } from "react-router-dom";

const Nav = ({ lang, children }) => {
  const cn = bem("Nav");

  return (
    <div className={cn()}>
      <Link to={"/1"} className={cn("link")}>
        {translate(lang, "main")}
      </Link>
      {children}
    </div>
  );
};

export default Nav;
