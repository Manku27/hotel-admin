import * as React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from '@mui/material';
import { pink } from '@mui/material/colors';

import FolderIcon from '@mui/icons-material/Folder';
import HotelIcon from '@mui/icons-material/Hotel';

import { logout } from '../services/auth-service';
import { Link } from 'react-router-dom';

const pages = [{ label: 'Employees', to: '/users' }];

const settings = [{ label: 'Logout', onClick: logout }];

function Header() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <HotelIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Hotel-Admin
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
            }}
          >
            {pages.map((page) => (
              <Link key={page.label} to={page.to}>
                <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                  {page.label}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: pink[500] }}>
                  <FolderIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.label} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={setting.onClick}>
                    {setting.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
