import React from 'react';
import Home from "../home";
import PropTypes from "prop-types";
import BasketTool from "../basket-tool";
import './style.css'


const BasketLine = ({sum, amount, onOpen, goToFirstPage}) => {
    return (
        <div className='BasketLine'>
            <Home goToFirstPage={goToFirstPage}/>
            <BasketTool sum={sum} amount={amount} onOpen={onOpen}/>
        </div>
    );

};

BasketLine.propTypes = {
    onOpen: PropTypes.func.isRequired,
    sum: PropTypes.number,
    amount: PropTypes.number,
    goToFirstPage: PropTypes.func,
};

BasketLine.defaultProps = {
    onOpen: () => {
    },
    sum: 0,
    amount: 0
}
export default BasketLine;