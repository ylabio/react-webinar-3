import React from 'react';
import PropTypes from 'prop-types';
import cross from '../../assets/images/cross.svg';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CloseButton({ onClick }) {
  const cn = bem('CloseButton');

  return (
    <button className={cn()} type="button" onClick={onClick}>
      <img src={cross} alt="Закрыть" />
    </button>
  );
}

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default React.memo(CloseButton); 