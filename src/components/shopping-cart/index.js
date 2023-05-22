import React, { useCallback } from "react";
import "./style.css";
import List from "../list";
import Controls from "../controls";
import Head from "../head";
import PageLayout from "../page-layout";
import { getSum, getFormatNumber } from "../../utils";
import PropTypes from "prop-types";

function ShoppingCart({
  list,
  setIsOpen,
  isOpen,
  store,
  sumShoppingCart,
  shoppingCartCount,
}) {
  const callbacks = {
    onDeleteItem: useCallback(
      (code) => {
        store.deleteItem(code);
      },
      [store]
    ),
  };

  return (
    <div
      className="ShoppingCart-modal"
      style={isOpen ? { display: "block" } : { display: "none" }}
    >
      <div className="ShoppingCart">
        <PageLayout isModal={true}>
          <Head title="Корзина" />
          <Controls setIsOpen={setIsOpen} title={"Закрыть"} isOpen={isOpen} />
          {list.length ? (
            <>
              <List
                list={list}
                onSmthDo={callbacks.onDeleteItem}
                btnTitle={"Удалить"}
                showCount={true}
              />
              <div className="ShoppingCart-sum">
                <span className="ShoppingCart-sum-text">Итого</span>
                {getFormatNumber(sumShoppingCart)} ₽
              </div>
            </>
          ) : (
            <h1 className="ShoppingCart-empty">Корзина пуста</h1>
          )}
        </PageLayout>
      </div>
    </div>
  );
}

ShoppingCart.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  isModal: PropTypes.bool,
  setIsOpen: PropTypes.func,
  isOpen: PropTypes.bool,
  showCount: PropTypes.bool,
};

export default ShoppingCart;
