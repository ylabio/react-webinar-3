import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { useTranslation } from '../../hooks/useTranslation';
import './style.css';

function Button({ onClick, title, style = 'default' }) {
  const cn = bem('Button');
  const { t } = useTranslation();

  return (
    <button className={cn({ style })} onClick={onClick}>
      {t(title)}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string.isRequired,
  style: PropTypes.oneOf(['default', 'primary', 'delete'])
};

export default memo(Button);
