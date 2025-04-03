import React, { useState } from 'react';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { useTranslation } from '../../store/language/use-translation';

const CountSwitcher = ({ countDisplayItems, handleSelectChange }) => {
    const cn = bem('Count-switcher');
    const t = useTranslation();

    return (
        <div className={cn()}>
            <label htmlFor={cn('select')} className={cn('select-title')}>{t('countItemsDisplay')}:</label>
            <select
                id={cn('select')}
                className={cn('select')}
                onChange={e => handleSelectChange(e)}
                value={countDisplayItems}
            >
                <option className={cn('select-item')} value={5}>5</option>
                <option className={cn('select-item')} value={10}>10</option>
                <option className={cn('select-item')} value={20}>15</option>
            </select>
        </div>
    )
}

CountSwitcher.propTypes = {
    countDisplayItems: PropTypes.number,
    handleSelectChange: PropTypes.func,
}

export default React.memo(CountSwitcher);