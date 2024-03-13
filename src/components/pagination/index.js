import React  from 'react'
import { useNavigate, } from 'react-router-dom';
import PropTypes from 'prop-types'; 
import "./style.css"
import { formPaginationArray } from '../../utils';

function Pagination(props) {
  const navigate = useNavigate()

  const paginationArray = formPaginationArray(props.currPage,props.totalPages)

  return (
    <div className='Pagination-content'>
    {paginationArray.map((el,index) => 
      el !== "..." ?  
      <button onClick={() => navigate(`/${el}`)} className={props.currPage == el ?"pagination-button pagination-button-pressed" : "pagination-button"} key = {index} >
          {el}
      </button> :
       el
       )}
    </div>

  )
}

Pagination.propTypes = {
  currPage: PropTypes.number.isRequired, // currPage должен быть числом и обязательным
  totalPages: PropTypes.number.isRequired, // totalPages должен быть числом и обязательным
};

export default Pagination