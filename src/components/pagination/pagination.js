import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';
import { NavLink } from "react-router-dom";

function Pagination({currentPage,totalProductCount,pageSize,changePage}) {

  let pages = Math.ceil(totalProductCount/pageSize)

  let links=[]
  for (let i = 1; i <= pages; i++) {
    links.push(i)
 }
  return (
    <div className='Pagination'>
      {links.map((el)=>{
          if(el === 2 && currentPage > 3 || el === pages - 1 && currentPage < pages - 2) {
            return <span key={el} className={'Pagination__dot'}>...</span>
          }
          if(el === 1 || el === pages || Math.abs(el - currentPage) <= 1 ||el==3 && currentPage<5 || el==pages-3 && currentPage==pages){
            return <NavLink key={el} className={el==currentPage?'Pagination__link current':'Pagination__link'} to={`/${el}`} onClick={()=>changePage(el)}>{el}</NavLink>
          }
        }
      )
      }
    </div>
  );
}

Pagination.propTypes = {
 currentPage: PropTypes.number,
 totalProductCount:PropTypes.number,
 pageSize:PropTypes.number,
 changePage: PropTypes.func
};

Pagination.defaultProps = {
  changePage:()=>{}
}

export default memo(Pagination);
