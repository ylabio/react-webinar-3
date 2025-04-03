import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { memo } from 'react';
import useSelector from '../../store/use-selector';
import { translations } from '../../utils/translations';
import './style.css';

function Button({ onClick = () => {}, title, style, type = 'button' }) {
  const cn = bem('Button');
  const lang = useSelector(state => state.language.currentLanguage);
  const t = translations[lang] || translations.ru;
  const buttonText =
    title === 'Добавить' ? t.buttonAdd : title === 'Удалить' ? t.buttonRemove : title;
  return (
    <div className={cn()}>
      <button type={type} className={cn({ style })} onClick={() => onClick()}>
        {buttonText}
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
