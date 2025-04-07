import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Lang from '../lang';

function Head({ title }) {
  return (
    <div className="Head">
      <div className="Head-container">
        <h1>{title}</h1>
        <Lang/>
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
