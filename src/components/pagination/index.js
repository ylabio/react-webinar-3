import {memo, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { paginationList } from '../../utils';

function Pagination(props){
  
  const [pages, setPages]=useState([]);
  
  useEffect(()=>setPages(paginationList(props.currPage, props.totalPages)),[props.currPage, props.totalPages])
  const callbacks = {
    onClick: (e) => {
      const page =+e.target.dataset.item;
      if(page) props.onClick(page)
     
    },
  };
  const cn = bem('Pagination');

  return (
    <div className={cn()} onClick={callbacks.onClick}>
      {pages.map((page, index) => (
        <span key={index} 
              className={cn("item",props.currPage==page ? "active":"")}
              disabled= {typeof page !='number'}
              data-item={page}
              >
          {page}
        </span>))}
     </div>
  )
  
}

Pagination.propTypes = {
  currPage: PropTypes.number,
  totalPages: PropTypes.number,
  onClick: PropTypes.func,
};

Pagination.defaultProps = {
  currPage: 1,
  totalPages: 1,
  onclick:()=>{},
};

export default memo(Pagination)