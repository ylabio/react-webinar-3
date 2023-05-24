import React, { memo } from "react";
import { Link } from "react-router-dom";
import browserRoutes from "../../app/lib/browserRoutes";
import "./index.css";

const ContentHeader = ({ children }) => {
  return (
    <div className="ContentHeader">
      <Link to={browserRoutes.home}>Главная</Link>
      {children}
    </div>
  );
};

export default memo(ContentHeader);
