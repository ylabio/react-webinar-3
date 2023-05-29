import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import propTypes from 'prop-types';

function Head({ title, render }) {
  return (
    <div className="Head">
      <h1>{title}</h1>
      {render()}
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  render: propTypes.func,
};

Head.defaultProps = {
  render: () => {},
};

export default memo(Head);
