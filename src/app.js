import React from 'react';
import { createElement } from './utils.js';
import './styles.css';
import Item from './components/Item.jsx';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

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
          {list.map((item) => (
            <Item key={item.code} store={store} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
