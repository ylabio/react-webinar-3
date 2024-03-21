import {cn as bem} from "@bem-react/classname";
import './style.css';
import { memo } from "react";
import PropTypes from "prop-types";

const ProfileCard = ({ userData, t }) => {

    const cn = bem('ProfileCard')

    return(
        <div className={cn()}>
            <div className={cn('item')}>
                <p>{t('auth.name')}</p>
                <p>{userData.profile.name}</p>
            </div>
            <div className={cn('item')}>
                <p>{t('auth.phone')}</p>
                <p>{userData.profile.phone}</p>
            </div>
            <div className={cn('item')}>
                <p>{t('auth.email')}</p>
                <p>{userData.email}</p>
            </div>
        </div>
    )
}

ProfileCard.propTypes = {
    userData: PropTypes.shape({
      profile: PropTypes.oneOfType({name: PropTypes.string, phone: PropTypes.string}),
      email: PropTypes.string,
    }).isRequired,
    t: PropTypes.func
  };
  
  ProfileCard.defaultProps = {
    userData: {
        profile: {
            name: '',
            phone: ''
        },
        email: ''
    },
    t: () => {}
  }

export default memo(ProfileCard)