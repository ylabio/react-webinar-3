import React, { useCallback, useEffect, useState } from "react";
import { cn as bem } from "@bem-react/classname";

import "./style.css";
import constructPageArray, { codeGenerator } from "../../utils";
import PropTypes from "prop-types";

function Pagination({ currentPage, pagesCount, onPageChange }) {
  const cn = bem("Pagination");
  const uniqKey = codeGenerator(500);
  const [pages, setPages] = useState([]);

  const callbacks = {
    onPageChange: (event) => {
      const nextPage = parseInt(event.target.innerText, 10);

      if (nextPage !== currentPage) {
        onPageChange(nextPage);
      }
    },
    constructPageArray: useCallback(
      (currentPage, pagesCount) => constructPageArray(currentPage, pagesCount),
      [currentPage, pagesCount]
    ),
  };

  useEffect(() => {
    setPages(() => callbacks.constructPageArray(pagesCount, currentPage));
  }, [pagesCount, currentPage]);

  return (
    <ul className={cn()}>
      {pages?.map((el) => (
        <li key={uniqKey()}>
          <button
            type="button"
            className={
              el === "..."
                ? cn("item_disabled")
                : el === currentPage
                ? cn("item_active")
                : cn("item")
            }
            disabled={el === "..."}
            onClick={callbacks.onPageChange}
          >
            {el}
          </button>
        </li>
      ))}
    </ul>
  );
}

Pagination.defineProps = {
  currentPage: PropTypes.number,
  pagesCount: PropTypes.number,
  onPageChange: PropTypes.func,
};

Pagination.defaultProps = {
  onPageChange: () => {},
};

export default React.memo(Pagination);
