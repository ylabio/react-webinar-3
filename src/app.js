import React from "react";
import { createElement, declOfNum } from "./utils.js";
import "./styles.css";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

const delItem = (event, item)=>{
  event.stopPropagation()
  store.deleteItem(item.code)
 }

  return (
    <div className="App">
      <div className="App-head">
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className="App-controls">
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map((item) => (
            <div key={item.code} className="List-item">
              <div
                className={"Item" + (item.selected ? " Item_selected" : "")}
                onClick={() => store.selectItem(item.code)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title-parent">
                  <div className="Item-title">{item.title}</div>
                  {item.countSelect > 0 && (
                    <div className="Item-selected-pipe">
                      <span>|</span>
                      {`Выделяли ${item.countSelect} раз` + `${ declOfNum(item.countSelect , 'раз') === 'а'? 'a':''}`}
                    </div>
                  )}
                </div>

                <div className="Item-actions">
                  <button onClick={(e)=>delItem(e, item)}>
                    Удалить
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
