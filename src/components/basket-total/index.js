import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { getTranslation, numberFormat } from "../../utils";
import "./style.css";
import useSelector from "../../store/use-selector";

function BasketTotal({ sum }) {
  const select = useSelector((state) => ({
    languages: state.language,
  }));
  const cn = bem("BasketTotal");
  return (
    <div className={cn()}>
      <span className={cn("cell")}>{getTranslation("sum")}</span>
      <span className={cn("cell")}> {numberFormat(sum)} ₽</span>
      <span className={cn("cell")}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number,
};

BasketTotal.defaultProps = {
  sum: 0,
};

export default memo(BasketTotal);
