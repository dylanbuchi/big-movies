import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

import {
  AppBar,
  IconButton,
  Button,
  Avatar,
  useMediaQuery,
  Drawer,
} from '@mui/material';

import {
  Menu,
  AccountCircle,
  Brightness7,
  Brightness4,
} from '@mui/icons-material';

import { MenuButton, StyledToolBar, NavDrawer, LinkButton } from './styles';
import SideBar from '../SideBar/SideBar';

const NavBar = () => {
  const theme = useTheme();

  const maxWidthStr = '(max-width:600px)';
  const isMobileDevice = useMediaQuery(maxWidthStr);
  const isAuthenticated = false;

  const [MobileOpen, setMobileOpen] = useState(false);

  const paperDrawerWidth = 240;

  return (
    <>
      <AppBar position="fixed">
        <StyledToolBar>
          {isMobileDevice && (
            <MenuButton
              color="inherit"
              edge="start"
              style={{ outline: 'none' }}
              onClick={() => setMobileOpen((open) => !open)}
            >
              <Menu />
            </MenuButton>
          )}
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={() => {}}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobileDevice && 'Search...'}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={() => {}}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <LinkButton
                color="inherit"
                element={Link}
                to="/profile/:id"
                onClick={() => {}}
              >
                {!isMobileDevice && <>My Movies &nbsp; </>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="Profile"
                  src=""
                />
              </LinkButton>
            )}

            {isMobileDevice && 'Search...'}
          </div>
        </StyledToolBar>
      </AppBar>
      <div>
        <NavDrawer>
          {isMobileDevice ? (
            <Drawer
              variant="temporary"
              anchor="left"
              open={MobileOpen}
              onClose={() => setMobileOpen((open) => !open)}
              PaperProps={{
                sx: { width: paperDrawerWidth },
              }}
              ModalProps={{ keepMounted: true }}
            >
              <SideBar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              variant="permanent"
              PaperProps={{
                sx: { width: paperDrawerWidth },
              }}
              open
            >
              <SideBar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </NavDrawer>
      </div>
    </>
  );
};

export default NavBar;
