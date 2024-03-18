import Head from "../../components/head";
import ModalUser from "../../components/modal-user";
import useTranslate from "../../hooks/use-translate";
import LocaleSelect from "../../containers/locale-select";
import UserAuthCard from "../../components/user-auth-card";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import { useCallback } from "react";
import HeaderAuth from "../../components/header-auth";
import { Navigate } from "react-router-dom";
import Navigation from "../../containers/navigation";

const UserAuth = () => {
  const { t } = useTranslate();
  const store = useStore();
  const select = useSelector((state) => ({
    eror: state.user.eror,
    auth: state.user.auth,
  }));

  const callbacks = {
    onGetUser: useCallback(
      (login, password) => store.actions.user.getUser(login, password),
      [store]
    ),
    onDeleteUser: useCallback(() => store.actions.user.deleteUser(), [store]),
  };

  return (
    <>
      <ModalUser>
        {select.auth && <Navigate to={"/profile"} />}
        <HeaderAuth />
        <Head title={t("title")}>
          <LocaleSelect />
        </Head>
        <Navigation />
        <UserAuthCard onGetUser={callbacks.onGetUser} eror={select.eror} />
      </ModalUser>
    </>
  );
};

export default UserAuth;
