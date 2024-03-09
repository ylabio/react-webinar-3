import {memo} from 'react';
import {NavLink} from "react-router-dom";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Pagination({max, current}) {

  const cn = bem('Pagination');

  return (
    <div className={cn()}>
      {new Array(max).fill(true).map((_, i)=> {
        const number = i + 1;
        let content = null;
        if(number === 2 && current > 3 || number === max - 1 && current < max - 2) {
          content = <div className={cn('gap')}>...</div>
        }
        if(number === 1 || number === max || Math.abs(number - current) <= 1) {
          content = <NavLink className={cn('link')} to={`/${number}`}>
                      {number}
                    </NavLink>
        }
        return content && <div key = {number} className={cn('item')}>{content}</div>
      })}
    </div>
  )
}

export default memo(Pagination);