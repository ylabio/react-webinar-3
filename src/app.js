import React from 'react';
import {createElement} from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function ListItem(props) {

	const list = props.store.getState().list;
	const [count, setCount] = React.useState(0);
	const selectAction = (item) => {
		if (!item.selected)
		{
			list.map(prop=>{
				prop.selected = false;
				return prop;
			})
			setCount(count + 1);
		}
		props.store.selectItem(item.code);
	}
	return (
		<div key={props.item.code} className='List-item'>
              <div className={'Item' + (props.item.selected ? ' Item_selected' : '')}
                   onClick={() => selectAction(props.item)}>
                <div className='Item-code'>{props.item.code}</div>
                <div className='Item-title'>{props.item.title} {count > 0 ? ` | Выделяли ${count} раз` : ''}</div>
                <div className='Item-actions'>
                  <button onClick={() => props.store.deleteItem(props.item.code)}>
                    Удалить
                  </button>
                </div>
              </div>
            </div>
	)
}
function App({store}) {

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
        <div className='List'>{
          list.map(item =>
            <ListItem key={item.code} item={item} store={store}/>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
