import React from 'react';
import './style.css';

function UserInfoLayout({ children }) {
    return (
        <div className='user-info-layout'>
            <div className='user-info-container'>
                {children}
            </div>
        </div>
    )
}

export default React.memo(UserInfoLayout);