import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "./style.css";
import Item from "../item";
import Head from "../head";

const Modal = ({ active, products, onDeleteItem, onCloseModal, totalPrice }) => {

  return (
    <>
      {active && (
        <article className="Modal">
          <section className="Modal-content">
            <Head title="Корзина" active={active} closeModal={onCloseModal} />
            {products.length > 0 ? (
              <>
                <div className="Modal-content-item">
                  {products.map((item, id) => (
                    <Fragment key={item.code}>
                      <Item
                        item={item}
                        active={active}
                        onDelete={onDeleteItem}
                        id={id + 1}
                      />
                    </Fragment>
                  ))}
                </div>

                <div className="Modal-content-total">
                  <span>Итого</span>{" "}
                  <span>{totalPrice} ₽</span>
                </div>
              </>
            ) : (
              <div className='Modal-content-cartempty'>Ваша корзина пуста! Скорее вернитесь в магазин!</div>
            )}
          </section>
        </article>
      )}
    </>
  );
};

Modal.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  onDeleteItem: PropTypes.func,
  onCloseModal: PropTypes.func,
  active: PropTypes.bool,
  totalPrice: PropTypes.node,
};

Modal.defaultProps = {
  onDeleteItem: () => {},
  onCloseModal: () => {},
};

export default React.memo(Modal);
