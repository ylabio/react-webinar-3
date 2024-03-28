import useSelector from "../hooks/use-selector";
import { Link } from "react-router-dom";
import React from 'react';
import useTranslate from "../hooks/use-translate";
import { useLocation } from "react-router-dom";
function IsLogin({ Component, componentProps, baseIndent = 0, level = 0, onCancel, maxLevel = 5 }) {  
    const { t } = useTranslate()
    const loginLink = "/login"; 
    const location = useLocation();
    const effectiveLevel = Math.min(level, maxLevel); 
    const paddingLeft = baseIndent * effectiveLevel + 40;
    
    const name = useSelector(state => state.session.user.profile?.name);
    if (!name) {
        return (
            <p className="link" style={{ paddingLeft }}>
                <Link
                    to={loginLink} state={{ back: location.pathname }}
                >
                    {t('comments.loginToComment')}
                </Link>, {t('comments.toComment')}
                {onCancel && <button className="Comment-decly-button" type="button" onClick={onCancel}>{t('comments.cancel')}</button>}
            </p>
        );
    }

    return <Component style={{ paddingLeft: `${paddingLeft}px` }} {...componentProps} />;
} 

export default IsLogin;