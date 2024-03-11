import React, { memo } from 'react';
import PropTypes from "prop-types";
import './style.css';

const MenuLayout = ({ children }) => {
  return (
    <section className='MenuLayout'>
      {children}
    </section>
  );
};

MenuLayout.propTypes = {
  children: PropTypes.node,
};

export default memo(MenuLayout);
