import { memo } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat, plural } from "../../utils";
import "./style.css";
import useTranslate from "../../store/use-translate";

function BasketTool({ sum, amount, onOpen }) {

  const cn = bem("BasketTool");

  const emptyCartTitle = useTranslate('emptyCart');

  return (
    <div className={cn()}>
      <span className={cn("label")}>{useTranslate('cartTitle')}:</span>
      <span className={cn("total")}>
        {amount
          ? `${amount} ${plural(amount, {
              one: "товар",
              few: "товара",
              many: "товаров",
            })} / ${numberFormat(sum)} ₽`
          : `${emptyCartTitle}`}
      </span>
      <button onClick={onOpen}>{useTranslate('cartOpenButton')}</button>
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
