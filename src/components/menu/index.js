import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import './style.css';
import useTranslate from "../../hooks/use-translate";

function Menu({ items = [], onNavigate = () => {} }) {
  const cn = bem('Menu');
  const { t } = useTranslate();
  return (
    <ul className={cn()}>
      {items.map(item => (
        <li key={item.key} className={cn('item')}>
          <Link to={item.link} onClick={() => onNavigate(item)}>
            {t(item.title)}
          </Link>
        </li>
      ))}
    </ul>
  );
}

Menu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number,
      link: PropTypes.string,
      title: PropTypes.string,
    }),
  ),
  onNavigate: PropTypes.func,
};

export default memo(Menu);
