import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import { useLanguage } from "../../localization/LanguageContext";
import { dictionary } from "../../localization/dictionary";
import "./style.css";

function BasketTotal({ sum }) {
  const cn = bem("BasketTotal");

  const { currentLanguage } = useLanguage();
  const { currency, total } = dictionary[currentLanguage];
  return (
    <div className={cn()}>
      <span className={cn("cell")}>{total}</span>
      <span className={cn("cell")}>
        {" "}
        {numberFormat(sum)} {currency}
      </span>
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
