import React, {useState} from 'react';
import './style.css';
import Head from "../head";
import List from "../list";

function Card({items, onCloseModal}) {
  return (
    <div className='Card'>
      <div className='Card-wrapper'>
        <Head title='Корзина' isModal onClose={onCloseModal} />
        <div className='Card-list-wrapper'>
          <List list={items} isModal/>
        </div>
        <div className='Card-results'>
          <p>Итого <span>N &#8381;</span></p>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Card);