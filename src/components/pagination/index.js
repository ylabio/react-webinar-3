import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';
import { Link } from "react-router-dom";

function Pagination({page, count, path}) {

    return (
        <div className="Pagination">
            {count > 0 && <div className={"Pagination-pagenum" + (page === 0 ? " Pagination_active" : '')}><Link to={path + '?page=0'}>1</Link></div>}
            {page > 2 && <div className="Pagination-dots">...</div>}
            {((page === 0 || page === 1 || page === 2) && count > 10) &&
                <div className={"Pagination-pagenum" + (page === 1 ? " Pagination_active" : '')}><Link to={path + '?page=1'}>2</Link></div>
            }
            {((page === 0 || page === 1 || page === 2) && count > 20) &&
                <div className={"Pagination-pagenum" + (page === 2 ? " Pagination_active" : '')}><Link to={path + '?page=2'}>3</Link></div>
            }
            {(page === 2 && count > 30) && <div className={"Pagination-pagenum" + (page === 3 ? " Pagination_active" : '')}><Link to={path + '?page=3'}>4</Link></div>}
            {page * 10 === count - count % 10 && <div className="Pagination-pagenum"><Link to={path + '?page=' + (page - 2)}>{page - 1}</Link></div>}
            {page > 2 && <>
                <div className="Pagination-pagenum"><Link to={path + '?page=' + (page - 1)}>{page}</Link></div>
                {(count - count % 10 !== page * 10) && <div className="Pagination-pagenum Pagination_active"><Link to={path + '?page=' + page}>{page + 1}</Link></div>}
                {(count - count % 10 > (page + 1) * 10) && <div className="Pagination-pagenum"><Link to={path + '?page=' + (page + 1)}>{page + 2}</Link></div>}
            </>}
            {((page + 2) * 10 < count - count % 10) && <div className="Pagination-dots">...</div>}
            {count > 10 && <div className={"Pagination-pagenum" + (page === (count - count % 10) / 10 ? " Pagination_active" : '')}><Link to={path + '?page=' + ((count - count % 10) / 10)}>{((count - count % 10) / 10) + 1}</Link></div>}
        </div>
    )

}

Pagination.propTypes = {
    page: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    path: PropTypes.string.isRequired,
}

export default memo(Pagination);