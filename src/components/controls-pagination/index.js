import {memo, useState} from 'react';
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

function ControlsPagination({onSelect, currentPage}){

  const onClick = (e) => {
    onSelect(e.target.value);
  }

  const options = {
    1: [1, 2, 3 , '...', 100],
    2: [1, 2, 3 , '...', 100],
    3: [1, 2, 3 , 4, '...', 100],
    'page': [1,'...',  currentPage - 1, currentPage, currentPage + 1, '...',  100],
    98: [1, '...',97, 98, 99, 100],
    100: [1, '...', 98, 99, 100],
  }

  const getOptions = (currentPage) => {
    if(currentPage < 3) return options[1];
    if(currentPage == 3) return options[3];
    if(currentPage == 98) return options[98];
    if(currentPage == 100) return options[100];
    if(currentPage > 3 && currentPage < 98) return options['page'];
  }

  let pages = getOptions(currentPage);

  const cn = bem('ControlsPagination');

  return (
    <div className={cn()}>
      {pages && pages.map((el, index) =>
        <div key={index}>
          { el == '...' ? 
        <span className={cn('points')}>...</span>
        : 
        <button className={currentPage == el ? cn('item', {selected: true}) : cn('item')}
                onClick={onClick}
                value={el}>{el}</button>
        }
        </div>
        )
      }
    </div>
  )
}

ControlsPagination.propTypes = {
  currentPage: PropTypes.number,
  onSelect: PropTypes.func,
};

ControlsPagination.defaultProps = {
  onSelect: () => {}
}

export default memo(ControlsPagination);
