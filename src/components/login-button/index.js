import { memo } from "react";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const LoginButton = ({ onLoginClick }) => (
    <div className="userProfile-button">
     <button type="button" onClick={onLoginClick}>Войти</button>   
    </div>
    
);



export default memo(LoginButton);


