import { memo, useCallback, useMemo } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import Menu from '../../components/menu';
import BasketTool from '../../components/basket-tool';
import SideLayout from '../../components/side-layout';
import { useDispatch } from 'react-redux';
import modalsActions from '../../store-redux/modals/actions';

function Navigation() {
  const store = useStore();
  const dispatch = useDispatch();
  const { t, lang } = useTranslate();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    openModalBasket: useCallback(() => {
      dispatch(modalsActions.open('basket'));
    }, [dispatch]),

    onNavigate: useCallback(
      item => {
        if (item.key === 1) store.actions.catalog.resetParams();
      },
      [store],
    ),
  };

  const options = useMemo(() => ({
    menu: [{ key: 1, title: t('menu.main'), link: '/' }]
  }), [t, lang]);

  return (
    <SideLayout side="between">
      <Menu items={options.menu} onNavigate={callbacks.onNavigate} />
      <BasketTool
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
        t={t}
        lang={lang}
      />
    </SideLayout>
  );
}

export default memo(Navigation);
