import { memo } from 'react';
import { Outlet } from 'react-router';
import Head from '../head';
import BasketTool from '../basket-tool';
import { useAppContext } from '../../app-context';

// @todo delete
const AppLayout = () => {
  const { headerTitle, basket } = useAppContext();

  return (
    <>
      <Head title={headerTitle}/>
      <BasketTool 
        onOpen={basket.openModal} 
        amount={basket.amount} 
        sum={basket.sum} 
      />
      <main className="app-content">
        <Outlet />
      </main>
    </>
  );
};

export default memo(AppLayout);