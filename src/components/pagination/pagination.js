import {memo,useCallback} from "react";
import PropTypes from 'prop-types';
import './style.css';
import { NavLink } from "react-router-dom";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";

function Pagination({}) {
  const store = useStore();

  const select = useSelector(state => ({
    currentPage: state.catalog.currentPage,
    totalProductCount:state.catalog.totalProductCount,
    pageSize:state.catalog.pageSize,
  }));
  let pages = Math.ceil(select.totalProductCount/select.pageSize)
  const callbacks = {
    changePage: useCallback(page => store.actions.catalog.changePage(page), [store]),
  }
  let links=[]
  for (let i = 1; i <= pages; i++) {
    links.push(i)
 }
  return (
    <div className='Pagination'>
      {links.map((el)=>{
          if(el === 2 && select.currentPage > 3 || el === pages - 1 && select.currentPage < pages - 2) {
            return <span key={el} className={'Pagination__dot'}>...</span>
          }
          if(el === 1 || el === pages || Math.abs(el - select.currentPage) <= 1 ||el==3 && select.currentPage<5 ){
            return <NavLink key={el} className={el==select.currentPage?'Pagination__link current':'Pagination__link'} to={`/${el}`} onClick={()=>callbacks.changePage(el)}>{el}</NavLink>
          }
        }
      )
      }
    </div>
  );
}

Pagination.propTypes = {
 
};

Pagination.defaultProps = {

}

export default memo(Pagination);
