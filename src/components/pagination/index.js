import { memo } from "react";
import "./style.css"
import PaginationItem from "../pagination-item";
import PropTypes from 'prop-types';

function Pagination({ currentSkip, changePage, maxPage  }) {

    let numbersToShow = [1,2,3,"...",maxPage]    
    const currentPage = currentSkip/10 + 1
    if(currentPage === 3){
        numbersToShow = [1,2,3,4,"...", maxPage]
    }
    if (currentPage >= 4){
        numbersToShow = [1,"...",currentPage - 1, currentPage, currentPage + 1, "...", maxPage]
    }
    if(currentPage >= maxPage - 2){
        numbersToShow = [1, "...", maxPage -3, maxPage -2, maxPage - 1, maxPage]
    }
    return (
        <div className="Pagination">
            {
                numbersToShow.map((el, index) => {
                    if(el === "...") return <PaginationItem number={el} key={index + el}/>
                    if (el === currentPage){
                        return <PaginationItem changePage={changePage} key={el} selected={true} number={el}/>
                    }
                    else{
                        return <PaginationItem changePage={changePage} key={el} selected={false} number={el}/>
                    }
                })
            }
        </div>
    )
}
// TODO: PropTypes

Pagination.propTypes = {
    currentSkip: PropTypes.number,
    changePage: PropTypes.func,
    maxPage: PropTypes.number
  };

Pagination.defaultProps = {
    changePage: () => {},
    maxPage: 0
  }

export default memo(Pagination)