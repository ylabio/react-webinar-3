import MainPage from "../pages/main-page";
import Error404Page from "../pages/error-404-page";
import ProductPage from "../pages/product-page";
import {generatePath} from 'react-router-dom';


export const appRouterConfig = [
  {id: 1, path: '/', name: 'main', component: MainPage},
  {id: 2, path: '/product/:id', name: 'product', component: ProductPage},
  {id: '*', path: '*', name: 'error404', component: Error404Page},
];

export const getRoutePath = (name, id = null) => {
  const route = appRouterConfig.find(item => item.name === name);
  if (!route) {
    return null;
  }

  if (id) {
    return generatePath(route.path, {id})
  }
  return route.path;

}

