import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat, plural } from "../../utils";
import "./style.css";
import { Link } from "react-router-dom";
import useSelector from "../../store/use-selector";

function BasketTool({ sum, amount, onOpen }) {
  const cn = bem("BasketTool");
  const select = useSelector((state) => ({
    data: state.translate.data,
    lang: state.translate.lang,
  }));
  return (
    <div className={cn()}>
      <Link to={"/"} className={cn("home")}>
        {select.data.main.linkHome}
      </Link>
      <div>
        <span className={cn("label")}>
          {select.data.basket.basketToolText}:
        </span>
        <span className={cn("total")}>
          {amount
            ? `${amount} ${
                select.lang === "RU"
                  ? plural(amount, {
                      one: select.data.basket.productOne,
                      few: select.data.basket.productsFew,
                      many: select.data.basket.productsMany,
                    })
                  : plural(
                      amount,
                      {
                        one: select.data.basket.productOne,
                        other: select.data.basket.productsOther,
                      },
                      "en-EN"
                    )
              } / ${numberFormat(sum)} ₽`
            : `${select.data.basket.emptyBasket}`}
        </span>
        <button onClick={onOpen}>{select.data.basket.toBasketBtn}</button>
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
