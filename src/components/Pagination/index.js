import {cn as bem} from "@bem-react/classname";
import {memo} from 'react';
import './style.css';
import PropTypes from "prop-types";
import PaginationItem from "../PaginationItem";

const LABEL_SEEK = 1;

function Pagination({page, lastPage, onPageLoad}) {
  const cn = bem('Pagination');

  return (
    <div className={cn()}>
      {page > 0 && <PaginationItem onPageLoad={() => onPageLoad(0)} label={LABEL_SEEK}/>}

      {page > 2 && lastPage > 3 && <div>...</div>}

      {page === lastPage && lastPage > 2 &&
        <PaginationItem onPageLoad={() => onPageLoad(lastPage - 2)} label={lastPage - 2 + LABEL_SEEK}/>}

      {page > 1 && page < 3 && <PaginationItem onPageLoad={() => onPageLoad(1)} label={1 + LABEL_SEEK}/>}

      {page - 1 > 1 && <PaginationItem onPageLoad={() => onPageLoad(page - 1)} label={page - 1 + LABEL_SEEK}/>}

      <PaginationItem onPageLoad={() => onPageLoad(page)} label={page + LABEL_SEEK} isActive={true}/>

      {page + 1 < lastPage && <PaginationItem onPageLoad={() => onPageLoad(page + 1)} label={page + 1 + LABEL_SEEK}/>}

      {page > lastPage - 1 && page < lastPage - 3 &&
        <PaginationItem onPageLoad={() => onPageLoad(1)} label={1 + LABEL_SEEK}/>}

      {page === 0 && lastPage > 2 && <PaginationItem onPageLoad={() => onPageLoad(2)} label={2 + LABEL_SEEK}/>}

      {page < lastPage - 2 && lastPage > 3 && < div>...</div>}

      {page < lastPage && <PaginationItem onPageLoad={() => onPageLoad(lastPage)} label={lastPage + LABEL_SEEK}/>}
    </div>
  )
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  onPageLoad: PropTypes.func.isRequired,
};


export default memo(Pagination);

