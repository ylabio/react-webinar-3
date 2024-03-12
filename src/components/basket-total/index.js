import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import "./style.css";

function BasketTotal({ sum }) {
  const cn = bem("BasketTotal");
  const store = useStore();
  const t = store.actions.translator.useTranslate();

  const select = useSelector((state) => ({
    lang: state.translator.language,
  }));

  return (
    <div className={cn()}>
      <span className={cn("cell")}>{t("Итого")}:</span>
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
