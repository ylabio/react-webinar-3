import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
function NotFoundPage() {
  const location = useLocation();
  const cn = bem("Not-found");
  return (
    <div className={cn()}>
      <p className={cn("oops")}>Oops...</p>
      <div className={cn("404")}>404</div>
      <p className={cn("description")}>
        Страницы с таким маршрутом{" "}
        <span className={cn("path")}>{location.pathname}</span> не существует
      </p>
      <div>
        <Link to={"/"}>На главную {`==>`} </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
