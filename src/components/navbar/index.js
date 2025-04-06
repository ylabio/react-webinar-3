import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { Link } from 'react-router';
import { langKeyWords } from '../../utils/lang';

function Navbar ({ path = '', lang = 'ru', renderBasket = () => {} }) {
  const cn = bem('Navbar');
  const multi = langKeyWords[lang] || langKeyWords.ru;

  return (
    <div className={cn()}>
      <Link to={path} className={cn('home')}>{multi.homepage}</Link>
      {renderBasket()}
    </div>
  );
}

Navbar.propTypes = {
  path: PropTypes.string,
  lang: PropTypes.string,
  renderBasket: PropTypes.func,
};

export default memo(Navbar);
