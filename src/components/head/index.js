import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Head({ title, onClick, lang }) {

  const cn = bem('Head');

  return (
    <div className={cn()}>
      <h1>{title}</h1>
      <ul className={cn('languages')}>
        <li className={cn('language', { active: lang == 'ru' })} onClick={() => onClick('ru')}>Ru</li>
        <li className={cn('language', { active: lang != 'ru' })} onClick={() => onClick('en')}>En</li>
      </ul>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  onClick: PropTypes.func,
  lang: PropTypes.string
};

Head.defaultProps = {
  onClick: () => { },
  lang: 'ru'
}

export default memo(Head);
