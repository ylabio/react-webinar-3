import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat, plural, getTranslation } from "../../utils";
import "./style.css";
import useTranslation from "../../hooks/useTranslation";

function BasketTool({ sum, amount, onOpen }) {
  const cn = bem("BasketTool");

  const [getTranslation] = useTranslation();

  let cartHas = "";

  if (amount) {
    const pluralForms = getTranslation("items");
    cartHas = `${amount} ${plural(amount, {
      one: pluralForms.one,
      few: pluralForms.few,
      many: pluralForms.many,
    })} / ${numberFormat(sum)} ₽`;
  } else {
    cartHas = getTranslation("empty");
  }

  return (
    <div className={cn()}>
      <span className={cn("label")}>{getTranslation("inCart")}:</span>
      <span className={cn("total")}>{cartHas}</span>
      <button onClick={onOpen}>{getTranslation("open")}</button>
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
