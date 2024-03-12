import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat, plural } from "../../utils";
import "./style.css";

function BasketTool({ sum, amount, onOpen, lang, data, children }) {
  const cn = bem("BasketTool");
  return (
    <div className={cn()}>
      <div className={cn("title")}>{children}</div>

      <div>
        <span className={cn("label")}>{data.basket.basketToolText}:</span>
        <span className={cn("total")}>
          {amount
            ? `${amount} ${
                lang === "RU"
                  ? plural(amount, {
                      one: data.basket.productOne,
                      few: data.basket.productsFew,
                      many: data.basket.productsMany,
                    })
                  : plural(
                      amount,
                      {
                        one: data.basket.productOne,
                        other: data.basket.productsOther,
                      },
                      "en-EN"
                    )
              } / ${numberFormat(sum)} ₽`
            : `${data.basket.emptyBasket}`}
        </span>
        <button onClick={onOpen}>{data.basket.toBasketBtn}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  lang: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  children: PropTypes.node,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  children: "",
};

export default memo(BasketTool);
