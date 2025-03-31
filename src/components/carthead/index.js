import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Carthead({
    title = '',
}) {

  return (
    <>
        <h1 className='Cart-title'>{title}</h1>
    </>
  );
}

Carthead.propTypes = {
  setShowCart: PropTypes.func,
};

export default Carthead;