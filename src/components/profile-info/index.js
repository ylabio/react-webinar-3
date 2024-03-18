import { memo } from "react";
import './style.css';
import {cn as bem} from '@bem-react/classname';
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";

import useAuth from "../../hooks/use-auth";

const ProfileInfo = () => {

    const {t} = useTranslate();
    const cn = bem('ProfileInfo')

    const select = useSelector(state => ({
        userInfo: state.auth.userData,
        waiting: state.auth.waiting,
      }));

    useAuth([]);
    
    return(
        <div className={cn()}>
            <p className={cn('title')}>Профиль</p>
            {Object.keys(select.userInfo).length > 0 && <div className={cn('items')}>
                                                            <div className={cn('item')}>
                                                                <p>Имя:</p>
                                                                <p>{select.userInfo.profile.name}</p>
                                                            </div>
                                                            <div className={cn('item')}>
                                                                <p>Телефон: </p>
                                                                <p>{select.userInfo.profile.phone}</p>
                                                            </div>
                                                            <div className={cn('item')}>
                                                                <p>email:</p>
                                                                <p>{select.userInfo.email}</p>
                                                            </div>
                                                        </div>}
        </div>
    )
}

export default memo(ProfileInfo)