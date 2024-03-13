import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Tools({children}) {

  return (
    <div className='Tools'>
      {
        children.map((item, i) => {
          return <div key={i}>{item}</div>
        })
      }
    </div>
  )
}

Tools.propTypes = {
  children: PropTypes.node
};

export default memo(Tools);