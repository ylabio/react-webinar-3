import React from 'react';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const pluralize = (score) => {
    if (score === 2) {
      return `${score} раза`
    }
    if (score === 3) {
      return `${score} раза`
    }
    if (score === 4) {
      return `${score} раза`
    }
    if (score >= 12 && score <= 14) {
      return `${score} раз`
    }
    if (score >= 112 && score <= 114) {
      return `${score} раз`
    }
    if (score >= 212 && score <= 214) {
      return `${score} раз`
    }
    switch (score % 10) {
      case 2:
        return `${score} раза`;
        case 3:
          return `${score} раза`;
          case 4:
            return `${score} раза`;
      default:
        return `${score} раз`
    }
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
          {list.map(item => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={() => store.selectItem(item.code)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">
                <div>{item.title}</div>
                {item.score > 0 &&
                 <div className="Item-score">| Выделяли {pluralize(item.score)}</div>}

                </div>
                <div className="Item-actions">
                  <button onClick={() => store.deleteItem(item.code)}>Удалить</button>
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
