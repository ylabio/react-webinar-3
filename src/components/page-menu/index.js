import React from 'react';
import {Link} from "react-router-dom";
import BasketTool from "../basket-tool";
import PropTypes from "prop-types";
import {lang as langData} from '../../lang/data'
import './style.css'

const PageMenu = ({ openModal, amount, sum, lang }) => {
  return (
    <div className='PageMenu'>
      <Link to={'/'} className='PageMenu-link'>
        {langData.headers.toHome[lang]}
      </Link>
      <BasketTool
        onOpen={openModal}
        amount={amount}
        sum={sum}
        lang={lang}
      />
    </div>
  );
};

PageMenu.propTypes = {
  openModal: PropTypes.func,
  amount: PropTypes.number,
  sum: PropTypes.number,
  lang: PropTypes.string
}

PageMenu.defaultProps = {
  openModal: () => {}
}

export default React.memo(PageMenu);
