import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import "./style.css"
import {formPaginationArray} from './formPaginationArray';

function Pagination() {
  const [totalPages,setTotalPages] = useState(0)
  const currPage = Number(useParams().id) || 1;
  const [paginationArray, setPaginationArray] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const getPagesQuantity = async () => {
      const response = await fetch("/api/v1/articles?limit=10&skip=10&fields=items(_id, title, price),count");
      const json = await response.json();
      const totalItems = json.result.count;
      const totalPages = Math.ceil(totalItems/10)
      console.log(totalItems)
      setTotalPages(totalPages);
      setPaginationArray(formPaginationArray(currPage,totalPages));
    } 

    getPagesQuantity()
  },[currPage])

  
  // const formPaginationArr = formPaginationArray(currPage,totalPages)
  
  return (
    <>
    {paginationArray.map((el) => 
      el !== "..." ?  
      <button onClick={() => navigate(`/${el}`)} className={currPage === el ?"pagination-button pagination-button-pressed" : "pagination-button"}>
          {el}
      </button> :
       el
  )
}
    </>
  )
}

export default Pagination