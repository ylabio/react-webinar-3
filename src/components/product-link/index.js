import {memo} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.css';

function ProductLink({id, title}){

  return (
    <Link to={`/product/${id}`} className='ProductLink'>
      {title}
    </Link>
  );
}

ProductLink.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default memo(ProductLink);
