import React from "react";
import PropTypes from "prop-types";
import './style.css';
import { formatPrice } from "../../utils";

function Sum(props) {
    return (
        <div className='Modal-sum'>
            <div className='Cell'>&nbsp;</div>
            <div className="Cell Cell_main">&nbsp;</div>
            <div className="Cell"><b>Итого</b></div>
            <div className="Cell"><b>{formatPrice(props.sum)/*sumGoods(props.list)*/}</b></div>
            <div className="Cell Cell_end">&nbsp;</div>
        </div>
    )
}

export default React.memo(Sum);