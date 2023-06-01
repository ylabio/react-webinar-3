import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import React from 'react';
import './style.css';

/**
 * Форма для страницы профиля. Если какието поля есть, выводим
 */

function ProfileForm({ fields, t }) {
  const cn = bem('ProfileForm');

  return (
    <div className={cn()}>
      <div className={cn('title')}>{t('profile.title')}</div>
      <div className={cn('field')}>{t('profile.name')}: <b>{fields?.profile?.name ? fields.profile.name : fields?.username}</b></div>
      <div className={cn('field')}>{t('profile.phone')}: <b>{fields?.profile?.phone}</b></div>
      <div className={cn('field')}>{t('profile.email')}: <b>{fields?.email}</b></div>
    </div>
  );
};

ProfileForm.propTypes = {
  fields: PropTypes.object,
  t: PropTypes.func
}

ProfileForm.defaultProps = {
  fields: {},
  t: (text) => text
}

export default React.memo(ProfileForm);