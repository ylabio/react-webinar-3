import {memo} from 'react';
import {NavLink} from "react-router-dom";
import useSelector from '../../store/use-selector';
import {cn as bem} from '@bem-react/classname';
import './style.css';


function Pagination() {

  const cn = bem('Pagination');

  const {last, current} = useSelector(state => ({
    last: state.catalog.pagination.last,
    current: state.catalog.pagination.current,
  }));

  return (
    <div className={cn()}>
      {new Array(last).fill(true).map((_, i)=> {
        const number = i + 1;
        let content = null;
        if(number === 2 && current > 3 || number === last - 1 && current < last - 2) {
          content = <div className={cn('gap')}>...</div>
        }
        if(number === 1 || number === last || Math.abs(number - current) <= 1) {
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