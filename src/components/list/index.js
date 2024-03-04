import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import Result from "../result";

function List({ list, action, type, totalPrice }) {
  const cn = bem("List");
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
      {type !== 'list' && totalPrice && <Result totalPrice={totalPrice}/> || type !== 'list' && <div className={cn('emptyCart')}>Ваша корзина пуста!</div>}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      price: PropTypes.number,
      title: PropTypes.string,
    })
  ).isRequired,
  action: PropTypes.func,
};

List.defaultProps = {
  action: () => {},
};

export default React.memo(List);
