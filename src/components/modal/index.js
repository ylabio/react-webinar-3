import React, { useEffect, useRef } from 'react';
import CloseIcon from '../CloseIcon';
import './style.css';

function Modal({
  isOpen = false,
  onClose = () => {},
  products = [],
  totalPrice = 0,
  onDeleteProduct = () => {},
}) {
  const dialogRef = useRef(null);
  const modalBoxRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen, onClose]);

  // Предотвращение закрытия модального окна при клике на него самого
  const handleBackdropClick = e => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog ref={dialogRef} className="Modal" style={{ padding: 0 }} onClick={handleBackdropClick}>
      <div ref={modalBoxRef} className="Modal-content">
        <h2 className="Modal-title">Корзина</h2>
        {products.length > 0 ? (
          <div className="Modal-box">
            <ul className="Modal-list">
              {products.map(product => (
                <li key={product.code} className="Modal-item">
                  <b>{product.title}</b>
                  <div className="Modal-right">
                    <div className="Modal-info">
                      <p className="Modal-info-count">{product.count} шт</p>
                      <p className="Modal-info-price">{product.price} ₽</p>
                    </div>

                    <button
                      onClick={e => {
                        e.stopPropagation();
                        onDeleteProduct(product.code);
                      }}
                      className="Modal-remove-button"
                    >
                      Удалить
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="Modal-total">
              <b className="Modal-total-label">Итого:</b>
              <b className="Modal-total-price">{totalPrice} ₽</b>
            </div>
          </div>
        ) : (
          <div>
            {/* <p>Корзина пуста</p> */}
            <div className="Modal-total">
              <b className="Modal-total-label">Итого:</b>
              <b className="Modal-total-price">{totalPrice} ₽</b>
            </div>
          </div>
        )}
        <button className="Modal-close" onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
    </dialog>
  );
}

export default React.memo(Modal);
