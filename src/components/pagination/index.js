import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Pagination({count}) {

    const cn = bem('Pagination');

    return (
        <div className={cn()}>
            <div className={cn('container')}>
                <button>1</button>
                <span>...</span>
                <button className={cn('button')}>{ }</button>
                <button className={cn('button')}>{ }</button>
                <button className={cn('button')}>{ }</button>
                <span>...</span>
                <button>{count}</button>
            </div>
            
        </div>
    );
}

Pagination.propTypes = {
    
}

export default memo(Pagination);