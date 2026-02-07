import { type JSX, lazy, Suspense } from 'react';
import { Outlet, Route, Routes } from 'react-router';

import { PageLoader } from 'src/ui/atoms/PageLoader/PageLoader';

import { routesConfig } from './routesConfig';

type LazyComponent = React.LazyExoticComponent<() => JSX.Element>;

const LoginPage = lazy(
  () => import(/* webpackChunkName: "login-page" */ '../core/auth/pages/LoginPage'),
);

const RegisterPage: LazyComponent = lazy(
  () => import(/* webpackChunkName: "register-page" */ '../core/auth/pages/RegisterPage'),
);

const NotFoundPage: LazyComponent = lazy(
  () => import(/* webpackChunkName: "not-found-page" */ '../core/pages/NotFoundPage'),
);

const RootLayout = () => (
  <Outlet />
);

export const AppRoutes = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route element={<RootLayout />}>
        <Route path={routesConfig.login} element={<LoginPage />} />
        <Route path={routesConfig.signup} element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Suspense>
);
