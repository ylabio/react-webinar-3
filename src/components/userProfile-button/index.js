

import { memo } from "react";
import React from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './style.css';

const UserProfile = ({ user, onLogoutClick }) => (
   
    <div className="userProfile-button">
        <Link to={'/profile'}>
            {user}
        </Link>
        <button type="button" onClick={onLogoutClick}>Выход</button>
    </div>
);



export default memo(UserProfile);

