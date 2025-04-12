import { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Head({ title, children, category }) {
  useEffect(()=>{
      document.title = category  ? `Магазин / ${category}` : 'Магазин';
  },[category])

  return (
    <div className="Head">
      <div className="Head-container">
        <h1>{title}{category && `/${category}`}</h1>
        <div className="Head-place">{children}</div>
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
  category: PropTypes.string,
};

export default memo(Head);
