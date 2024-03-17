import React,{memo} from 'react';
import Head from "../head";
import LocaleSelect from "../../containers/locale-select";
import ButtonLogin from "../../app/login-menu";
import Navigation from "../../containers/navigation";
import 'style.css'

const ProfileLayout = (props) => {

    return (
        <>
            <ButtonLogin></ButtonLogin>
            <Head title={props.title}>
                <LocaleSelect/>
            </Head>
            <Navigation></Navigation>
            <div className='profile__inner'>
                <h2>Профиль</h2>
                <p className='profile-name'>Имя: <span>{props.profileInfo.result?.profile.name}</span></p>
                <p className='profile-phone'>Телефон: <span>{props.profileInfo.result?.profile.phone}</span></p>
                <p className='profile-email'>email: <span>{props.profileInfo.result?.email}</span></p>
            </div>
        </>
    );
};

export default memo(ProfileLayout);