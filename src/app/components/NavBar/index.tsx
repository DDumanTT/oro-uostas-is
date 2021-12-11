import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Route, Routes } from 'react-router-dom';
import {
  Avatar,
  Container,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import { Logout, PersonAdd, Settings } from '@mui/icons-material';
import { AccountMenu } from '../AccountMenu';
import { useLocation } from 'react-router-dom';

import { SearchPage } from 'app/pages/SearchPage';
import { Gambling } from 'app/pages/Gambling';
import { HomePage } from 'app/pages/HomePage';
import { NotFoundPage } from 'app/pages/NotFoundPage';
import { Statistics } from 'app/pages/Statistics';
import { isLogedIn } from 'axiosConfig';

export default function NavBar() {
  let location = useLocation();

  return (
    <Container>
      <Box
        sx={{
          flexGrow: 1,
          borderRadius: 2,
          overflow: 'hidden',
          marginTop: 1,
        }}
      >
        <AppBar position="static">
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Button color="inherit" component={Link} to="/">
                Darbo ✈️ Partija
              </Button>
            </Box>
            {/* Nerenderinti jei vartotojas prisijunges */}
            <Button color="inherit" component={Link} to="/login">
              Sign in
            </Button>

            {/* Renderinti jei vartotojas prisijunges */}
            <Button color="inherit" component={Link} to="/gamble">
              Games
            </Button>

            <Button color="inherit" component={Link} to="/statistics">
              Statistics
            </Button>

            {isLogedIn() && <AccountMenu />}

            {/* Renderinti jei vartotojas prisijunges */}
            {/* cia turi buti vartotojo profilis */}

            {/* Userio mygtukas jei is jo linkai i admin panel, client panel employee panel */}
          </Toolbar>
        </AppBar>
      </Box>

      <Outlet />
    </Container>
  );
}
