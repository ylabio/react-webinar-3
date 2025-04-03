import React from "react";
import './style.css';
import { useEffect, useState } from "react";
import { getPages } from "../../utils";

function Pagination({count, page, limit, setPage, setLimit}) {

const [pages, setPages] = useState([]);
const [value, setValue] = useState(10);

  useEffect(() => {
   setPages(getPages(page, count, limit))

  }, [page, count, limit]);

const onChange = (e) => {
  setValue(e.target.value);
  setLimit(parseInt(e.target.value));
};

  return (
<div className="Pagination">
  <label htmlFor="dropdown">Выводить по:</label>
  <select id="dropdown" value={value} onChange={onChange}>
    <option value="">Выводить по:</option>
    <option value={5}>5 товаров</option>
    <option value={10}>10 товаров</option>
    <option value={20}>20 товаров</option>
  </select>
  {pages && pages.map((p, i) => {
    if (p === "...") {
      return (
        <span className="Pagination-dots" key={i}>{p}</span>
      )
    }
      return (
        <span
        className= {page === p ? "Pagination-active" : "Pagination-page"}
        key={i}
        onClick = {() => {
          setPage(p)
        }}>{p}</span>
      );
    })}
  </div>
);
}



export default Pagination;
