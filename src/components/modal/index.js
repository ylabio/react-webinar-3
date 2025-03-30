import React from 'react';
import './style.css';
import Cross from '../../assets/icons/cross.svg';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';

function Modal ({ children, hideModal=() => {} }) {
    const cn = bem('Modal');

    return(
        <div className={cn('container')} >
            <div className={cn()}>
                <div className='cross' onClick={() => { hideModal() }}>
                    <Cross />
                </div>
                {children}
            </div>
        </div>
    );
}

Modal.propTypes = {
    hideModal: PropTypes.func
  };

export default React.memo(Modal);