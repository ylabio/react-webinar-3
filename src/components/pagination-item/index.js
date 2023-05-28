import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function PaginationItem({ number, current, changeCurrent}){

  const cn = bem('PaginationItem');

  const callbacks = {
    changePage: () => changeCurrent(number)
  }

  const css = [];

  const getCss = (number, current) => {
    if (number - current > 2) css.push('left');
    if (number === current) css.push('active');
    if (number === 1 && current > 3) css.push('right');
  }

  getCss(number, current)

  return (
    <div className={`${cn()} ${ css.join(' ') }`} onClick={callbacks.changePage}>
      { number }
    </div>
  );
}

PaginationItem.propTypes = {
  number: PropTypes.number,
  current: PropTypes.number,
  onChange: PropTypes.func,
};

PaginationItem.defaultProps = {
  onChange: () => {},
}

export default memo(PaginationItem);
