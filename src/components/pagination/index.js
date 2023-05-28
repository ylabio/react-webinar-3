import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Pagination(props) {     

  const pages = props.fetchNumbersPage();

  const cn = bem('Pagination'); 

  return (
    <div className={cn()}>
      {pages.map(page => {  
        if (page !== '...') {
          return <div key={props.generateCode()} className={props.currentPage === page ? cn('item selected') : cn('item')} onClick={() => props.selectedPage(page)}>{page}</div>          
        }            
        return <div key={props.generateCode()} className={cn('item dots')}>{page}</div>      
      })}
    </div>
  );
}

Pagination.propTypes = {
  pageLimit: PropTypes.number, 
  itemOrder: PropTypes.number, 
  totalPages: PropTypes.number, 
  currentPage: PropTypes.number, 
  pageNeighbours: PropTypes.number, 
  selectedPage: PropTypes.func,
  fetchNumbersPage: PropTypes.func,      
  generateCode: PropTypes.func 
};

Pagination.defaultProps = {
  selectedPage: () => {},
  fetchNumbersPage: () => {},
  generateCode: () => {}
}

export default memo(Pagination);