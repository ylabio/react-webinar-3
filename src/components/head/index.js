import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import UserTools from '../../containers/user-tools'

function Head({ title, children }) {
  return (
    <div className="Head">
      <div className="Head-action">
        <div className="Head-container">
          <UserTools />
        </div>
      </div>
      <div className="Head-body">
      <div className="Head-container">
        <h1>{title}</h1>
        <div className="Head-place">{children}</div>
      </div>
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
};

export default memo(Head);
