import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Head({ title, changeLocale }) {

  const cn = bem('Head');

  return (
    <div className={cn()}>
      <h1>{title}</h1>
      <div className={cn('local')}>
        <select onChange={e => changeLocale(e.target.value)}>
          <option value={'ru'}>ru</option>
          <option value={'en'}>en</option>
        </select>
      </div>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
