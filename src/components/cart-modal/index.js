import Modal from "../modal";
import {memo} from "react";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import CartList from "../cart-list";
import "./style.css";
import {formatPrice} from "../../utils";


function CartModal(props) {
  const cn = bem('CartModal');

  return <Modal title='Корзина' onClose={props.onClose} isOpen={props.isOpen}>
    <CartList onDeleteItem={props.onDeleteItem} items={props.list} />
    <div className={cn('footer')}>
      <span className={cn("total")}>Итого</span>
      <span className={cn("price")}>{formatPrice(props.totalPrice)}</span>
    </div>
  </Modal>
}

export default memo(CartModal);

CartModal.propTypes = {
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
  list: PropTypes.array,
  onDeleteItem: PropTypes.func,
  totalPrice: PropTypes.number
}

CartModal.defaultArgs = {
  onClose: () => {},
  onDeleteItem: () => {},
}