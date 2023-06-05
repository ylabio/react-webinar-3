import { memo } from 'react';
import PropTypes from "prop-types";
import './style.css';
import Spinner from '../spinner';
import useTranslate from '../../hooks/use-translate';

function ProfileInfo({ user, loading, t }) {
    if (loading) return <Spinner active={true}>{t('loading')}</Spinner>
    return (
        <div className='Profile'>
            <h2 className='Profile-title'>{t('profile.title')}</h2>
            <h4 className='Profile-subtitle'>{t('profile.name')}: <span>{user?.profile.name}</span></h4>
            <h4 className='Profile-subtitle'>{t('profile.phone')}: <span>{user?.profile.phone}</span></h4>
            <h4 className='Profile-subtitle'>{t('profile.email')}: <span>{user?.email}</span></h4>
        </div>
    );
}

ProfileInfo.propTypes = {
    user: PropTypes.object,
    loading: PropTypes.bool,
  };
  
  
export default memo(ProfileInfo);