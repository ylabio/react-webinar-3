import {memo} from 'react';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import PaginationButton from "../pagination-button";
import {getPaginationRange} from "../../utils";
import useSelector from "../../store/use-selector";

const PaginationView = () => {

  const select = useSelector(state => ({
    totalPages: state.catalog.totalPages,
    currentPage: state.catalog.currentPage,
    pageSize: state.catalog.pageSize,
  }));

  const cn = bem('PaginationView');

  const pages = getPaginationRange(select.currentPage, select.totalPages);

  return (
    <div className={cn()}>
      {pages.map((item, index) =>
        item === 'dots' ? (
          <div key={`dots${index}`} className={cn('pageGroup', {type: 'separator'})}>...</div>
        ) : (
          <PaginationButton
            key={item}
            isCurrentPage={item === select.currentPage}
            page={item}
            pageSize={select.pageSize}
          />
        )
      )}
    </div>
  );
};

export default memo(PaginationView);
