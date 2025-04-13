import React from 'react';
import './style.css';
import PropTypes from 'prop-types';

function FormLayout({ children, title }) {
    return (
        <div className='form-layout'>
            <h2 className='form-title'>{title}</h2>
            <form className='form'>
                {children}
            </form>
        </div>
    )
}

FormLayout.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
}

export default React.memo(FormLayout);