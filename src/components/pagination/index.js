import {memo} from "react";
import PropTypes from "prop-types";
import './style.css'

/** Пагинация в обертке
 * @param currentPage {number} - номер текущей (открытой) страницы
 * @param count {number} - общее кол-во товара
 * @param pageSelectHandler {function} - ф-я, срабатывающая при нажатии на элемент пагинации (выбор страницы)
 * @param itemsPerPage {number} - единиц на страницу
 * @returns {JSX.Element}
 * @constructor
 */
function Pagination({currentPage, count, pageSelectHandler, itemsPerPage}) {

  const totalPages = Math.ceil(count / itemsPerPage)


  const PaginationItem = ({pageNumber}) => {
    return (
      <a
        className={`pagination-item ${pageNumber === parseInt(currentPage, 10) && !isNaN(parseInt(pageNumber, 10)) ? 'pagination-item_current' : ''}${isNaN(parseInt(pageNumber, 10)) ? 'pagination-item_not-active' : ''}`}
        onClick={(evt) => pageNumber === parseInt(currentPage, 10) && !isNaN(parseInt(pageNumber, 10)) ? null : pageSelectHandler(evt, pageNumber)}>{pageNumber}</a>
    )
  }


  return (
    <div className='pagination-wrapper'>

      <div className='pagination'>
        <PaginationItem pageNumber={1}/> {/* 1-я страница */}
        {currentPage > 3 ? <PaginationItem pageNumber='...'/> : ''} {/* Три точки перед, если стр. > 4 */}
        {currentPage > 2 ? <PaginationItem pageNumber={currentPage - 1}/> : ''}
        {currentPage >= 2 && currentPage !== totalPages ? <PaginationItem pageNumber={currentPage}/> : ''}
        {currentPage < totalPages - 1 ? <PaginationItem pageNumber={currentPage + 1}/> : ''}
        {currentPage === 1 ?<PaginationItem pageNumber={currentPage + 2}/> : ''}
        {currentPage < totalPages - 2 ? <PaginationItem pageNumber='...'/> : ''} {/* Три точки после */}
        <PaginationItem pageNumber={totalPages}/> {/* Последняя страница */}
      </div>

    </div>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  pageSelectHandler: PropTypes.func.isRequired
}

export default memo(Pagination);