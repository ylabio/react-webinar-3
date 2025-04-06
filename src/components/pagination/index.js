import { memo, useCallback } from "react";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";
import { getPageList } from "../../utils";
import 'style.css'

function Pagination() {
  const store = useStore();

  const select = useSelector(state => ({
    limit: state.catalog.limit,
    skip: state.catalog.skip,
    productsAmount: state.catalog.productsAmount,
  }));

  const callbacks = {
    onChangeLimit: useCallback((e) => store.actions.catalog.setLimit(Number(e.target.value)), [store]),
    onChangeSkip: useCallback((page) => store.actions.catalog.setSkip((page - 1) * select.limit), [store])
  };


  const limitNumbers = [5, 10, 20];
  const totalPages = Math.ceil(select.productsAmount / select.limit);
  const currentPage = Math.floor(select.skip / select.limit + 1);
  const pageList = getPageList(currentPage, totalPages);

  return (
    <div className="Pagination">
      <div className="products-limit">
        <label>Показывать товаров на странице</label>
        <select name="products-number" value={select.limit} onChange={(e) => callbacks.onChangeLimit(e)}>
          {limitNumbers.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>

      <div className="page-number">
        {pageList.map((page, index) =>
          page === "..." ? (
            <div key={index} className="page-number--dots">...</div>
          ) : (
            <div
              key={index}
              className={page === currentPage ? 'page-number--selected' : ''}
              onClick={() => callbacks.onChangeSkip(page)}
            >
              {page}
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default memo(Pagination);
