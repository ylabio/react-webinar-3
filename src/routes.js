import {Navigate} from 'react-router-dom'
import Article from './app/article'
import EnterPage from './app/enter-page'
import Main from './app/main'
import Profile from './app/profile'

export const publicRoutes = [
    {
        key: 1,
        path: '',
        Component: <Main />
    },
    {
        key: 2,
        path: '/articles/:id',
        Component: <Article />
    },
    {
        key: 3,
        path: '/login',
        Component: <EnterPage />
    },
    {
        key: 4,
        path: '*',
        Component: <Navigate to={''} replace />
    }
]

export const privateRoutes = [
    {
        key: 1,
        path: '',
        Component: <Main />
    },
    {
        key: 2,
        path: '/articles/:id',
        Component: <Article />
    },
    {
        key: 3,
        path: '/login',
        Component: <EnterPage />
    },
    {
        key: 4,
        path: '/profile',
        Component: <Profile />
    }
]