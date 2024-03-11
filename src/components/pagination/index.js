import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Pagination ({ pages, changePage }) {

    const cn = bem('Pagination')
    
    const handlePageChange = (event) => {
        event.stopPropagation();
        changePage(event.currentTarget.dataset.page);
    }

    const paginationVariants = {
        1: <>
                <button className='active' data-page={1} onClick={handlePageChange} >1</button>
                <button data-page={pages.currentPage + 1} onClick={handlePageChange} >{pages.currentPage + 1}</button>
                <button data-page={pages.currentPage + 2} onClick={handlePageChange} >{pages.currentPage + 2}</button>
                <span>...</span>
                <button data-page={pages.pagesQuantity} onClick={handlePageChange} >{pages.pagesQuantity}</button>
            </>,
        2: <>
                <button data-page={1} onClick={handlePageChange} >1</button>
                <button className='active' data-page={pages.currentPage} onClick={handlePageChange} >{pages.currentPage}</button>
                <button data-page={pages.currentPage + 1} onClick={handlePageChange} >{pages.currentPage + 1}</button>
                <span>...</span>
                <button data-page={pages.pagesQuantity} onClick={handlePageChange} >{pages.pagesQuantity}</button>
            </>,
        3: <>
                <button data-page={1} onClick={handlePageChange} >1</button>
                <button data-page={pages.currentPage - 1} onClick={handlePageChange} >{pages.currentPage - 1}</button>
                <button className='active' data-page={pages.currentPage} onClick={handlePageChange} >{pages.currentPage}</button>
                <button data-page={pages.currentPage + 1} onClick={handlePageChange} >{pages.currentPage + 1}</button>
                <span>...</span>
                <button data-page={pages.pagesQuantity} onClick={handlePageChange} >{pages.pagesQuantity}</button>
            </>,
        middle: <>
                    <button data-page={1} onClick={handlePageChange} >1</button>
                    <span>...</span>
                    <button data-page={pages.currentPage - 1} onClick={handlePageChange} >{pages.currentPage - 1}</button>
                    <button className='active' data-page={pages.currentPage} onClick={handlePageChange} >{pages.currentPage}</button>
                    <button data-page={pages.currentPage + 1} onClick={handlePageChange} >{pages.currentPage + 1}</button>
                    <span>...</span>
                    <button data-page={pages.pagesQuantity} onClick={handlePageChange} >{pages.pagesQuantity}</button>
                </>,
        beforeForLast: <>
                    <button data-page={1} onClick={handlePageChange} >1</button>
                    <span>...</span>
                    <button data-page={pages.currentPage - 1} onClick={handlePageChange} >{pages.currentPage - 1}</button>
                    <button className='active' data-page={pages.currentPage} onClick={handlePageChange} >{pages.currentPage}</button>
                    <button data-page={pages.currentPage + 1} onClick={handlePageChange} >{pages.currentPage + 1}</button>
                    <button data-page={pages.pagesQuantity} onClick={handlePageChange} >{pages.pagesQuantity}</button>
                    </>,
        forLast: <>
                    <button data-page={1} onClick={handlePageChange} >1</button>
                    <span>...</span>
                    <button data-page={pages.currentPage - 1} onClick={handlePageChange} >{pages.currentPage - 1}</button>
                    <button className='active' data-page={pages.currentPage} onClick={handlePageChange} >{pages.currentPage}</button>
                    <button data-page={pages.pagesQuantity} onClick={handlePageChange} >{pages.pagesQuantity}</button>
                </>,
        last: <>
                    <button data-page={1} onClick={handlePageChange} >1</button>
                    <span>...</span>
                    <button data-page={pages.currentPage - 2} onClick={handlePageChange} >{pages.currentPage - 2}</button>
                    <button data-page={pages.currentPage - 1} onClick={handlePageChange} >{pages.currentPage - 1}</button>
                    <button className='active' data-page={pages.pagesQuantity} onClick={handlePageChange} >{pages.pagesQuantity}</button>
            </>,
    }

    const renderPagination = () => {
        switch (pages.currentPage) {
            case 1:
                return paginationVariants[1]
            case 2:
                return paginationVariants[2]
            case 3:
                return paginationVariants[3]
            case pages.pagesQuantity - 2:
                return paginationVariants['beforeForLast']
            case pages.pagesQuantity - 1:
                return paginationVariants['forLast']
            case pages.pagesQuantity:
                return paginationVariants['last']
            default:
                return paginationVariants['middle']
        }
    }

    return(
        <div className={cn('')}>
            {renderPagination()}
        </div>
    )
}

Pagination.propTypes = {
    pages: PropTypes.shape({
        currentPage: PropTypes.number,
        pagesQuantity: PropTypes.number,
    }),
    changePage: PropTypes.func,
  };
  
  Pagination.defaultProps = {
    changePage: (page) => {},
  }

export default memo(Pagination)