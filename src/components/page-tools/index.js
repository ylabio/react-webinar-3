import {memo, useCallback} from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import PaginationButtons from '../pagination-buttons'
import NumberProducts from '../number-products'
import useStore from '../../store/use-store'
import useSelector from '../../store/use-selector'

function PageTools() {
  const cn = bem('PageTools');
  const store = useStore()
  
  const select = useSelector(state => ({
    totalPages: state.catalog.totalPages,
    productsOnPage: state.catalog.productsOnPage,
    currentPage: state.catalog.currentPage,
  }))

  const callbacks = {
    setProductsOnPage: useCallback(newProductsOnPage => 
      store.actions.catalog.setProductsOnPage(newProductsOnPage), [store]),
    
    setCurrentPage: useCallback(newCurrentPage => store.actions.catalog.setPage(newCurrentPage), [store]),
  };


  return (
    <div className={cn()}>
      <NumberProducts 
        countDisplayProducts={select.productsOnPage} 
        onSelect={callbacks.setProductsOnPage}
      />
      <PaginationButtons 
        totalPages={select.totalPages} 
        currentPage={select.currentPage}
        onChange={callbacks.setCurrentPage}
      />
    </div>
  );
}

export default memo(PageTools);
