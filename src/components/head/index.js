import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Head({ title, onClick }) {

  const cn = bem('Head');

  return (
    <div className={cn()}>
      <h1>{title}</h1>
      <ul className={cn('languages')}>
        <li className={cn('language')} onClick={() => onClick('ru')}>Ru</li>
        <li className={cn('language')} onClick={() => onClick('en')}>En</li>
      </ul>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  onClick: PropTypes.func
};

Head.defaultProps = {
  onClick: () => { }
}

export default memo(Head);
