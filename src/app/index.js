/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Route,
  Routes,
  Navigate,
  BrowserRouter,
  Outlet,
} from 'react-router-dom';

import { GlobalStyle } from '../styles/global-styles';

import { HomePage } from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { SearchPage } from './pages/SearchPage';
import { NotFoundPage } from './pages/NotFoundPage';
import AdminPanel from './pages/AdminPanel/App.js';
import { EmployeePanel } from './pages/EmployeePanel';
import { useTranslation } from 'react-i18next';
import { Gambling } from './pages/Gambling/Loadable';
import NavBar from './components/NavBar';
import { Container, CssBaseline } from '@mui/material';
import { Statistics } from './pages/Statistics';
import { getUser, Roles } from 'user_info';
import { SettingsPage } from './pages/SettingsPage';
import { ProfilePage } from './pages/ProfilePage';
import AddPlanePage from './pages/AddPlanePage';

export function App() {
  const Authorized = ({ roles }) => {
    const token = localStorage.getItem('jwt_token');

    if (roles && token) {
      return roles.includes(getUser().role) ? (
        <Outlet />
      ) : (
        <Navigate to="/login" />
      );
    }

    return token ? <Outlet /> : <Navigate to="/login" />;
  };

  const Unauthorized = () => {
    const token = localStorage.getItem('jwt_token');
    return !token ? <Outlet /> : <Navigate to="/" />;
  };

  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - Oro uosto IS"
        defaultTitle="Oro uosto Informacine sistema"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A React Boilerplate application" />
      </Helmet>
      <CssBaseline />
      <GlobalStyle />
      <Routes>
        <Route element={<Unauthorized />}>
          <Route
            path={process.env.PUBLIC_URL + '/login'}
            element={<LoginPage />}
          />
          <Route
            path={process.env.PUBLIC_URL + '/signup'}
            element={<SignupPage />}
          />
        </Route>

        <Route element={<Authorized roles={[Roles.admin, Roles.worker]} />}>
          <Route
            path={process.env.PUBLIC_URL + '/dashboard/*'}
            element={<AdminPanel />}
          />
          <Route
            path={process.env.PUBLIC_URL + '/admin'}
            element={<Navigate to="/dashboard/app" replace />}
          />
        </Route>

        <Route path="/" element={<NavBar />}>
          <Route path="" element={<HomePage />} />
          <Route path={'search'} element={<SearchPage />} />
          {/* <Route element={<Authorized />}> */}
          <Route path={'gamble'} element={<Gambling />} />
          <Route path={'statistics'} element={<Statistics />} />
          <Route path={'employee'} element={<EmployeePanel />} />
          <Route path={'settings'} element={<SettingsPage />} />
          <Route path={'profile'} element={<ProfilePage />} />
          <Route path={'addplane'} element={<AddPlanePage />} />
          {/* </Route> */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
