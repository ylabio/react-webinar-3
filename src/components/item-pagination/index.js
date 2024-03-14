import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {Link} from 'react-router-dom';
import './style.css';

function ItemPagination (props) {

  const cn = bem('ItemPagination');

    if (props.item._id === 0 || props.item._id === 1 || props.item._id === 3) {
      return (
        <>
          {(props.item._id === 0 || props.item._id === 1 && props.list[1].page || props.item._id === 3 && props.list[3].page) 
          && <Link
            className={props.page === props.item.page ? cn('link active') : cn('link')} 
            to={props.link}
          >
            {props.item.page}
          </Link>}
          {(props.item._id === 0 && props.list[3].page || props.item._id === 3 && props.list[1].page) 
            && <span className={cn('lots-dots')}>...</span>}
        </>
      );

    } else {
      return (
        <Link 
          className={props.page === props.item.page ? cn('link active') : cn('link')}
          to={props.link}
        >
          {props.item.page}
        </Link>
      );
    }
}

ItemPagination.propTypes = {
  list: PropTypes.array,
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    page: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
  }).isRequired,
  page: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number, PropTypes.bool
  ]),
  link: PropTypes.string,
}

export default memo(ItemPagination);