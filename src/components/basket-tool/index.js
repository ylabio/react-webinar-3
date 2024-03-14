import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat, plural, getTranslation } from "../../utils";
import "./style.css";
import useTranslation from "../../hooks/useTranslation";

function BasketTool({ sum, amount, onOpen, getTranslation }) {
  const cn = bem("BasketTool");

  let cartHas = "";

  if (amount) {
    const pluralForms = getTranslation
      ? getTranslation("items")
      : { one: "товар", few: "товара", many: "товаров" };
    cartHas = `${amount} ${plural(amount, {
      one: pluralForms.one,
      few: pluralForms.few,
      many: pluralForms.many,
    })} / ${numberFormat(sum)} ₽`;
  } else {
    cartHas = getTranslation ? getTranslation("empty") : "пусто";
  }

  return (
    <div className={cn()}>
      <span className={cn("label")}>
        {getTranslation ? getTranslation("inCart") : "В корзине"}:
      </span>
      <span className={cn("total")}>{cartHas}</span>
      <button onClick={onOpen}>
        {getTranslation ? getTranslation("open") : "Перейти"}
      </button>
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
