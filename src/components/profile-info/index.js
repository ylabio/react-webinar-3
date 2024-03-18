import { memo, useCallback } from "react";
import './style.css';
import {cn as bem} from '@bem-react/classname';
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import { getAuthToken } from "../../utils";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";

const ProfileInfo = () => {

    const store = useStore();
    const {t} = useTranslate();
    const cn = bem('ProfileInfo')

    const select = useSelector(state => ({
        userInfo: state.auth.userData,
        waiting: state.auth.waiting,
      }));
    
      const callbacks = {
        // Добавление в корзину
        onLoadUser: useCallback(token => store.actions.auth.loadUser(token), [store]),
      }

    //useInit(() => callbacks.onLoadUser(getAuthToken()), [])
    
    return(
        <div className={cn()}>
            <p className={cn('title')}>Профиль</p>
            <div className={cn('items')}>
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
            </div>
        </div>
    )
}

export default memo(ProfileInfo)