import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Pagination (props) {

  const cn = bem('Pagination');

  const callbacks = {
    getChangePage : (page) => {
      props.changePage(page)
    }
  }
  
  return (
    <div className={cn()}>
      <button 
        className={props.page === props.numbersPages[0] ? cn('button active') : cn('button')} 
        onClick={() => callbacks.getChangePage(props.numbersPages[0])}
      >
        {props.numbersPages[0]}
      </button>
      {props.numbersPages[3] && <span className={cn('lots-dots')}>...</span>}
      {props.numbersPages[1] 
        && <button 
        className={props.page === props.numbersPages[1] ? cn('button active') : cn('button')} 
        onClick={() => callbacks.getChangePage(props.numbersPages[1])}
        >
          {props.numbersPages[1]}
      </button>}
      <button 
        className={props.page === props.numbersPages[2] ? cn('button active') : cn('button')} 
        onClick={() => callbacks.getChangePage(props.numbersPages[2])}
      >
        {props.numbersPages[2]}
      </button>
      {props.numbersPages[3] 
        && <button className={props.page === props.numbersPages[3] ? cn('button active') : cn('button')} 
        onClick={() => callbacks.getChangePage(props.numbersPages[3])}
        >
          {props.numbersPages[3]}
      </button>}
      {props.numbersPages[1] && <span className={cn('lots-dots')}>...</span>}
      <button 
        className={props.page === props.numbersPages[4] ? cn('button active') : cn('button')} 
        onClick={() => callbacks.getChangePage(props.numbersPages[4])}
      >
        {props.numbersPages[4]}
      </button>
    </div>
  );
}

Pagination.propTypes = {
  numbersPages: PropTypes.array,
  page: PropTypes.number,
  changePage: PropTypes.func
}

Pagination.defaultProps = {
  changePage: () => {},
}

export default memo(Pagination);