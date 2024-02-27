import React, { useState } from "react";

export default function Item({ item, onSelectItem, onDeleteItem }) {
  const [selectedTimes, setSelectedTimes] = useState(0);

  function pluralization(times) {
    if ([2, 3, 4].includes(times % 10) && ![12, 13, 14].includes(times % 100))
      return "a";
    return "";
  }

  return (
    <div className="List-item">
      <div
        className={"Item" + (item.selected ? " Item_selected" : "")}
        onClick={() => {
          if (!item.selected) setSelectedTimes(selectedTimes + 1);
          onSelectItem(item.code);
        }}
      >
        <div className="Item-code">{item.code}</div>
        <div className="Item-title">
          {item.title}
          {Boolean(selectedTimes) &&
            ` | Выделяли ${selectedTimes} раз` + pluralization(selectedTimes)}
        </div>

        <div className="Item-actions">
          <button
            onClick={(event) => {
              event.stopPropagation();
              onDeleteItem(item.code);
            }}
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}
