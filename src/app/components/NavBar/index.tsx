import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

export default function NavBar() {
  return (
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
            <Button color="inherit" variant="outlined" component={Link} to="/">
              Darbo ✈️ Partija
            </Button>
          </Box>
          {/* Nerenderinti jei vartotojas prisijunges */}
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>

          {/* Renderinti jei vartotojas prisijunges */}
          <Button color="inherit" component={Link} to="/gamble">
            Gamble
          </Button>
          {/* Renderinti jei vartotojas prisijunges */}
          {/* cia turi buti vartotojo profilis */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
