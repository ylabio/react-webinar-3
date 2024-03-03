import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import List from "../list";
import Head from "../head";

function Cart({ list, onDeleteItem, price }) {
  return (
    <div id="myModal" className="Modal">
      <div className="Modal-content">
        <Head title="Корзина">
          <button id="myModalClose" className="button-classic">
            Закрыть
          </button>
        </Head>
        {list.length == 0 ? (
          <h3 style={{ textAlign: "center" }}>Пусто</h3>
        ) : (
          <>
            <List list={list} selectItem={onDeleteItem} btnText={1} />
            <div className="Modal-title">
              <b>Итого</b>
              <b className="Modal-title-cart"> {price}</b>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number,
    })
  ).isRequired,
  onDeleteItem: PropTypes.func,
};

List.defaultProps = {
  onDeleteItem: () => {},
};

export default React.memo(Cart);
