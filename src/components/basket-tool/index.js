import { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat, plural } from "../../utils";
import { useLanguage } from "../../localization/LanguageContext";
import { dictionary } from "../../localization/dictionary";
import "./style.css";

function BasketTool({ sum, amount, onOpen }) {
  const cn = bem("BasketTool");
  const { currentLanguage } = useLanguage();
  const {
    main,
    In_the_basket,
    go_to_cart,
    currency,
    goods_one,
    goods_few,
    goods_many,
    empty,
  } = dictionary[currentLanguage];

  return (
    <section className={cn()}>
      <Link to={"/"} className={cn("link")}>
        {main}
      </Link>
      <div className={cn("wrapper")}>
        <span className={cn("label")}>{In_the_basket}</span>
        <span className={cn("total")}>
          {amount
            ? `${amount} ${plural(amount, {
                one: `${goods_one}`,
                few: `${goods_few}`,
                many: `${goods_many}`,
              })} / ${numberFormat(sum)} ${currency}`
            : `${empty}`}
        </span>
        <button onClick={onOpen}>{go_to_cart}</button>
      </div>
    </section>
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
