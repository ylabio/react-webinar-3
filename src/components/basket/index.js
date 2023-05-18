import './style.css';
import React from "react";
import PropTypes from "prop-types";
import Head from "../head";
import List from "../list";
import PageLayout from "../page-layout";

function Basket({list, onListItemBtnClick, onControlsBtnClick, totalPrice}) {

  return (
    <div className={'basket'}>
      <div className={'basket-content'}>
        <PageLayout>
          <div className={'basket-header'}>
            <Head title='Корзина'/>
            <button className={'basket-close'} onClick={onControlsBtnClick}>
              Закрыть
            </button>
          </div>
          <div className={'basket-section__empty'}>

          </div>
          <List list={list}
                onBtnClick={onListItemBtnClick}
                buttonText={'Удалить'}
                basketMode={true}/>
          <div className={'basket-total'}>
            Итого:
            <div className={'basket-total__count'}>
              {`${totalPrice} ₽`}
            </div>
          </div>
        </PageLayout>
      </div>
    </div>
  )
}

Basket.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  totalPrice: PropTypes.number,
  onListItemBtnClick: PropTypes.func,
  onControlsBtnClick: PropTypes.func
};

export default React.memo(Basket);