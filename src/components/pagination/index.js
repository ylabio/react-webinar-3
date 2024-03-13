import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Pagination({pages, paginate}){
    const cn = bem('Pagination');
    return (
        <ul className={cn()}>
            {pages.map((item,index) => 
                <li className={cn('item')} key={index}>
                    <a href="#!" className={cn('link')} onClick={() => paginate(item)}>
                        {item}
                    </a>
                </li>
            )}
        </ul>
    )
}

Pagination.propTypes = {
    pages: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired
};
  

export default memo(Pagination);