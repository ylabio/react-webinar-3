import React from 'react';
import {createElement} from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;

  function pluralization(count){
    if (count == 2 || count == 3 || count == 4){
      return 'раза';
    }

    else if (String(count).length >= 4){
      const numbers = Number(String(count).slice(-2));
      if (/22|23|24|32|33|34|42|43|44|52|53|54|62|63|64|72|73|74|82|83|84|92|93|94/.test(numbers) || numbers == 2 || numbers == 3 || numbers == 4){
        return 'раза';
      }
      else{
        return 'раз';
      }
    }

    else if (/22|23|24|32|33|34|42|43|44|52|53|54|62|63|64|72|73|74|82|83|84|92|93|94/.test(count)){
      return 'раза';
    }

    
    return 'раз';
    
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
        <div className='List'>{
          list.map(item =>
            <div key={item.code} className='List-item' >
              <div className={'Item' + (item.selected ? ' Item_selected' : '')}
                   onClick={(e) => store.selectItem(e,item.code)}>
                <div className='Item-code'>{item.code}</div>
                <div className='Item-block'>
                  <div className='Item-title'>{item.title}</div>
                  <div className={'Item-count'+(item.count !=0 ? ' visible' : '')}>| Выделяли {item.count}  {pluralization(item.count)}</div>
                </div> 
                <div className='Item-actions'>
                  <button onClick={() => store.deleteItem(item.code)}>
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
