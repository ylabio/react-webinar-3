import "./style.css";
import { useCallback } from "react";
import Pagination from "../pagination";
import PageCountSwitcher from "../page-count-switcher";
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

function PageTools() {
    const store = useStore();
    const { catalog } = store.actions;
    const { currentPage, totalPages, productsPerPage } = useSelector(state => ({
        currentPage: state.catalog.currentPage,
        totalPages: state.catalog.totalPages,
        productsPerPage: state.catalog.productsPerPage,
    }));
    
    const callbacks = {
        changePage: useCallback(newPage => catalog.setPage(newPage), [catalog]),
        changeProductsPerPage: useCallback(newCount => catalog.setProductsPerPage(newCount), [catalog]),
    }

    return(
        <div className="Page-tools">
            <PageCountSwitcher 
                productsPerPage={productsPerPage}
                onCountPageChange={callbacks.changeProductsPerPage}
                changeCurrentPage={callbacks.changePage}
            />
            <Pagination 
                onPageChange={callbacks.changePage}
            />
        </div>
    );
}

export default PageTools;