import React from 'react';
import { createElement } from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
    const list = store.getState().list;

    const formRaz = count => {
        if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
            return 'раза';
        }
        return 'раз';
    };

    return (
        <div>
            <div className="App-head">
                <h1>Приложение на чистом JS</h1>
            </div>
            <div className="App">
                <div className="App-controls">
                    <button onClick={() => store.addItem()}>Добавить</button>
                </div>
                <div className="App-center">
                    <div className="List">
                        {list.map(item => (
                            <div key={item.code} className="List-item">
                                <div
                                    className={'Item' + (item.selected ? ' Item_selected' : '')}
                                    onClick={event => {
                                        store.selectItem(item.code, event.ctrlKey || event.metaKey);
                                    }}
                                >
                                    <div className="Item-code">{item.code}</div>
                                    <div className="Item-title">
                                        {item.title}
                                        <span className="Item-title_count-highlighted">
                                            {item.highlightCount
                                                ? ` | Выделяли ${item.highlightCount} ${formRaz(item.highlightCount)}`
                                                : ''}
                                        </span>
                                    </div>
                                    <div className="Item-actions">
                                        <button
                                            onClick={event => {
                                                event.stopPropagation();
                                                store.deleteItem(item.code);
                                            }}
                                        >
                                            Удалить
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
