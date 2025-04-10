import { memo, useState } from "react"
import { cn as bem, cn } from '@bem-react/classname';
import "./style.css"
import Button from "../button";
import InputForm from "../form-input";
import {  useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

function LoginForm({logIn = ()=>{}, header , loginLabel, passwordLabel, buttonMessage }){
    const cn = bem("LoginForm")
    const [errors , setErrors] = useState([]);
    const navigate = useNavigate();
    async function handleSubmit(event){
        try{
            event.preventDefault();
            setErrors([])
            const fd = new FormData(event.target);
            const data = Object.fromEntries(fd.entries());
            await logIn(data);
            navigate('/')
        }catch(error){
            const errorMessage = error.message;
            const jsonString = errorMessage.replace("Error: ", "");
            const errorData = JSON.parse(jsonString);
            setErrors(errorData.issues);
        };
            
    }

  
    return(
        <div className={cn()}>
            <h1>{header}</h1>
        <form onSubmit={handleSubmit}>
            <InputForm placeholder={'Введите логин'} className={cn('input')} name={'login'} id={'login'} label={loginLabel} required />
            <InputForm type='password'  placeholder={'Введите пароль'}  className={cn('input')} name={'password'} id={'password'} label={passwordLabel} required />
            <div className={cn('errors')}>
            {errors.length > 0 && <ul>{errors.map((error , index)=> (<li key={index}><p>{error}</p></li>))}</ul>}
            </div>
            <div className={cn('actions')}>
            <Button style={'primary'} type="submit" title={buttonMessage}/>
            </div>
        </form>
        </div>
    )   
}

InputForm.propTypes = {
  header: PropTypes.string,
  loginLabel: PropTypes.string,
  passwordLabel: PropTypes.string,
  buttonMessage: PropTypes.string,
  logIn: PropTypes.func,
};
export default memo(LoginForm)