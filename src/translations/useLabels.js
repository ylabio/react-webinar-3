import { useDictionary } from './useDictionary';
import { KEYS } from '../constants';

export function useLabels() {
  const { t } = useDictionary();

  return {
    labelsArticle: {
      country: t(KEYS.articleCountry),
      category: t(KEYS.articleCategory),
      releaseYear: t(KEYS.articleReleaseYear),
      price: t(KEYS.articlePrice),
      buttonAdd: t(KEYS.buttonAdd),
      loading: t(KEYS.loading),
    },
    labelsBasketTools: {
      one: t(KEYS.toolCartItem),
      few: t(KEYS.toolCartItems_few),
      many: t(KEYS.toolCartItems_many),
      empty: t(KEYS.toolCartEmpty),
    },
    labelBasket: {
      pcs: t(KEYS.toolCartPcs),
      remove: t(KEYS.buttonRemove),
      total: t(KEYS.cartTotal),
      title: t(KEYS.cartTitle),
    },
    labelsNavigation: {
      linkHome: t(KEYS.linkHome),
    },
    labelsHeaderStore: {
      title: t(KEYS.storeTitle),
    },
    labelsPagination: {
      titlePageSize: t(KEYS.paginationTitle),
    },
    labelsItems: {
      buttonAdd: t(KEYS.buttonAdd),
    }
  };
}
