/**
 *
 * AccountMenu
 *
 */
import {
  Logout,
  PersonAdd,
  Settings,
  AdminPanelSettings,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import * as React from 'react';
import styled from 'styled-components/macro';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../../axiosConfig';
import { getUser, Roles } from 'user_info';

interface Props {}

export function AccountMenu(props: Props) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    axios
      .post('logout')
      .then(res => {})
      .finally(() => {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('user');
        navigate('/');
      });
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <Avatar sx={{ width: 32, height: 32 }}>
              {getUser().name[0].toUpperCase()}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={e => navigate('/profile')}>
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        {getUser().role !== Roles.client && (
          <MenuItem component={Link} to="/admin">
            <ListItemIcon>
              <AdminPanelSettings fontSize="small" />
            </ListItemIcon>
            {getUser().role === Roles.admin && 'Admin panel'}
            {getUser().role === Roles.worker && 'Employee panel'}
          </MenuItem>
        )}

        <MenuItem onClick={e => navigate('/settings')}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

const Div = styled.div``;
