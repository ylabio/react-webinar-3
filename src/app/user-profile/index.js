import Head from "../../components/head";
import ModalUser from "../../components/modal-user";
import useTranslate from "../../hooks/use-translate";
import LocaleSelect from "../../containers/locale-select";
import UserAuthCard from "../../components/user-auth-card";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import { useCallback, useMemo } from "react";
import HeaderAuth from "../../components/header-auth";
import UserInf from "../../components/user-profil";
import { Navigate } from "react-router-dom";
import Navigation from "../../containers/navigation";


const UserProfile = () => {
  const { t } = useTranslate();
  const select = useSelector((state) => ({
    auth: state.user.auth,
    user: state.user.user,
  }));


  return (
    <>
      <ModalUser>
 
        {!select.auth && <Navigate to={"/login"} />}
        <HeaderAuth />
        <Head title={t("title")}>
          <LocaleSelect />
        </Head>
        <Navigation />
        <UserInf result={select.user} />
      </ModalUser>
    </>
  );
};

export default UserProfile;
