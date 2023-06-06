import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

const justifyClasses = {
    start: 'justifyStart',
    end: 'justifyEnd',
    center: 'justifyCenter',
    between: 'justifyBetween',
};

const alignClasses = {
    start: 'alignStar',
    end: 'alignEnd',
    center: 'alignCenter',
};

const directionClasses = {
    row: 'directionRow',
    column: 'directionColumn',
};

const gapClasses = {
    4: 'gap4',
    8: 'gap8',
    16: 'gap16',
    20: 'gap20',
};

const borderClasses = {
    bottom: 'bottom',
    all: 'all',
};

export const Flex = (props) => {
    const {
        children,
        justify = 'start',
        align = 'center',
        direction = 'row',
        border,
        gap,
    } = props;

    const classes = [
        'Flex',
        justifyClasses[justify],
        alignClasses[align],
        directionClasses[direction],
        borderClasses[border],
        gap && gapClasses[gap],
].filter( _ => _).join(' ');

    return (
        <div className={classes}>
            {children}
        </div>
    );
};

Flex.propTypes = {
    className: PropTypes.string,
    children: PropTypes.element,
    justify: PropTypes.string,
    bottom: PropTypes.string,
    align: PropTypes.string,
    direction: PropTypes.string,
    gap: PropTypes.number,
  };


  export default memo(Flex);