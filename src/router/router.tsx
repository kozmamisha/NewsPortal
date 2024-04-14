import { createBrowserRouter } from 'react-router-dom';
import Layout from '../pages/Layout';
import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home';
import News, { newsAction, newsLoader } from '../pages/News';
import Categories, { categoriesAction, categoryLoader } from '../pages/Categories';
import Auth from '../pages/Auth';
import { ProtectedRoute } from '../components/ProtectedRoute';
import FullNewInfo from '../pages/FullNewInfo';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        loader: newsLoader,
        action: newsAction,
        element: <Home />,
      },
      {
        path: 'news',
        loader: newsLoader,
        action: newsAction,
        element: (
          <ProtectedRoute>
            <News limit={4} />
          </ProtectedRoute>
        ),
      },
      {
        path: 'news/:id',
        element: (
          <ProtectedRoute>
            <FullNewInfo />
          </ProtectedRoute>
        ),
      },
      {
        path: 'categories',
        loader: categoryLoader,
        action: categoriesAction,
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: 'auth',
        element: <Auth />,
      },
    ],
  },
]);
