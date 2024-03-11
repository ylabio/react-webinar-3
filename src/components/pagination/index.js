import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';

function Pagination({page, count, onClickPage}) {

    return (
        <div className="Pagination" onClick={e => {onClickPage(+e.target.dataset.pagenum)}}>
            {count > 0 && <div className={"Pagination-pagenum" + (page === 0 ? " Pagination_active" : '')} data-pagenum="0">1</div>}
            {page > 2 && <div className="Pagination-dots">...</div>}
            {((page === 0 || page === 1 || page === 2) && count > 10) &&
                <div className={"Pagination-pagenum" + (page === 1 ? " Pagination_active" : '')} data-pagenum="1">2</div>
            }
            {((page === 0 || page === 1 || page === 2) && count > 20) &&
                <div className={"Pagination-pagenum" + (page === 2 ? " Pagination_active" : '')} data-pagenum="2">3</div>
            }
            {(page === 2 && count > 30) && <div className={"Pagination-pagenum" + (page === 3 ? " Pagination_active" : '')} data-pagenum="3">4</div>}
            {page * 10 === count - count % 10 && <div className="Pagination-pagenum" data-pagenum={page - 2}>{page - 1}</div>}
            {page > 2 && <>
                <div className="Pagination-pagenum" data-pagenum={page - 1}>{page}</div>
                {(count - count % 10 !== page * 10) && <div className="Pagination-pagenum Pagination_active" data-pagenum={page}>{page + 1}</div>}
                {(count - count % 10 > (page + 1) * 10) && <div className="Pagination-pagenum" data-pagenum={page + 1}>{page + 2}</div>}
            </>}
            {((page + 2) * 10 < count - count % 10) && <div className="Pagination-dots">...</div>}
            {count > 10 && <div className={"Pagination-pagenum" + (page === (count - count % 10) / 10 ? " Pagination_active" : '')} data-pagenum={(count - count % 10) / 10}>{((count - count % 10) / 10) + 1}</div>}
        </div>
    )

}

export default memo(Pagination);