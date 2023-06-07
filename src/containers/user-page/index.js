import { memo, useCallback } from 'react';
import { useParams } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import HeadPage from "../../components/head-page";
import User from "../../components/user";

function UserPage() {
  const store = useStore()

  const params = useParams()

  const select = useSelector((state) => ({
    authorization: state.user.authorization,
    email: state.user.profile?.email,
    username: state.user.profile?.name,
    phone: state.user.profile?.phone,
  }))
  const email = select.email || ''
  const name = select.username || ''
  const phone = select.phone || ''
  
  const userName = localStorage.getItem('userName')

  const callbacks = {
    // Выход
    deleteUser: useCallback(() => store.actions.user.deleteUser(), [store]),
  }

  return (
    <PageLayout
      head={
        <HeadPage
          authorization={select.authorization}
          exit={callbacks.deleteUser}
          userName={userName}
        />
      }
    >
      <Head title="Магазин">
        <LocaleSelect />
      </Head>
      <Navigation />
      <User name={name} email={email} phone={phone}/>
    </PageLayout>
  )
}

export default memo(UserPage);
