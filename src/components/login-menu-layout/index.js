import React,{memo} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css'

const LoginMenuLayout = (props) => {
    const router = useNavigate();
    

    return (
        <div className='login-menu'>  
            {
            props.token? 
            <div className='exit-wrapper'>
                <Link to={props.linkProfile}>{props.profileName}</Link>
                <button className='exit-btn' onClick={() => props.onExit()}>Выход</button>
            </div>
            :
            <button className='login-btn' onClick={()=> router(props.loginPage)}>Вход</button>
            }
            
        </div>
    );
};

export default memo(LoginMenuLayout);