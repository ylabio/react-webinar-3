import React, {useState} from "react";
import PropTypes from "prop-types";
import {plural} from "../../utils";
import './style.css';
import Head from "../head";

function Cart(props){
  console.log(props, 'CART')

  return (
    <div className='Cart'>
      <Head title={props.title}><button onClick={props.closeCart}>Закрыть</button></Head>
    </div>
  );
}

export default React.memo(Cart);
