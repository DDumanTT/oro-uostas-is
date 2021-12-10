/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';

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

export function App() {
  const LoggedInRoute = ({ component: Component, ...rest }) => {
    const token = localStorage.getItem('jwt_token');
    return (
      <Route
        {...rest}
        element={props =>
          token ? <Component {...props} /> : <Navigate to="/signup" />
        }
      />
    );
  };

  const LoggedOutRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      element={props =>
        localStorage.getItem('jwt_token') ? (
          <Navigate to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );

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
        <LoggedOutRoute
          path={process.env.PUBLIC_URL + '/login'}
          element={<LoginPage />}
        />

        <LoggedOutRoute
          path={process.env.PUBLIC_URL + '/signup'}
          element={<SignupPage />}
        />
        <Route
          path={process.env.PUBLIC_URL + '/dashboard/*'}
          element={<AdminPanel />}
        />
        <Route
          path={process.env.PUBLIC_URL + '/admin'}
          element={<Navigate to="/dashboard/app" replace />}
        />
        <Route
          path={process.env.PUBLIC_URL + '/employee'}
          element={<EmployeePanel />}
        />

        <Route path="/" element={<NavBar />}>
          <Route path="" element={<HomePage />} />
          <Route path={'from::from/to::to'} element={<SearchPage />} />
          <Route path={'gamble'} element={<Gambling />} />
          <Route path={'statistics'} element={<Statistics />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
