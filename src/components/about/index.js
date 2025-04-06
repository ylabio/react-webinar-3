import { memo } from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function About({ aboutProduct, renderItem = ()=>{}}) {
  return (
    <div className="About">
      {renderItem(aboutProduct)}
    </div>
  );
}
export default memo(About);