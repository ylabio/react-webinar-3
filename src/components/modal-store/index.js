import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import Head from "../head";
import List from "../list";

function ModalStore({closeModal, store, onClick}) {

  const cn = bem('ModalStore');

  return (
    <div className={cn()}>
      <Head title="Корзина">
        <button onClick={closeModal}>
          Закрыть
        </button>
      </Head>
      <div className={cn('space')}></div>
      <List list={store.getState().storeList}
            onClick={onClick} btnName={'Удалить'} cart={true}/>
      <div className={cn("header")}>
        <p className={cn("bold_span")}>Итого</p>
        <p className={cn("bold_span", "price")}>{`${store.getCartPrice()} ₽`}</p>
      </div>
    </div>
  );
}

ModalStore.propTypes = {
  children: PropTypes.node,
};

export default React.memo(ModalStore);
