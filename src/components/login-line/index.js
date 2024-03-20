import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function LoginLine({onClick, buttonName}) {

    const cn = bem('LoginLine');

    return (
        <div className={cn()}>
            <button
                className={cn('button')}
                type="button"
                onClick={onClick}
            >
                {buttonName}
            </button>
        </div> 
    )
}

PropTypes.LoginLine = {
    onClick: PropTypes.func
};

export default memo(LoginLine);
