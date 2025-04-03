import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { useTranslation } from '../../store/language/use-translation';
import './style.css';

function Button({ onClick = () => { }, titleKey, style, type = 'button' }) {
  const cn = bem('Button');
  const t = useTranslation();

  return (
    <div className={cn()}>
      <button type={type} className={cn({ style })} onClick={() => onClick()}>
        {t(titleKey)}
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
