import { memo } from "react";
import PropTypes from 'prop-types';
import './style.css';
import Navigation from "../navigation";
import BasketTool from "../basket-tool";

function Menu({ sum, amount, onOpen, localeDict }) {
    return (
        <div className='Menu'>
            <Navigation localeDict={localeDict}/>
            <BasketTool sum={sum} amount={amount} onOpen={onOpen} localeDict={localeDict}/>
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