import React from "react";
import List from "../list";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import "./style.css";
import { formatCurrency } from "../../utils";
import Modal from "../modal";

/**
 *  Функция для создания корзины
 * @param {Object} props - объект пропсов
 * @param {Array} props.cart - массив товаров, находящихся в корзине
 * @param {Function} props.onToggleCart - функция показа/скрытия модалки
 * @param {Function} props.onDeleteItem - функция удаления товаров из корзины
 * @param {Number} props.cartItemsCount - количества товаров в корзине
 * @param {Number} props.cartTotalPrice - сумма товаров в корзине
 * @returns разметка
 */
function Cart(props) {
  const cn = bem("Cart");
  const isEmptyCart = props.cartItemsCount === 0;

  return (
    <Modal title="Корзина" onModalOverlayClick={props.onToggleCart} >
      <div className={cn()} >
        <div className={cn("content")}>
          {isEmptyCart
          ? <div className={cn("content", { empty: true })}>
              {`Корзина пуста :(`}
            </div>
          : <>
              <List
                list={props.cart}
                buttonFunction={props.onDeleteItem}
                buttonTitle={"Удалить"}
                />
              <div className={cn("summary")}>
                <div>Итого</div>
                <div className={cn("total")}>{`${formatCurrency(props.cartTotalPrice)}`}</div>
              </div>
            </>
          }
        </div>
      </div>
    </Modal>
  );
};

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onToggleCart: PropTypes.func.isRequired,
  cartItemsCount: PropTypes.number.isRequired,
  cartTotalPrice: PropTypes.number.isRequired,
};

export default React.memo(Cart);
