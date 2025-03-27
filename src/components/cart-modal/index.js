import React, { forwardRef } from 'react';
import "./style.css"
import PropTypes from 'prop-types';
import Modal from "../modal";
import Controls from '../controls';
import Close from '../../assets/close-mark.svg'
import CartModalFooter from '../cart-modal-footer';
import List from '../list';

const CartModal = forwardRef( function CartModal({list = [], onDeleteItemfromCart = ()=> {},  allPrice}, ref){
    const availableList = list.filter((item) => item.quantity > 0);
    return(
        <Modal ref={ref}>
            <div className='Modal-header'>
            <h1 >Корзина</h1>
            <Controls handleClick={()=>{ref.current.close()}} ><Close/></Controls>
            </div>
            <div className='Modal-content'>
                {availableList.length  <=0 && <p className='Modal-empty'><b>В корзине пусто</b></p>}
                {availableList.length > 0 && (<><List cartitem={true} list={availableList} onDeleteItemfromCart={onDeleteItemfromCart} />
                <CartModalFooter allPrice={allPrice} /></>)}
            </div>
        </Modal>
    )
});

CartModal.propTypes = {
    onDeleteItemfromCart: PropTypes.func,
    list: PropTypes.arrayOf(
        PropTypes.shape({
          code: PropTypes.number,
        }),
      ),
    allPrice: PropTypes.number,
    children: PropTypes.node,
};


export default CartModal;