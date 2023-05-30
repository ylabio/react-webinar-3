import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import './style.css'
import { cn as bem } from '@bem-react/classname';

const Pagination = ({ onClick, id, limit }) => {

    const cn = bem('Pagination');

    const chagePage = (el) => onClick(+el.dataset.id * 10 - 10);

    let count = id + 10;

    const pages = useMemo(() => {
        let array = [1];

        if (count <= 20) {
            array.push(2, 3);
            if (count < 20) {
                array.push('...');
            } else {
                array.push(4, '...');
            }
        } else if (limit - count / 10 < 3) {
            array.push('...', limit - 2, limit - 1);
        } else {
            array.push('...', count / 10 - 1, count / 10, count / 10 + 1, '...');
        }

        array.push(limit);
        return array;
    }, [limit, id])

    return (
        <div className={cn('row')}>
            {
                pages.map((item, i) => {
                    if (item !== '...') {
                        return (<div key={i} className={cn('btn')} data-id={item} onClick={(event) => chagePage(event.target)} style={{ background: item * 10 === count && '#0087E9', color: item * 10 === count && '#fff' }}>
                            {item}
                        </div>)
                    } else {
                        return <div key={i} className={cn('dots')}>{item}</div>
                    }
                })
            }
        </div>
    );
};

Pagination.propTypes = {
    id: PropTypes.number,
    limit: PropTypes.number,
    onClick: PropTypes.func,
};

Pagination.defaultProps = {
    onClick: () => { }
}

export default memo(Pagination);