import {memo, useMemo} from "react";

import './style.css';

function Pages({handleClick, id, limit}){

  function chagePage(elem) {
    handleClick(+elem.dataset.id * 10 - 10);
  }

  let count = id + 10;

  const pagesArray = useMemo(() => { 
    let array = [1];
    
    if (count <= 20) {
      array.push(2, 3);
      if (count < 20) {
        array.push('...');
      } else {
        array.push(4, '...');
      }
    } else if (limit - count /10 < 4) {
      array.push('...', limit - 3, limit - 2, limit - 1);
    } else {
      array.push('...', count / 10 - 1, count / 10 , count / 10 + 1, '...');
    }

    array.push(limit);
    return array;
  }, [limit, id])
  
  return (
    <div className='Pages'>{

    pagesArray.map((item, index) => {
      if (item !== '...') {
        return (<div key={item + index} className="Pages-item" data-id={item} 
                onClick={(event) => chagePage(event.target)}
                style={{background: item * 10 === count && '#0087E9'}}>
                  {item}
                </div>)
        } else {
          return (<div key={item + index} className="Pages-item Pages-dots">
                    {item}
                  </div>)
        }
      }
          
      )}
    </div>
  )
}


export default memo(Pages);