import {useEffect , useRef, useState, memo} from 'react';
import './style.css';
import PaginationButtons from '../pagination-buttons';
import { cn as bem } from '@bem-react/classname'
import useSelector from '../../store/use-selector';
import { messages } from '../../messages';

function Pagination({
    page, 
    limit,
    totalPages, 
    changeLimit = ()=>{}, 
    changePage = ()=>{},
    load =()=>{},
    loadCount = ()=>{},}){

    const cn = bem("Pagination")

    const select = useSelector(state => ({
        lang: state.inter.lang,
        
      }));

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
    
    const showItemsMessage = messages[select.lang].showItems  

    return (
        <div className={cn()}>
            <p className={cn("show")}>
            {showItemsMessage} :  
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
}

export default memo(Pagination)