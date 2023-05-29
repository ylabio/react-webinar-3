import PropTypes from "prop-types";
import './style.css';
import {getPaginationRange, isArrayEmpty} from "../../utils";
import {DOTS, DOTS_UNICODE} from "../../constants";
import {cn as bem} from "@bem-react/classname";
import {memo} from "react";

function Pagination({total, limit, currentPage, onChangePage}) {
  const range = getPaginationRange({total, limit, currentPage});

  const cn = bem('Pagination');

  return (
    <div className={cn()}>
      <ul className={cn('list')}>
        {!isArrayEmpty(range) && range.map((value, index) => {
          if (value === DOTS) {
            return <li key={index} className={cn('dots')}>{DOTS_UNICODE}</li>;
          }

          return <li key={index} className={cn('item', {active: currentPage === value})}
                     onClick={() => onChangePage(value)}>
            {value}
          </li>
        })}
      </ul>
    </div>
  )
}

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
};

export default memo(Pagination);