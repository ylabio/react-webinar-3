import React, { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";
import { useState } from "react";
import { useEffect } from "react";
import { createPageList, createPagination } from "../../utils";
import { Fragment } from "react";

const BtnPages = ({ totalPage, setCurrentPage, currentPage }) => {
  const [arrCurrBtn, setArrCurrBtn] = useState([]);
  let pages = createPageList(totalPage);

  useEffect(() => {
    createPagination(pages, currentPage, setArrCurrBtn);
  }, [totalPage, currentPage]);

  return (
    <section className="BtnPages-section">
      {arrCurrBtn.map((page, i) => (
        <Fragment key={i}>
          <button
            className={
              currentPage === page ? "BtnPages BtnPages-current" : "BtnPages"
            }
            onClick={() => {
              if (page !== "...") {
                setCurrentPage(page);
              }
            }}
          >
            <span className="BtnPages__page">{page}</span>
          </button>
        </Fragment>
      ))}
    </section>
  );
};

BtnPages.propTypes = {
  totalPage: PropTypes.number,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
};

BtnPages.defaultProps = {
  totalPage: 0,
  currentPage: 1,
  setCurrentPage: () => {},
};

export default memo(BtnPages);
