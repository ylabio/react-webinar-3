import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

import useTranslate from '../../hooks/use-translate';

import Spinner from '../spinner';
import ServicePageLayout from '../service-page-layout';
import PropTypes from 'prop-types';

function LoginForm(props) {
  const cn = bem('LoginForm');
  const { t } = useTranslate();

  return (
    <Spinner active={props.waiting}>
      <ServicePageLayout
        head={t('login.title')}
        padding={'medium'}
        gap={'medium'}
      >
        <form onSubmit={props.onSubmit} className={cn()}>
          {props.children}
          {props.error ? (
            <div className={cn('error')}>{props.error}</div>
          ) : null}
          <button type={'submit'} disabled={props.isAuth}>
            {t('button.loginForm')}
          </button>
        </form>
      </ServicePageLayout>
    </Spinner>
  );
}

LoginForm.propTypes = {
  children: PropTypes.node,
  error: PropTypes.oneOf([PropTypes.string, null]),
  waiting: PropTypes.bool,
  isAuth: PropTypes.bool,
  onSubmit: PropTypes.func,
};

LoginForm.defaultProps = {
  error: null,
  waiting: false,
  isAuth: false,
  onSubmit: () => {},
};

export default memo(LoginForm);
