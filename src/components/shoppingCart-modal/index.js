import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import PageLayout from '../page-layout';
import Head from '../head';
import List from '../list';
import { priceFormat } from '../../utils';

function ShoppingCartModal({shoppingCartList, total, handleClickOpenModal, onRemoveItemFromShoppingCart}) {
  return (
    <div className="darkBG">
      <PageLayout bemEntity="ModalPageLayout">
        <Head title="Корзина" modal handleClickOpenModal={handleClickOpenModal} />
        <List
          list={shoppingCartList}
          onRemoveItemFromShoppingCart={onRemoveItemFromShoppingCart}
          modal />
        {(total.totalAmount > 0) && (
          <div className="ModalPageLayout-Total">
            <span>Итого</span>
            <span>{priceFormat(total.totalCost)}</span>
          </div>
        )}
      </PageLayout>
    </div>
  )
}

ShoppingCartModal.propTypes = {
  total: PropTypes.shape({
    totalAmount: PropTypes.number,
    totalCost: PropTypes.number,
  }),
  shoppingCartList: PropTypes.array,
  handleClickOpenModal: PropTypes.func,
  onRemoveItemFromShoppingCart: PropTypes.func
}

export default React.memo(ShoppingCartModal)