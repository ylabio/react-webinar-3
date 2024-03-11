import {memo, useState} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {pagesCount} from '../../utils';
import {pagesNumbers} from '../../utils';

function Pagination(props) {

  const cn = bem('Pagination');

  return (
    <div className={cn()}>
      {
        pagesNumbers(props.count, props.limit, props.current).map(number =>
          <div className={cn('pages')} key={number}>
            {(number === pagesCount(props.count, props.limit))&&<div className={cn('break')}>...</div>}
            <div className={cn('page-number') + (number === props.current ? ' current' : '')}
            onClick={(event) => {props.onSwitch(event)}}>{number}</div>
            {(number === 1 && props.current > 3)&&<div className={cn('break')}>...</div>}
          </div>)
      }
    </div>
  )
}

export default memo(Pagination);