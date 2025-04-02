import { Route, Routes } from 'react-router';
import App from '../app';
import { Paths } from './paths';
import Article from "../components/article";

export const routes = (
  <Routes>
    <Route path={Paths.MAIN} element={<App />} />
    <Route path={`${Paths.ARTICLE}/:id`} element={<Article />} />
  </Routes>
);
