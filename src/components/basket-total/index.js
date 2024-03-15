import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import "./style.css";

function BasketTotal(props) {
  const cn = bem("BasketTotal");
  const t = props.useTranslate;

  return (
    <div className={cn()}>
      <span className={cn("cell")}>{t("Итого")}:</span>
      <span className={cn("cell")}> {numberFormat(props.sum)} ₽</span>
      <span className={cn("cell")}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
};

BasketTotal.defaultProps = {
  sum: 0,
};

export default memo(BasketTotal);
