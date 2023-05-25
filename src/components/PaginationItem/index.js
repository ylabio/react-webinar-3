import {cn as bem} from "@bem-react/classname";
import {memo} from 'react';
import './style.css';
import PropTypes from "prop-types";

function PaginationItem({isActive, onPageLoad, label}) {
  const cn = bem('PaginationItem');

  return (
    <button onClick={onPageLoad}
            className={`${cn('button')} ${isActive ? cn('button-active') : cn('button-default')}`}>{label}</button>
  )
}


PaginationItem.propTypes = {
  label: PropTypes.number.isRequired,
  onPageLoad: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
};

PaginationItem.defaultProps = {
  isActive: false,
}

export default memo(PaginationItem);

