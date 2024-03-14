import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { getPaginationButtons, DOTS } from "../../utils";

function Pagination(props) {

  const cn = bem('Pagination');

  const { currentPage, totalItems, changeCurrentPage} = props;

  const pagesCount = Math.ceil(totalItems / 10);

  const pagesArr = getPaginationButtons(currentPage, pagesCount);

  const callbacks = {
    onHandleClick: (page) => changeCurrentPage(page)
  }

  return (
    <div className={cn()}>
      {!!pagesArr.length && pagesArr.map((p,index) => {
        if (p === DOTS) {
          return <span key={p + index}>{p}</span>;
        }

        return (
          <span
          key={p}
          onClick={() => callbacks.onHandleClick(p)}
          className={cn('item') + ' ' + cn(currentPage === p ? 'item_active' : 'item')}>
            {p}
          </span>
        )}
      )}
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number,
  changeCurrentPage : PropTypes.func
};

Pagination.defaultProps = {
  totalItems: 0,
  changeCurrentPage : () => {}
}

export default memo(Pagination);
