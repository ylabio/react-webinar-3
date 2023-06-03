import {memo, useCallback, useMemo, useState} from "react";
import {useParams} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import LoginForm from "../../components/loginForm";
import './style.css';
import LoginButton from "../../components/LoginButton";

function User() {
  const select = useSelector((state) => ({
    user: state.user.user,
  }));
  
  return (
    <PageLayout>
      <LoginButton />
      <Head title={select?.article?.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
      <div className="User-wrapper">
          <h2>Профиль</h2>
          <div className="User-item">Имя: 
            <div className="User-subitem">{select.user?.profile?.name}</div>
          </div>
          <div className="User-item">Телефон: 
            <div className="User-subitem">{select.user?.profile?.phone}</div>
          </div>
          <div className="User-item">email: 
            <div className="User-subitem">{select.user?.email}</div>
          </div>
       </div>
      </Spinner>
    </PageLayout>
  );
}

export default memo(User);
