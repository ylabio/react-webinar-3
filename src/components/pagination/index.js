import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import "./style.css"
function Pagination(props) {
  const navigate = useNavigate()

  return (
    <div className='Pagination-content'>
    {props.paginationArray.map((el,index) => 
      el !== "..." ?  
      <button onClick={() => navigate(`/${el}`)} className={props.currPage == el ?"pagination-button pagination-button-pressed" : "pagination-button"} key = {index} >
          {el}
      </button> :
       el
       )}
    </div>

  )
}

export default Pagination