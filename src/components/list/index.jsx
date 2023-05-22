import React from "react";
import PropTypes from 'prop-types';
import Item from "../item/index.jsx";
import './style.css';

function List({ list, onClick, buttonText, count }) {
    return (
        <div className='List'>{
            list.map(item =>
                <div key={item.code} className='List-item'>
                    <Item item={item} onClick={onClick} buttonText={buttonText} count={count} />
                </div>
            )}
        </div>
    )
}

List.propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
        code: PropTypes.number
    })).isRequired,
    onClick: PropTypes.func,
    buttonText: PropTypes.string,
    count: PropTypes.number
};

List.defaultProps = {
    onClick: () => { },
}

export default React.memo(List);
