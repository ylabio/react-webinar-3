import { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat, plural } from "../../utils";
import Nav from "../nav";
import "./style.css";

function BasketTool({ sum, amount, onOpen, translation }) {
  const cn = bem("BasketTool");

  return (
    <section className={cn()}>
      <Nav translation={translation} />
      <div className={cn("wrapper")}>
        <span className={cn("label")}>{translation.In_the_basket}</span>
        <span className={cn("total")}>
          {amount
            ? `${amount} ${plural(amount, {
                one: `${translation.goods_one}`,
                few: `${translation.goods_few}`,
                many: `${translation.goods_many}`,
              })} / ${numberFormat(sum)} ${translation.currency}`
            : `${translation.empty}`}
        </span>
        <button onClick={onOpen}>{translation.go_to_cart}</button>
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
