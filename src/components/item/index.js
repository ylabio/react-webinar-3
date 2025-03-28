import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Button from '../button';

function Item({ item, buttonAction, buttonType, children }) {

  return (
    <div
      className={'Item'}
    >
      <div className="Item-title">
        <b>{item.title}</b>
      </div>
      {children &&
        <div className="Item-data">
          {children}
        </div>
      }
      <div className="Item-actions">
        <Button onClick={() => buttonAction(item.code)} buttonType={buttonType} />
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
  }).isRequired,
  children: PropTypes.node,
};

export default React.memo(Item);
