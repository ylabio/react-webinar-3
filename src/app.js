import React, { useState } from 'react'
import './styles.css'

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [activeItem, setActiveItem] = useState(null)
  const list = store.getState().list

  const handleActiveClass = (code) => {
    setActiveItem(code === activeItem ? null : code)
  }

  const handleCount = (item) => {
    item.code === activeItem ? null : item.counter++
  }

  return (
    <div className='App'>
      <div className='App-head'>
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className='App-controls'>
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className='App-center'>
        <div className='List'>
          {list.map((item, index) => (
            <div
              key={item.code}
              className='List-item'
              onClick={() => handleCount(item)}
            >
              <div
                className={
                  activeItem === item.code ? 'Item Item_selected' : 'Item'
                }
                onClick={() => handleActiveClass(item.code)}
              >
                <div className='Item-code'>{index + 1}</div>
                <div className='Item-title'>
                  {item.title}
                  {item.counter > 0 && ` | Выделяли ${item.counter} раз`}
                </div>
                <div className='Item-actions'>
                  <button onClick={() => store.deleteItem(item.code)}>
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
