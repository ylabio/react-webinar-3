import React, { memo } from "react";
import { Link } from "react-router-dom";
import browserRoutes from "../../app/lib/browserRoutes";
import "./index.css";
import { useTranslation } from "../../store/translation";
import BasketTool from '../basket-tool'

const ContentHeader = ({ onBasketOpen, basketAmount, basketSum }) => {

	const {t} = useTranslation()

  return (
    <div className="ContentHeader">
      <Link to={browserRoutes.home}>{t("home")}</Link>
      <BasketTool onOpen={onBasketOpen} amount={basketAmount} sum={basketSum} />
    </div>
  );
};

export default memo(ContentHeader);
