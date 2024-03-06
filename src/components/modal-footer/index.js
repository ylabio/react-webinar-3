import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const ModalFooter = ({ totalPrice }) => {
  const cn = bem("ModalFooter");

  return (
    <div className={cn()}>
      <div className={cn("total")}>Итого</div>
      <div className={cn("price")}>{totalPrice} ₽</div>
    </div>
  );
};

ModalFooter.propTypes = {
  totalPrice: PropTypes.number,
};

export default React.memo(ModalFooter);
