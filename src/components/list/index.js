import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import Result from "../result";

function List({ list, action, onSelectItem, type, totalPrice }) {
  const cn = bem("List");
  console.log(totalPrice);
  return (
    <div className={cn()}>
      {(type === "list" &&
        list.map((item) => (
          <div key={item.code} className={cn("item")}>
            <Item item={item} action={action} />
          </div>
        ))) ||
        list.map((item) => {
          if (item.count) {
            return (
              <div key={item.code} className={cn("item")}>
                <Item item={item} action={action} />
              </div>
            );
          }
        })}
      {type !== 'list' && totalPrice && <Result totalPrice={totalPrice}/>}
    </div>
  );
} //todo: заменить div выше на компонент итогов корзины

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  onAddToCart: PropTypes.func,
  onSelectItem: PropTypes.func,
};

List.defaultProps = {
  onAddToCart: () => {},
  onSelectItem: () => {},
};

export default React.memo(List);
