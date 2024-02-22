import React, { useState } from "react";

export default function Item({ store, item }) {
  const [selectedTimes, setSelectedTimes] = useState(0);

  return (
    <div className="List-item">
      <div
        className={"Item" + (item.selected ? " Item_selected" : "")}
        onClick={() => {
          if (!item.selected) setSelectedTimes(selectedTimes + 1);
          store.selectItem(item.code);
        }}
      >
        <div className="Item-code">{item.code}</div>
        <div className="Item-title">
          {item.title}
          {Boolean(selectedTimes) && ` | Выделяли ${selectedTimes} раз`}
        </div>

        <div className="Item-actions">
          <button onClick={() => store.deleteItem(item.code)}>Удалить</button>
        </div>
      </div>
    </div>
  );
}
