import PageLayout from "../page-layout";
import {cn as bem} from "@bem-react/classname";
import './style.css';

export function AuthStub() {
  const cn = bem('AuthStub');

  return <PageLayout>
    <div className={cn()}>Идет проверка авторизации...</div>
  </PageLayout>
}
