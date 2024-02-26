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
    let minS = Math.ceil(min);
    let maxS = Math.floor(max);
    let newCode = Math.floor(Math.random() * (maxS - minS + 1)) + minS;
    if (usedArr.includes(newCode)) {
      let codeUpd = Math.floor(Math.random() * (max - min * 2)) + min;
      return codeUpd;
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
    usedArr.push(codeUpd);
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
    let newSelect = select;
    const chosenItem = newSelect.find((item) => item.code === code);
    console.log(chosenItem);
    if (chosenItem.selected === true) {
      const s = newSelect.map((item) => allValues(item));
      setSelected(s);
      console.log(s);
    } else {
      const u = newSelect.map((item) => allValues(item));
      u.find((item) => item.code === code).selected = true;
      setSelected(u);
      console.log(u);
    }

    /*newSelect.map((item) => (item.selected = false));
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
  const counter = () => {
    if (count > 0) {
      if (
        count.toString().endsWith("2") ||
        count.toString().endsWith("3") ||
        count.toString().endsWith("4")
      ) {
        return ` | Выделяли ${count} разa`;
      } else {
        return ` | Выделяли ${count} раз`;
      }
    }
  };
  return (
    <div key={code} className="List-item">
      <div
        onClick={() => {
          findByCode(code);
          if (selected === false) setCount(count + 1);
        }}
        className={!selected ? "Item" : "Item Item_selected"}
      >
        <div className="Item-code">{code}</div>
        <div className="Item-title">
          {title}
          {counter()}

          {/*  {count > 0 ? <p> | Выделяли {count} раз</p> : " "}*/}
        </div>

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
