import {memo, useState} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function PropfileLayout(props) {

  const cn = bem('PropfileLayout');

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{props.t('profile.title')}</h2>
      <p className={cn('info')}>{props.t('profile.name')}: <b>{props.user?.profile?.name}</b></p>
      <p className={cn('info')}>{props.t('profile.phone')}: <b>{props.user?.profile?.phone}</b></p>
      <p className={cn('info')}>{props.t('profile.email')}: <b>{props.user?.email}</b></p>
    </div>
  );
}


PropfileLayout.propTypes = {
  user: PropTypes.object
}

PropfileLayout.defaultProps = {
  user: {}
}

export default memo(PropfileLayout);
