import {memo, useCallback} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function PageNumber({currentPage, changePage, number}) {
  const cn = bem('PageNumber');

  const callbacks = {
    // Переход на другую страницу
    changePage: useCallback(
      (number) => changePage(number),
      []),
  }

  return(
      <li
        className={`${cn()} + ${(currentPage === number) ? cn({selected: true}) : ''} `}
        key={`page_li_${number}`}
      >
        <button
          className={`${cn('button')} + ${(currentPage === number) ? cn('button', {selected: true}) : ''} `}
          onClick={()=> callbacks.changePage(number)}
        >
          {number}
        </button>
      </li>
  )
};

PageNumber.propTypes = {
  currentPage: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
  number: PropTypes.number.isRequired,
};

export default memo(PageNumber);
