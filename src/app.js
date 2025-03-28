import React from 'react';
import { createElement } from './utils.js';
import './styles.css';
import BasketSvg from './assets/basket.svg';
import Close from './assets/close.svg';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  return (
    <div className="App">
      <div className="App-head">
        <h1 className="App-title">Магазин</h1>
      </div>
      <div className="App-controls">
        <div className="App-basket" onClick={() => store.modalWindow()}>
          <img src={BasketSvg}></img>
          <div className="App-text">
            {store.getState().sum
              ? `${store.getState().quantity} товара / ${store.getState().sum.toLocaleString('ru-RU')} ₽`
              : 'Пусто'}
          </div>
        </div>
      </div>
      {store.getState().isOpen ? (
        <div className="modal" onClick={e => e.stopPropagation()}>
          <div className="modal-content">
            <div className="modal-title">Корзина</div>
            <img src={Close} className="modal-button" onClick={() => store.modalWindow()}></img>
            {store.getState().shoppingCart.map((item, index) => {
              return (
                <div key={item.code}>
                  <div className={`Item ${++index % 2 ? 'Item_selected' : ''}`}>
                    <div className="Item-title">{item.title}</div>
                    <div className="Item-actions">
                      <div className="Item-count">{item.count} шт</div>
                      <div className="Item-price">{item.price.toLocaleString('ru-RU')} ₽</div>
                      <button
                        className="Item-button Item-button-action"
                        onClick={() => store.deleteItem(item)}
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="Basket">
              <div className="Basket-price">
                <div className="Basket-text">Итого:</div>
                <div className="Basket-text">{store.getState().sum.toLocaleString('ru-RU')} ₽</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
      <div className="App-center">
        <div className="List">
          {list.map((item, index) => (
            <div key={item.code} className="List-item">
              <div className={'Item' + (++index % 2 ? ' Item_selected' : '')}>
                <div className="Item-title">{item.title}</div>
                <div className="Item-actions">
                  <div className="Item-price">{item.price.toLocaleString('ru-RU')} ₽</div>
                  <button className="Item-button" onClick={() => store.addItem(item)}>
                    Добавить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
