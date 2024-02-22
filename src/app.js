import React from "react";

import { useState, useEffect } from "react";
import Store from "./store.js";

import "./styles.css";

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App() {
  const [select, setSelected] = useState([
    { code: 1, title: "Название элемента" },
    { code: 2, title: "Некий объект" },
    { code: 3, title: "Заголовок" },
    { code: 4, title: "Очень длинное название элемента из семи слов" },
    { code: 5, title: "Запись" },
    { code: 6, title: "Шестая запись" },
    { code: 7, title: "Седьмая запись" },
  ]);

  const usedArr = select.map((item) => item.code);

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const newCode = Math.floor(Math.random() * (max - min + 1)) + min;
    if (usedArr.includes(newCode)) {
      newCode = Math.floor(Math.random() * (max - min + 1)) + min;
    } else {
      return newCode;
    }
  };

  const addItem = () => {
    const codeUpd = getRandomInt(select.length, select.length * 10);
    setSelected([
      ...select,
      { code: codeUpd, title: "Новая запись", selected: false },
    ]);
  };

  const allValues = (obj) => {
    const newObj = {};
    newObj.code = obj.code;
    newObj.title = obj.title;
    newObj.selected = false;
    return newObj;
  };

  const showSelect = () => {
    if (select[0].selected === undefined) {
      const newArr = select.map((item) => allValues(item));
      setSelected(newArr);
    }
  };

  const findByCode = (code) => {
    const newSelect = select;
    if (newSelect.find((item) => item.code === code).selected === true) {
      newSelect.find((item) => item.code === code).selected = false;
      setSelected([...newSelect]);
      console.log(newSelect);
    } else if (
      newSelect.find((item) => item.code === code).selected === false
    ) {
      newSelect.find((item) => item.code === code).selected = true;
      setSelected([...newSelect]);
      console.log(newSelect);
    }

    /*const newSelect = select;
    newSelect.map((item) => (item.selected = false));
    newSelect.find((item) => item.code === code).selected = true;
    setSelected([...select]);*/
  };

  useEffect(() => showSelect(), []);

  return (
    <div className="App">
      <div className="App-head">
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className="App-controls">
        <button onClick={addItem}>Добавить</button>
      </div>
      <div className="App-center">
        <div className="List">
          {select.map((item) => (
            <Item
              key={item.code}
              select={select}
              findByCode={findByCode}
              selected={item.selected}
              showSelect={showSelect}
              setSelected={setSelected}
              code={item.code}
              title={item.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Item({ code, title, selected, findByCode, setSelected, select }) {
  const [count, setCount] = useState(0);
  return (
    <div key={code} className="List-item">
      <div
        onClick={() => {
          findByCode(code);
          if (selected === true) {
            setCount(count + 1);
          }
        }}
        className={!selected ? "Item" : "Item Item_selected"}
      >
        <div className="Item-code">{code}</div>
        <div className="Item-title">{title}</div>
        {count > 0 ? <p> Выделяли {count} раз</p> : " "}
        <DeleteButton setSelected={setSelected} code={code} select={select} />
      </div>
    </div>
  );
}

function DeleteButton({ setSelected, code, select }) {
  return (
    <div className="Item-actions">
      <button
        onClick={(event) => {
          setSelected([...select.filter((item) => item.code !== code)]);
          event.stopPropagation();
        }}
      >
        Удалить
      </button>
    </div>
  );
}

export default App;
