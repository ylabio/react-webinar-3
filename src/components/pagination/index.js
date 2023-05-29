import {memo} from "react"
import "./style.css"
import {fetchPageNumbers} from "../../utils";
import PropTypes from "prop-types";

function Pagination({currentPage, totalPages, goToPage}) {

  const pages = fetchPageNumbers(totalPages, currentPage)

  const handlePageClick = page => {
    if (typeof page === 'number') {
      goToPage(page)
    }
  }

  return (
    <div className="Pagination">
      {pages.map((page, index) => {

        if (typeof page === 'string') {
          return <span key={index}>{page}</span>
        }

        return <a
          onClick={() => handlePageClick(page)}
          key={index}
          className={`page-number ${currentPage === page ? 'active' : ''}`}>
          {page}
        </a>;
      })}
    </div>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
}

Pagination.defaultProps = {
  goToPage: () => {
  }
}

export default memo(Pagination)
