import React from "react";
import PropTypes from 'prop-types';
import "./style.css";
import Head from "../head";
import List from "../list";
import PageLayout from "../page-layout";
import BottomItem from "../bottom-item";
import ModalApp from "../modal";
function BasketApp({showModal,handleClose,list,listBasket,onFunc,action,onAmountPrice}) {

 const Basket = () => {
    return (
      <PageLayout page={action}>
        <div className='LayoutTop'>
          <Head title='Корзина' orange={true}/>
          <div className='Close'>
            <button className='Button-shop' onClick={handleClose}>
              Закрыть
            </button>
          </div>
        </div>
        <List list={list}
              listBasket={listBasket}
              onFunc={onFunc}
              action={action}/>
        <BottomItem onAmountPrice={onAmountPrice}/>
      </PageLayout>
    );
  };

  return (
    <ModalApp showModal={showModal} children={Basket()}/>
  );
}

BasketApp.propTypes = {
  showModal: PropTypes.bool,
  handleClose: PropTypes.func,
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  itemBasket: PropTypes.shape({
    code: PropTypes.number,
    qproduct: PropTypes.number,
  }).isRequired,
  onFunc: PropTypes.func,
  action: PropTypes.number,
  onAmountPrice: PropTypes.func
};

BasketApp.defaultProps = {
  handleClose: () => {},
  onFunc: () => {},
  onAmountPrice: () => {},
}

export default React.memo(BasketApp);