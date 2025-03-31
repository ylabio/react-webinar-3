import React from 'react';
import PropTypes from 'prop-types';

function ItemTitle({ title }) {
  return (
    <div className="Item-title">
      <b>{title}</b>
    </div>
  );
}

ItemTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default React.memo(ItemTitle);
