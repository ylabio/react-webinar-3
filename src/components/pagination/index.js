import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Pagination({ onChangePage, pagesNumber, activePage }) {
  const [currentButton, setCurrentButton] = useState(activePage);
  const [pages, setPages] = useState([]);

  const dots = null;

  const pagesArr = Array.from({ length: pagesNumber }, (_, i) => i + 1);

  // function onChange(e) {
  //   setLimit(e.target.value);
  // }

  // useEffect(() => onChangeLimit(limit), [limit]);

  useEffect(() => {
    let visiblePages = [];

    if (currentButton >= 1 && currentButton <= 2) {
      visiblePages = [1, 2, 3, dots, pagesArr.length];
    } else if (currentButton === 3) {
      visiblePages = [1, 2, 3, 4, dots, pagesArr.length];
    } else if (currentButton >= 4 && currentButton < pagesArr.length - 2) {
      visiblePages = [
        1,
        dots,
        currentButton - 1,
        currentButton,
        currentButton + 1,
        dots,
        pagesArr.length,
      ];
    } else if (currentButton > pagesArr.length - 4) {
      const slice = pagesArr.slice(pagesArr.length - 4);
      visiblePages = [1, dots, ...slice];
    }

    setPages(visiblePages);
    onChangePage(currentButton);
  }, [currentButton]);

  const cn = bem("Pagination");

  return (
    <div className={cn()}>
      <div className={cn("pages")}>
        {/* <div>Показывать на странице:</div>
        <select onChange={onChange}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select> */}

        {pages.map((page, index) => {
          if (!page) {
            return (
              <div className={cn("dots")} key={index}>
                ...
              </div>
            );
          } else
            return (
              <Link to={`/?page=${page}`} key={index}>
                <div
                  className={`${cn("page")} ${
                    currentButton === page ? cn("page_active") : ""
                  }`}
                  onClick={() => {
                    setCurrentButton(page);
                  }}
                >
                  {page}
                </div>
              </Link>
            );
        })}
      </div>
    </div>
  );
}

Pagination.propTypes = {
  pagesNumber: PropTypes.number,
  onChangePage: PropTypes.func,
};

Pagination.defaultProps = {
  onChangePage: () => {},
};

export default React.memo(Pagination);
