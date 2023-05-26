import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat, plural } from "../../utils";
import "./style.css";
import { Link } from "react-router-dom";
import useLocale from "../../store/use-locale";

function BasketTool({ sum, amount, onOpen }) {
  const cn = bem("BasketTool");
  const translation = useLocale();
  return (
    <div className={cn()}>
      <Link to={"/"} className={cn("home")}>
        {translation("homePage")}
      </Link>
      <div>
        <span className={cn("label")}>{translation("inBasket")}</span>
        <span className={cn("total")}>
          {amount
            ? `${amount} ${plural(
                amount,
                ...translation("pluralVariants")
              )} / ${numberFormat(sum)} ₽`
            : `${translation("empty")}`}
        </span>
        <button onClick={onOpen}>{translation("goTo")}</button>
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
