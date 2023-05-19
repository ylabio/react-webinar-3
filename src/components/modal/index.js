import React from "react";
import "./style.css";

function index() {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <header className="modalHeader">
          <h1 className="modalHeaderTitle">Корзина</h1>
          <button onClick={handleCloseModal} className="modalHeaderBtn">
            Закрыть
          </button>
        </header>
        <div className="modalProductsList">
          <List
            list={list}
            products={products}
            removeProduct={removeProduct}
            modal={modal}
          />
        </div>
        <footer className="modalFooter">
          <h3 className="modalFooterTitle">Итого</h3>
          <h3 className="modalFooterCount">{formattedCountPrice} ₽</h3>
        </footer>
      </div>
    </div>
  );
}

export default index;
