import React from 'react';
import './style.css';
import closeIcon from '../../assets/images/close.png';
import PropTypes from 'prop-types';

function Modal({ title, onClose, children, total }) {
  return (
    <div className="Modal">
      <div className="Modal-overlay" onClick={onClose} />
      <div className="Modal-content">
        <div className="Modal-header">
          <h2>{title}</h2>
          <button className="Modal-close" onClick={onClose}>
            <img src={closeIcon} alt="Закрыть" />
          </button>
        </div>
        <div className="Modal-body">{children}</div>
        {typeof total === 'number' && (
          <div className="Modal-footer">
            <div className="Cart-item Cart-item--total">
              <span>Итого:</span>
              <span>{total.toLocaleString('ru-RU')} ₽</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.node,
  total: PropTypes.number,
};

export default React.memo(Modal);
