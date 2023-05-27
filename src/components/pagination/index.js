import {useMemo} from "react";
import useSelector from "../../store/use-selector";
import PropTypes from "prop-types";
import './style.css'
import {cn as bem} from '@bem-react/classname';
import {PaginationButton} from "../pagination-button";


export const Pagination = ({perPage}) => {
    const select = useSelector(state => ({
        totalItems: state.catalog.totalItems,
        currentPage: state.catalog.currentPage
    }));

    const cn = bem('Pagination');

    const totalPages = useMemo(() => Math.ceil(select.totalItems / perPage), [perPage, select.totalItems])

    return select.totalItems === 0 ? null : <div className={cn()}>
        {/*<button className={cn('button')}>1</button>*/}
        <PaginationButton page={1}/>
        {
            select.currentPage > 3 ? <span>...</span> : null
        }
        {
            select.currentPage > 2 ? <PaginationButton page={select.currentPage - 1}/> : null
        }
        {
            select.currentPage !== 1 && select.currentPage !== totalPages? <PaginationButton page={select.currentPage}/> : null
        }
        {
            select.currentPage < totalPages - 1 ? <PaginationButton page={select.currentPage + 1}/> : null
        }
        {
            select.currentPage === 1 ? <PaginationButton page={3}/> : null
        }
        {
            select.currentPage + 2 < totalPages ? <span>...</span> : null
        }
        {
            totalPages > 1 ? <PaginationButton page={totalPages}/> : null
        }

    </div>
}

Pagination.propTypes = {
    perPage: PropTypes.number
}

Pagination.defaultProps = {
    perPage: 0
}

