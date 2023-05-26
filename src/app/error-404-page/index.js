import {cn as bem} from "@bem-react/classname";
import './style.css';
import PageLayout from "../../components/page-layout";

function Error404Page() {
  const cn = bem('Error404Page');

  return (
    <PageLayout>
      <div className={cn()}>Error 404 такой страницы нет</div>
    </PageLayout>
  )
}

export default Error404Page;
