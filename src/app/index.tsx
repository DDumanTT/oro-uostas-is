/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from '../styles/global-styles';

import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage/Loadable';
import { SignupPage } from './pages/SignupPage/Loadable';
import { SearchPage } from './pages/SearchPage/Loadable';
import { NotFoundPage } from './pages/NotFoundPage';
import { useTranslation } from 'react-i18next';
import { Gambling } from './pages/Gambling/Loadable';
import NavBar from './components/NavBar';
import { CssBaseline } from '@mui/material';

export function App() {
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
      <NavBar />

      <Switch>
        <Route exact path={process.env.PUBLIC_URL + '/'} component={HomePage} />
        <Route
          exact
          path={process.env.PUBLIC_URL + '/login'}
          component={LoginPage}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL + '/signup'}
          component={SignupPage}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL + '/from::from/to::to'}
          component={SearchPage}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL + '/gamble'}
          component={Gambling}
        />
        {/* <Route component={NotFoundPage} /> */}
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}
