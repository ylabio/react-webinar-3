import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat, plural } from "../../utils";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import "./style.css";

function BasketTool({ sum, amount, onOpen, children }) {
  const cn = bem("BasketTool");
  const store = useStore();
  const t = store.actions.translator.useTranslate();

  const select = useSelector((state) => ({
    lang: state.translator.language,
  }));

  return (
    <div className={cn()}>
      {children}
      <div className={cn("controls")}>
        <span className={cn("label")}>{t("В корзине")}:</span>
        <span className={cn("total")}>
          {amount
            ? `${amount} ${t(
                plural(amount, {
                  one: "товар",
                  few: "товара",
                  many: "товаров",
                })
              )} / ${numberFormat(sum)} ₽`
            : t("пусто")}
        </span>
        <button onClick={onOpen}>{t("Перейти")}</button>
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
