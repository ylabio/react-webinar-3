import { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./style.css";

function BarPagination(props) {
  const paginationArray = props.getPaginationArray(props.currentPage, props.totalCountPages);

  return (
    <div className="BarPagination">
      {paginationArray.map((item, index) => {
        if (item !== null) {
          return (
            <Link
              onClick={item !== props.currentPage ? () => props.loadNewPage(item) : null}
              to={`./?page=${item}`}
              key={index}
              className={`BarPagination-btn ${item === props.currentPage ? "BarPagination-btn_active" : null}`}
            >
              {item}
            </Link>
          )
        }

        return
        <span
          key={index}
          className="BarPagination__menu">
          ...
        </span>
      })}
    </div>
  )
}

BarPagination.PropTypes = {
  totalCountPages: PropTypes.number,
  currentPage: PropTypes.number,
  loadNewPage: PropTypes.func,
}

BarPagination.deafultProps = {
  totalCountPages: 0,
  currentPage: 0,
  loadNewPage: () => { }
}

export default memo(BarPagination);
