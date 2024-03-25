import useSelector from "../hooks/use-selector";
import { Link } from "react-router-dom";
import React from 'react';
import useTranslate from "../hooks/use-translate";

function IsLogin({ Component, componentProps, baseIndent = 0, level = 0, onCancel }) {
    const { t } = useTranslate()
    const loginLink = "/login"; 
    const paddingLeft = baseIndent * level + 40;
    const profileState = useSelector(state => ({
        name: state.session.user.profile?.name,
    }));
    if (!profileState.name) {
        return (
            <>
                <p className="link" style={{ paddingLeft: `${paddingLeft}px` }}>
                    <Link to={loginLink}>{t('comments.loginToComment')}</Link>,
                    {onCancel ? t('comments.toComment') : t('comments.toPost')}
                    {onCancel && <button className="Comment-decly-button" type="button" onClick={onCancel}>{t('comments.cancel')}</button>}
                </p>
               
            </>
        );
    }

    return <Component style={{ paddingLeft: `${paddingLeft}px` }} {...componentProps} />;
} 

export default IsLogin;