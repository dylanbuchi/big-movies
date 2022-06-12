import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

import {
  Box,
  AppBar,
  IconButton,
  Button,
  Avatar,
  useMediaQuery,
  Drawer,
} from '@mui/material/';

import {
  Menu,
  AccountCircle,
  Brightness7,
  Brightness4,
} from '@mui/icons-material';

import { StyledToolBar } from './styles';
import SideBar from '../SideBar/SideBar';

const NavBar = () => {
  const theme = useTheme();

  const maxWidthStr = '(max-width:600px)';
  const searchString = 'Search...';

  const isMobileDevice = useMediaQuery(maxWidthStr);
  const isAuthenticated = false;

  const [MobileOpen, setMobileOpen] = useState(false);

  const paperDrawerWidth = 240;
  const none = 'none';

  return (
    <Box>
      <AppBar position="fixed">
        <StyledToolBar>
          {isMobileDevice && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: none }}
              sx={{ mr: 2, display: { sm: none } }}
              onClick={() => setMobileOpen((open) => !open)}
            >
              <Menu />
            </IconButton>
          )}
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={() => {}}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobileDevice && searchString}
          <Box>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={() => {}}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                sx={{
                  '&:hover': {
                    color: 'white !important',
                    textDecoration: none,
                  },
                }}
                color="inherit"
                component={Link}
                to="/profile/:id"
                onClick={() => {}}
              >
                {!isMobileDevice && <>My Movies &nbsp;</>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="Profile"
                  src=""
                />
              </Button>
            )}

            {isMobileDevice && searchString}
          </Box>
        </StyledToolBar>
      </AppBar>
      <Box>
        <nav>
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
        </nav>
      </Box>
    </Box>
  );
};

export default NavBar;
