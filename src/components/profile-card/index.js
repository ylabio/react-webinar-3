import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import useTranslate from '../../hooks/use-translate'

function ProfileCard({ props }) {
  const cn = bem('ProfileCard');
  const {t} = useTranslate();
  return (
    <div className={cn()}>
      <div className={cn('content')}>
        <h2>{t('profile')}</h2>
        <div className={cn('info')}>
          <p>{t('profile.name')}: <b>{props.profile?.name}</b></p>
          <p>{t('profile.phone')}: <b>{props.profile?.phone}</b></p>
          <p>email: <b>{props.email}</b></p>
        </div>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  props: PropTypes.shape({
    profile: PropTypes.shape({
      name: PropTypes.string,
      phone: PropTypes.string
    }),
    email: PropTypes.string,
  })
};

ProfileCard.defaultProps = {
  props: {
    profile: {
      name: '',
      phone: '',
    },
    email: ''
  }
}

export default memo(ProfileCard);
