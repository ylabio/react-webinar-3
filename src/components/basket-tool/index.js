import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { getTranslation, numberFormat, plural } from "../../utils";
import "./style.css";
import { Link } from "react-router-dom";
import useSelector from "../../store/use-selector";

function BasketTool({ sum, amount, onOpen }) {
  const cn = bem("BasketTool");

  const select = useSelector((state) => ({
    languages: state.language,
  }));

  return (
    <div className={cn()}>
      <div>
        <Link to={`/`} className={cn("link")}>
          {getTranslation("main")}
        </Link>
      </div>
      <div>
        <span className={cn("label")}>{getTranslation("onBasket")}</span>
        <span className={cn("total")}>
          {amount
            ? `${amount} ${plural(amount, {
                one: getTranslation("product"),
                few: getTranslation("productFew"),
                many: getTranslation("productMany"),
              })} / ${numberFormat(sum)} ₽`
            : getTranslation("empty")}
        </span>
        <button onClick={onOpen}>{getTranslation("go")}</button>
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
