import React,{memo} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css'

const LoginMenuLayout = (props) => {
    const router = useNavigate();
    

    return (
        <>  
            {
            props.token? 
            <div className='exit-wrapper'>
                <Link to={props.linkProfile}>{props.profileName}</Link>
                <button className='exit-btn' onClick={() => props.onExit()}>Выход</button>
            </div>
            :
            <button className='login-btn' onClick={()=> router(props.loginPage)}>Вход</button>
            }
            {/* <Link to={'/login'} className='link-btn'><button className='login-btn'>Вход</button></Link> */}
        </>
    );
};

export default memo(LoginMenuLayout);