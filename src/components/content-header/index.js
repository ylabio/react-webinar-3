import React, { memo } from "react";
import { Link } from "react-router-dom";
import browserRoutes from "../../app/lib/browserRoutes";
import "./index.css";
import { useTranslation } from "../../store/translation";

const ContentHeader = ({ children }) => {

	const {t} = useTranslation()

  return (
    <div className="ContentHeader">
      <Link to={browserRoutes.home}>{t('home')}</Link>
      {children}
    </div>
  );
};

export default memo(ContentHeader);
