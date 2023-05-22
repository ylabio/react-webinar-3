import React, { useCallback } from 'react';
import { store } from '../..';
import './style.css';

function Controls() {
  const callbacks = {
    onModalOpen: useCallback(() => store.modalOpen(), [store]),
  };
  return (
    <div className='Controls'>
      <button className='Controls-btn' onClick={callbacks.onModalOpen}>
        Перейти
      </button>
    </div>
  );
}

export default React.memo(Controls);
