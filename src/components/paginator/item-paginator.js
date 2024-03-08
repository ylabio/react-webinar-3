import {cn as bem} from '@bem-react/classname';
import {memo} from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ItemPaginator({onSetPage, page, isActive}) {
  const cn = bem('Paginator');

  const callbacks = {
    setPage: () => onSetPage(page)
  }

  return (
    <div className={cn('item', { active: isActive })} onClick={callbacks.setPage}>{ page }</div>
  )
}

ItemPaginator.propTypes = {
  onSetPage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  isActive: PropTypes.bool
};

ItemPaginator.defaultProps = {
  isActive: false
}

export default memo(ItemPaginator);