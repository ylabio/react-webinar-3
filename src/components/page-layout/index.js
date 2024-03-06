import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import ProductsBasket from "../products_basket";
import Controls from "../controls";
import Head from "../head";
import List from "../list";
import './style.css';

function PageLayout({onAddBasket, setBasketOpen, list}) {

  const cn = bem('PageLayout');


  return (
    <div className={cn()}>
      <div className={cn('center')}>
      <Head title='Магазин'/>
  
  <ProductsBasket 
  total={list.total}
  >
    <Controls onButton={()=>setBasketOpen(true)} name='Перейти' />
  </ProductsBasket>
  <List list={list.list}
        onAddBasket={onAddBasket}
     />
      </div>
    </div>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node,
  onAddBasket: PropTypes.func,
  list:PropTypes.object
}

export default PageLayout;
