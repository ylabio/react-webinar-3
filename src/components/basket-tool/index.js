import { memo, useEffect } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat, plural } from "../../utils";
import "./style.css";

function BasketTool({ sum, amount, onOpen, t, optionsConstructor, locale }) {
  const cn = bem("BasketTool");

  return (
    <div className={cn()}>
      <span className={cn("label")}>{t("in-basket")}:</span>
      <span className={cn("total")}>
        {amount
          ? `${amount} ${plural(
              amount,
              optionsConstructor("product"),
              locale
            )} / ${numberFormat(sum)} ₽`
          : `${t("empty")}`}
      </span>
      <button className={cn("toCartBtn")} onClick={onOpen}>
        {t("go-to-cart")}
      </button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  t: PropTypes.func.isRequired,
  optionsConstructor: PropTypes.func.isRequired,
  locale: PropTypes.string,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  t: () => {},
  optionsConstructor: () => {},
  locale: "ru",
};

export default memo(BasketTool);
