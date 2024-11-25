import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import ErrorPage from './components/errors/ErrorPage';
import NotFoundPage from './screens/NotFoundPage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // Global error boundary for the app
    errorElement: <ErrorPage />, 
    children: [
      { index: true, element: <HomeScreen /> },
      { path: 'product/:id', element: <ProductScreen /> },
      // Catch-all for 404s
      { path: '*', element: <NotFoundPage /> }, 
    ],
  },
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}

export default AppRoutes;
