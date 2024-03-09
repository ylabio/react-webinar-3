import React, {useMemo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import { getCollection } from "./get-collection";
import './style.css';

function Pagination({totalAmount, currentPage, onChangePage}) {

  const cn = bem('Pagination');

  const buttonAmount = useMemo(() => Math.ceil(totalAmount / 10), [totalAmount]);

  const handleClick = (event) => {
    const value = Number(event.target.value);
    currentPage !== value && onChangePage(value);
  }

  const getButtons = getCollection(
    (i) => 
      <button 
      key={i} 
      className={`${cn('button')} ${currentPage === i ? 'current' : ''}`} 
      onClick={handleClick} value={i}>
        {i + 1}
      </button>
    );

  const collection = getButtons(buttonAmount, currentPage, handleClick);

  return <div className={cn()}>
    {collection}
  </div>
}

Pagination.propTypes = {
  totalAmount: PropTypes.number,
  currentPage: PropTypes.number,
  onChangePage: PropTypes.func
};

Pagination.defaultProps = {
  totalAmount: 0,
  currentPage: 0,
  onChangePage: () => {}
}

export default React.memo(Pagination);