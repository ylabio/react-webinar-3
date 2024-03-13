import { memo } from "react";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import PropTypes from "prop-types";

function Pagination({currentPage, totalPages, changePage}) {

  const cn = bem('Pagination');

  const dots = '...'
  const pagesArr = []

  const formPaginationContent = () => {
    const minPage = 1

      if (currentPage === 1 || currentPage === 2) {
        pagesArr.push(minPage, 2, 3, dots, totalPages)
      }
      if (currentPage === 3) {
        pagesArr.push(minPage, 2, 3, 4, dots, totalPages)
      }
      if (currentPage >= 4 && currentPage < totalPages - 2) {
        pagesArr.push(minPage, dots, currentPage - 1, currentPage, currentPage + 1, dots, totalPages)
      }
      if (currentPage > totalPages - 2) {
        pagesArr.push(minPage, dots, totalPages - 2, totalPages - 1, totalPages)
      }
      if (currentPage === totalPages - 2) {
        pagesArr.push(minPage,dots, totalPages - 3, currentPage, totalPages - 1, totalPages)
      }
      
    return pagesArr
  }

  return (
    <div className={cn()}>
      {
        formPaginationContent().map((page, i) => {
          if (page === dots) {
            return <span className={cn('dots')} key={i}>{page}</span>
          } else {
            return <span className={cn('page', {active: page === currentPage})} onClick={() => changePage(page)} key={i}>
              {page}
            </span>
          }
        })
      }
    </div>
  )
}

Pagination.propTypes = {
  changePage: PropTypes.func,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
};

Pagination.defaultProps = {
  changePage: () => {},
}



export default memo(Pagination);