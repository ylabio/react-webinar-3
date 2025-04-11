import './style.css';
import React from 'react';
import PropTypes from 'prop-types';
import Input from '../input';

function FormInput({ title, value, onChange, placeholder, type = 'text' }) {
    return (
        <div className='form-input-container'>
            <label className="form-input-title">
                {title}
            </label>
            <Input
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                delay={300}
                theme={'small'}
                type={type}
            />
        </div>
    )
}

FormInput.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
}

export default React.memo(FormInput);