import {memo} from "react"
import './style.css';
import useTranslate from "../../hooks/use-translate";
import {cn as bem} from "@bem-react/classname";

function ProfileCard(props) {

    const cn = bem('Profile-card');
    const {t} = useTranslate();

    return (
      <div className={cn('wrapper')}>
         <h2 className={cn('title')}>{t('user.profile')}</h2>
         <div className={cn('text')}>{t('user.name')}: <span>{props.user?.profile?.name}</span></div>
         <div className={cn('text')}>{t('user.phone')}: <span>{props.user?.profile?.phone}</span></div>
         <div className={cn('text')}>email: <span>{props.user?.email}</span></div>
      </div>
   );
}

export default memo(ProfileCard)