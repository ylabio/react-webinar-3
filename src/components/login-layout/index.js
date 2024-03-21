import { memo, useEffect, useState } from "react";
import Head from "../head";
import LocaleSelect from "../../containers/locale-select";
import ButtonLogin from "../../app/login-menu";
import Navigation from "../../containers/navigation";
import { useNavigate } from "react-router-dom";
import 'style.css'


const LoginLayout = (props) => {
    const router = useNavigate();
    
    let exception = props.exception;
    
    useEffect(()=>{
       props.clearException();
       
    },[])

    function onButton(e){
        e.preventDefault();
        props.onEnter(props.logValue,props.passValue);
        
        // if (!props.exception && props.logValue && props.passValue && props.isAuth){
        //     router(props.navigateLink);
        // }
    }
    
    return (
        <>
            <ButtonLogin></ButtonLogin>
            <Head title={props.title}>
                <LocaleSelect/>
            </Head>
            <Navigation></Navigation>
            <form className="form">
                <h2>Вход</h2>
                <label htmlFor="login">Логин</label>
                <input className="form-login" id="login" type={"text"} value={props.logValue}
                onChange={(e)=> props.setLogValue(e.target.value)}
                />
                <label htmlFor="password">Пароль</label>
                <input className="form-password" id="password" type={"password"} value={props.passValue}
                onChange={(e)=> props.setPassValue(e.target.value)}
                />
                <p className="exception">{props.exception}</p>
                <button className="enter-btn" onClick={(e) => onButton(e)} >Войти</button>
            </form>
        </>
    );
};

export default memo(LoginLayout);