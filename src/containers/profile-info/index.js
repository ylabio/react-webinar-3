import { memo } from "react";
import './style.css';
import {cn as bem} from '@bem-react/classname';
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import useAuth from "../../hooks/use-auth";
import ProfileCard from "../../components/profile-card";

const ProfileInfo = () => {

    const {t} = useTranslate();
    const cn = bem('ProfileInfo')

    const select = useSelector(state => ({
        userInfo: state.auth.userData
      }));

    useAuth([]);
    
    return(
        <div className={cn()}>
            <p className={cn('title')}>{t('auth.profile')}</p>
            {Object.keys(select.userInfo).length > 0 && <ProfileCard t={t} userData={select.userInfo}/>}
        </div>
    )
}

export default memo(ProfileInfo)