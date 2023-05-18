import React from 'react';
import PropTypes from 'prop-types';
import styles from './Controls.module.scss';
import { plural } from '../../utils';
import List from '../list';

const Controls = ({ setModal, modal, countPrice, products, removeProduct, list }) => {
  const handleShowModal = () => {
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  const formattedCountPrice = countPrice.toLocaleString(undefined, {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });

  return (
    <>
      <div className={styles.controls}>
        <p className={styles.controlsTitle}>В корзине:</p>
        <h3 className={styles.controlsCount}>
          {products.length > 0 ? (
            <>
              {products.length}{' '}
              {plural(products.length, {
                one: 'товар',
                few: 'товара',
                many: 'товаров',
              })}
            </>
          ) : (
            'пусто'
          )}{' '}
          {countPrice > 0 ? ` / ${formattedCountPrice}₽` : ''}
        </h3>
        <button className={styles.controlsBtn} onClick={handleShowModal}>
          Перейти
        </button>
      </div>
      {modal && (
        <div className={styles.modalBackground}>
          <div className={styles.modalContainer}>
            <header className={styles.modalHeader}>
              <h1 className={styles.modalHeaderTitle}>Корзина</h1>
              <button onClick={handleCloseModal} className={styles.modalHeaderBtn}>
                Закрыть
              </button>
            </header>
            <div className={styles.modalProductsList}>
              <List list={list} products={products} removeProduct={removeProduct} modal={modal} />
            </div>
            <footer className={styles.modalFooter}>
              <h3 className={styles.modalFooterTitle}>Итого</h3>
              <h3 className={styles.modalFooterCount}>{formattedCountPrice} ₽</h3>
            </footer>
          </div>
        </div>
      )}
    </>
  );
};

Controls.propTypes = {
  setModal: PropTypes.func.isRequired,
  modal: PropTypes.bool.isRequired,
  countPrice: PropTypes.number.isRequired,
  products: PropTypes.array.isRequired,
  removeProduct: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default React.memo(Controls);
