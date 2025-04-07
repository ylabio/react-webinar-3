import {useEffect , memo} from 'react';
import './style.css';
import PaginationButtons from '../pagination-buttons';
import { cn as bem } from '@bem-react/classname'
import PropTypes from 'prop-types';

function Pagination({
    page, 
    limit,
    totalPages,
    paginationMessage, 
    changeLimit = ()=>{}, 
    changePage = ()=>{},
    load =()=>{},
    loadCount = ()=>{},}){

    const cn = bem("Pagination")

    function handleChangeLimit(event){
        console.log(event.target.value)
        changeLimit( Number(event.target.value))
    }
    function handleChangeCurrentPage(event){
        changePage(Number(event.target.value))
    }

    useEffect(() => {
        loadCount();
      }, []);

    useEffect(() => {
        load();
      }, [page, limit]);
    
    return (
        <div className={cn()}>
            <p className={cn("show")}>
            {paginationMessage} :  
            </p>
            <div >
            <select className={cn("select")} onChange={handleChangeLimit} value={limit}>
                <option>10</option>
                <option>20</option>
                <option>30</option>
            </select>
            </div>
            <PaginationButtons onChangePage={handleChangeCurrentPage} currentPage={page} totalPages={totalPages}/>
        </div>
    )
};

Pagination.propTypes = {
    page : PropTypes.number, 
    limit: PropTypes.number,
    totalPages: PropTypes.number,
    paginationMessage : PropTypes.string,
};
export default memo(Pagination)