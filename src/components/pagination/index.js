import {useEffect , useRef, useState} from 'react';
import useStore from '../../store/use-store';
import { loadAll } from '../util/http';
import './style.css';
import PaginationButtons from '../pagination-buttons';
import { cn as bem } from '@bem-react/classname'

function Pagination(){
    const cn = bem("Pagination")

    const store = useStore();
    const limit = useRef();
    const [enteredLimit, setEnteredLimit] = useState(10);
    const [listLength, setlistLength] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    function handleChangeLimit(){
        setEnteredLimit(limit.current.value)
        setCurrentPage(1);
    }
    function handleChangeCurrentPage(event){
        console.log(event)
        setCurrentPage(Number(event.target.value))
    }

    useEffect(() => {
        async function loadAllItems(){
            const allList = await loadAll();
            console.log(allList)
            setlistLength(allList.length)
        };

        loadAllItems();
        const limitValue = enteredLimit; 
        const skipValue =  (currentPage > 1) ? currentPage * limitValue : 0;

        store.actions.catalog.load(limitValue, skipValue);
      }, [enteredLimit, currentPage]);
      
    return (
        <div className={cn()}>
            <p className={cn("show")}>
            Показ товаров :  
            </p>
            <div >
            <select className={cn("select")} onChange={handleChangeLimit} ref={limit}>
                <option>10</option>
                <option>20</option>
                <option>30</option>
            </select>
            </div>
            <PaginationButtons onChangePage={handleChangeCurrentPage} currentPage={currentPage} totalPages={Math.round(listLength / enteredLimit)}/>
        </div>
    )
}

export default Pagination