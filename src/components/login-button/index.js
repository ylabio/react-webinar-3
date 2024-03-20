import { memo } from "react";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const LoginButton = ({ onLoginClick,title }) => (
    <div className="userProfile-button">
        <button type="button" onClick={onLoginClick}>{title}</button>   
    </div>
    
);



export default memo(LoginButton);


