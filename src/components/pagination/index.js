import React from "react";
import { getPageNumbers } from "../../utils";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css'

function Pagination(props) {

  const cn = bem('Pagination');

  function getPages(page, lastPage) {
    const result = getPageNumbers(page, lastPage);

    return result.map((item, index) => {
      switch (item) {
        case '...':
          return <span key={item + index} className={cn('dots')}>{item}</span>
        case props.currentPage:
          return <span key={item} id={item} className={cn('selected')}>{item}</span>
        default:
          return <span key={item} className={cn('page')}
            onClick={() => !props.isLoading && props.onClick(item)}
            id={item}>
            {item}
          </span>
      }
    })
  }

  return (
    <div className={cn()}>
      {getPages(props.currentPage, props.lastPage)}
    </div>
  );
}

Pagination.PropTypes = {
  currentPage: PropTypes.number,
  lastPage: PropTypes.number,
  onClick: PropTypes.func,
  isLoading: PropTypes.bool
}

export default React.memo(Pagination);
