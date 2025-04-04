import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';
import { Link } from 'react-router';
import { useTranslation } from '../../translation/TranslationContext';

function Nav({ children }) {
  const cn = bem('Nav');
  const { t } = useTranslation();

  return (
    <div className={cn()}>
      <nav>
        <Link to="/">{t('navItemMain')}</Link>
      </nav>
      {children}
    </div>
  );
}

Nav.propTypes = {
  children: PropTypes.node,
};

export default memo(Nav);
