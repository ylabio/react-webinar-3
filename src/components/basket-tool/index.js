import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat, plural } from "../../utils";
import { Link } from "react-router-dom";
import "./style.css";

function BasketTool({ sum, amount, onOpen, useTranslate, changePage }) {
  const cn = bem("BasketTool");
  const t = useTranslate;

  const callbacks = {
    changePage: () => {
      changePage();
    },
  };

  return (
    <div className={cn()}>
      <Link to={"/"} onClick={callbacks.changePage}>
        {t("Главная")}{" "}
      </Link>
      <div className={cn("controls")}>
        <span className={cn("label")}>{t("В корзине")}:</span>
        <span className={cn("total")}>
          {amount
            ? `${amount} ${t(
                plural(amount, {
                  one: "товар",
                  few: "товара",
                  many: "товаров",
                })
              )} / ${numberFormat(sum)} ₽`
            : t("пусто")}
        </span>
        <button onClick={onOpen}>{t("Перейти")}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default memo(BasketTool);
