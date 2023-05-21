import React from "react";
import PropTypes from "prop-types";
import List from "../list";
import Controls from "../controls";
import Head from "../head";
import "./style.css";

function Modal({
  store,
  onAddItem,
  onDeleteItem,
  onSelectItem,
  list,
  setIsOpen,
}) {
  // const callbacks = {
  //     onDeleteItem: useCallback((code) => {
  //       store.deleteItem(code);
  //     }, [store]),

  //     onSelectItem: useCallback((code) => {
  //       store.selectItem(code);
  //     }, [store]),

  //     onAddItem: useCallback(() => {
  //       store.addItem();
  //     }, [store])
  //   }

  return (
    <div className="Modal_wrapper">
      <Head title="Корзина" />
      <Controls title="Закрыть" onFunc={() => setIsOpen(false)} />
      <List
        list={list}
        onDeleteItem={onDeleteItem}
        onSelectItem={onSelectItem}
        btnItem={"Удалить"}
        isCount={true}
      />
    </div>
  );
}

export default Modal;
