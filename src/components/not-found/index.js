import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import PageLayout from '../page-layout';
import Head from '../head';
import Button from '../button';
import { useNavigate } from 'react-router';

function NotFound({}) {
  const cn = bem('NotFound');
  const navigate = useNavigate();
  const onMain = () => navigate('/');

  return (
    <PageLayout>
      <Head title={'Страница не найдена'} />
      <div className={cn()}>Вернитесь на главную и выберите товар</div>
      <div className={cn("action")}>
        <Button title="На главную" style="primary" onClick={onMain} />
      </div>
    </PageLayout>
  );
}

export default memo(NotFound);
