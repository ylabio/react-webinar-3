import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function FormProfile({item, data, autorization, t}) {
  const cn = bem('FormProfile');
  return (
    <div className={cn()}>
      <div className={cn('profile')}>{t('formProfile.profile')}</div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('formProfile.name')}:</div>
        <div className={cn('value')}>{data.name}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('formProfile.telephone')}:</div>
        <div className={cn('value')}>{data.phone}</div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('formProfile.email')}:</div>
        <div className={cn('value')}>{data.email}</div>
      </div>
      {autorization == false && (
          <Navigate to={item.link} replace={true} />
      )}
    </div>
  );
}

FormProfile.propTypes = {
  item: PropTypes.shape ({
    key: PropTypes.number,
    link: PropTypes.string,
  }),
  data: PropTypes.shape ({
    name: PropTypes.string,
    telephone: PropTypes.string,
    email: PropTypes.string,
  }),
  autorization: PropTypes.bool,
  t: PropTypes.func
};

FormProfile.defaultProps = {
  autorization: false,
  t: (text) => text
}

export default memo(FormProfile);
