import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import { numberFormat, plural } from "../../utils";
import PropTypes from "prop-types";
import "./style.css";

function BasketTool({ sum, amount, onOpen, text }) {
  const cn = bem("BasketTool");

  return (
    <div className={cn()}>
      <span className={cn("label")}>{text[0]}</span>
      <span className={cn("total")}>
        {amount
          ? `${amount} ${plural(amount, {
              one: text[1],
              few: text[2],
              many: text[3],
            })} / ${numberFormat(sum)} ₽`
          : `${text[4]}`}
      </span>
      <button onClick={onOpen}>{text[5]}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  text: PropTypes.arrayOf(PropTypes.string),
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  text: ["В корзине:", "товар", "товара", "товаров", "пусто", "Перейти"],
};

export default memo(BasketTool);
