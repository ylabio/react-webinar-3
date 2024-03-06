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
 * @param {Function} props.calculateItems - функция подсчета количества товаров в корзине
 * @param {Function} props.calculateSum - функция подсчета суммы товаров в корзине
 * @returns разметка
 */
function Cart(props) {
  const isEmptyCart = props.calculateItems();
  const cn = bem("Cart");

  return (
    <div className={cn()}>
      <Head title="Корзина">
        <Controls title="Закрыть" onToggleCart={props.onToggleCart} />
      </Head>
      <div className={cn("content")}>
        {isEmptyCart
        ? <>
            <List
              list={props.cart}
              buttonFunction={props.onDeleteItem}
              buttonTitle={"Удалить"}
            />
            <div className={cn("summary")}>
              <div>Итого</div>
              <div className={cn("total")}>{`${formatCurrency(
                props.calculateSum()
              )}`}</div>
            </div>
          </>
        : <div className={cn("content", { empty: true })}>
            {`Корзина пуста :(`}
          </div>
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
      subSum: PropTypes.number,
    })
  ).isRequired,
  onDeleteItem: PropTypes.func,
  onToggleCart: PropTypes.func,
  calculateSum: PropTypes.func,
  calculateItems: PropTypes.func,
};

Cart.defaultProps = {
  onDeleteItem: () => {},
  onToggleCart: () => {},
  calculateSum: () => {},
  calculateItems: () => {},
};

export default React.memo(Cart);
