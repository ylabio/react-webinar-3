import './style.css'
import React from "react";
import Head from "../head";
import Controls from "../controls";
import List from "../list";
import PageLayout from "../page-layout";
import {plural} from "../../utils";

function Market ({list, headTitle, onOpenBasket, onAddItemToBasket, listBtnText, totalPrice, totalItems}) {
  return (
      <PageLayout>
        <Head title={headTitle}/>
        <div className={'market-info'}>
          <div>
            В корзине:
            <span>
              {`${totalItems} ${plural(totalItems, {one: 'товар', few: 'товара', many: 'товаров'})} / ${totalItems ? `${totalPrice} ₽` : 'пусто'}`}
            </span>
          </div>
          <Controls onClick={onOpenBasket}/>
        </div>
        <List list={list}
              onBtnClick={onAddItemToBasket}
              buttonText={listBtnText}/>
      </PageLayout>
    )
}

export default Market