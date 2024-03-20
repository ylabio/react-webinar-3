import Head from "../../components/head";
import useTranslate from "../../hooks/use-translate";
import LocaleSelect from "../../containers/locale-select";
import UserAuthCard from "../../components/user-auth-card";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import { useCallback } from "react";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";



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
    <PageLayout>
     
        <Head title={t("title")}>
          <LocaleSelect />
        </Head>
        <Navigation />
        <UserAuthCard onGetUser={callbacks.onGetUser} eror={select.eror} />
   
    </PageLayout>
    
    </>
  );
};

export default UserAuth;
