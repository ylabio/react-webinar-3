import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import Head from "../head";
import List from "../list";

function ModalStore({closeModal, list, onClick}) {

  const cn = bem('ModalStore');

  return (
    <div className={cn()}>
      <Head title="Корзина">
        <button onClick={closeModal}>
          Закрыть
        </button>
      </Head>
      <List list={list}
            onClick={onClick} btnName={'Удалить'}/>
    </div>
  );
}

ModalStore.propTypes = {
  children: PropTypes.node,
};

export default React.memo(ModalStore);
