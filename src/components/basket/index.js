import React from "react";
import PropTypes from "prop-types";
import Head from "../head";
import Button from "../button";
import './style.css';

function Basket({callback}) {
  return (
    <div className='Basket'>
      <Head tag='h2' title='Корзина'>
        <Button style="Button_basket" callback={callback}>
          Закрыть
        </Button>
      </Head>
    </div>
  )
}

// Typechecking with PropTypes:
Basket.propTypes = {
  callback: PropTypes.func.isRequired,
};

// Default values for properties:
Basket.defaultProps = {
  callback: () => {},
};

export default React.memo(Basket);
