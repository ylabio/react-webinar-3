import PropTypes from 'prop-types';
import { memo } from 'react';
import './style.css';

const PageTitle = ({ title }) => {
  return (
    <div className="PageTitle">
      <h2>{title}</h2>
    </div>
  );
};

export default memo(PageTitle);

PageTitle.propTypes = {
  title: PropTypes.string,
};
