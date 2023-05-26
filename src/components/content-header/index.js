import React, { memo } from "react";
import { Link } from "react-router-dom";
import browserRoutes from "../../app/lib/browserRoutes";
import "./style.css";
import { useTranslation } from "../../store/translation";
import BasketTool from '../basket-tool'
import Menu from "../menu";

const ContentHeader = ({ onBasketOpen, basketAmount, basketSum, menuLinks }) => {

  return (
    <div className="ContentHeader">
      <Menu links={menuLinks} />
      <BasketTool onOpen={onBasketOpen} amount={basketAmount} sum={basketSum} />
    </div>
  );
};

export default memo(ContentHeader);
