import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
// import {numberFormat} from "../../utils";
import './style.css';

function Product() {
  const cn = bem('Pruduct');
  return (
    <div className={cn()}>
      <span className={cn('cell')}>Product: {0}</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

// Product.propTypes = {
//   id: PropTypes.number
// };

// Product.defaultProps = {
//   id: 0
// }

export default memo(Product);