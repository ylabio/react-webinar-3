import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import "./style.css";

function BasketTotal({ sum, t }) {
  const cn = bem("BasketTotal");
  return (
    <div className={cn()}>
      <span className={cn("cell_total")}>{t("total")}</span>
      <span className={cn("cell")}> {numberFormat(sum)} ₽</span>
      <span className={cn("cell")}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
  t: PropTypes.func.isRequired,
};

BasketTotal.defaultProps = {
  sum: 0,
  t: () => {},
};

export default memo(BasketTotal);
