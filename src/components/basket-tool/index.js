import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import {numberFormat, plural} from "../../utils";
import {translateWord} from "../../utils";
import NavigationButtons from "../navigation-buttons";
import "./style.css";

function BasketTool({sum, amount, onOpen, selectedLanguage}) {
  const cn = bem("BasketTool");

  const pluralWords =
    selectedLanguage === "ru-RU" ? {one: "товар", few: "товара", many: "товаров"} : {one: "item", other: "items"};

  return (
    <div className={cn()}>
      <NavigationButtons selectedLanguage={selectedLanguage} />
      <div>
        <span className={cn("label")}>{translateWord("В корзине", selectedLanguage)}:</span>
        <span className={cn("total")}>
          {amount
            ? `${amount} ${plural(amount, pluralWords, selectedLanguage)} / ${numberFormat(sum)} ₽`
            : translateWord("пусто", selectedLanguage)}
        </span>
        <button onClick={onOpen}>{translateWord("Перейти", selectedLanguage)}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  selectedLanguage: PropTypes.string,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  selectedLanguage: "ru-RU",
};

export default memo(BasketTool);
