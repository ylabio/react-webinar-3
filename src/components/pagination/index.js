import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css";
import { formPaginationArray } from "./paginationArray";

function Pagination() {
  const [totalPages, setTotalPages] = useState(0);
  const currPage = Number(useParams().id) || 1;
  const [paginationArray, setPaginationArray] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getPagesQuantity = async () => {
      const response = await fetch(
        "/api/v1/articles?limit=10&skip=10&fields=items(_id, title, price),count"
      );
      const json = await response.json();
      const totalItems = json.result.count;
      const totalPages = Math.ceil(totalItems / 10);
      setTotalPages(totalPages);
    };

    getPagesQuantity();
  }, []);

  useEffect(() => {
    setPaginationArray(formPaginationArray(currPage, totalPages));
  }, [currPage, totalPages]);

  return (
    <div className="Pagination-content">
      {paginationArray.map((el, index) =>
        el !== "..." ? (
          <button
            onClick={() => navigate(`/${el}`)}
            className={
              currPage === el
                ? "pagination-button pagination-button-pressed"
                : "pagination-button"
            }
            key={index}
          >
            {el}
          </button>
        ) : (
          el
        )
      )}
    </div>
  );
}

export default Pagination;
