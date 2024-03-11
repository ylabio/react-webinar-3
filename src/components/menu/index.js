import { memo } from "react";
import PropTypes from 'prop-types';
import './style.css';
import Navigation from "../navigation";
import BasketTool from "../basket-tool";

function Menu({ sum, amount, onOpen }) {
    return (
        <div className='Menu'>
            <Navigation />
            <BasketTool sum={sum} amount={amount} onOpen={onOpen} />
        </div>
    )
}

Menu.propTypes = {
    local: PropTypes.object,
    sum: PropTypes.number,
    amount: PropTypes.number,
    onOpen: PropTypes.func
};

export default memo(Menu);