import { Route, Routes } from 'react-router';
import { Paths } from './paths';
import Main from '../app/main';
import Article from '../app/article';

export const routes = (
  <Routes>
    <Route path={Paths.MAIN} element={<Main />} />
    <Route path={`${Paths.ARTICLE}/:id`} element={<Article />} />
  </Routes>
);
