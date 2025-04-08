import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { useLanguage } from '../../language-context';
import translations from '../../locales';

function Button({ onClick, title, style, type = 'button' }) {
  const { language } = useLanguage();
  const t = translations[language];
  const cn = bem('Button');

  const translatedTitle = {
    'Добавить': t.addToCart,
    'Удалить': t.remove,
  }[title] || title;

  return (
    <div className={cn()}>
      <button type={type} className={cn({ style })} onClick={() => onClick()}>
        {translatedTitle}
      </button>
    </div>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
  style: PropTypes.oneOf(['text', 'primary', 'delete', 'outline']),
  type: PropTypes.oneOf(['button', 'submit']),
};

export default memo(Button);
