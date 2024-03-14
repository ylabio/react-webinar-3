import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat, plural } from "../../utils";
import "./style.css";
import { Link } from "react-router-dom";

function BasketTool({ sum, amount, onOpen, lang }) {
  const cn = bem("BasketTool");
  return (
    <div className={cn()}>
      <Link className="LinkToMain" to="/">{lang == 'Рус' ? 'Главная' : 'Main Page'}</Link>
      <div className="BasketTool-label">
        <span className={cn("label")}>{lang == 'Рус' ? 'В корзине:' : 'In cart: '}</span>
        <span className={cn("total")}>
          {amount
            ? lang == 'Рус' ?  `${amount} ${plural(amount, {
                one: "товар",
                few: "товара",
                many: "товаров",
              })} / ${numberFormat(sum)} ₽`
              : `${amount} ${plural(amount, {
                one: "good",
                few: "goods",
                many: "goods",
              })} / ${numberFormat(sum)} ₽`
            : lang == 'Рус' ? `пусто` : 'empty'}
        </span>
        <button onClick={onOpen}>Перейти</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  lang: PropTypes.string,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
};

export default memo(BasketTool);
