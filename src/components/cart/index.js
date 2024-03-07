import React from "react";
import Head from "../head";
import List from "../list";
import { cn as bem } from "@bem-react/classname";
import Controls from "../controls";
import PropTypes from "prop-types";
import "./style.css";
import { formatCurrency } from "../../utils";

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
    <div className={cn()}>
      <Head title="Корзина">
        <Controls title="Закрыть" onToggleCart={props.onToggleCart} />
      </Head>
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
  );
};

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      count: PropTypes.number,
      price: PropTypes.number,
    })
  ).isRequired,
  onDeleteItem: PropTypes.func,
  onToggleCart: PropTypes.func,
  cartItemsCount: PropTypes.number.isRequired,
  cartTotalPrice: PropTypes.number.isRequired,
};

Cart.defaultProps = {
  onDeleteItem: () => {},
  onToggleCart: () => {},
};

export default React.memo(Cart);
