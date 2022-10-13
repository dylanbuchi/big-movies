import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';

import {
  AppBar,
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  useMediaQuery,
} from '@mui/material/';

import {
  AccountCircle,
  Brightness4,
  Brightness7,
  Menu,
} from '@mui/icons-material';

import { Search, SideBar } from '..';
import { StyledToolBar } from './styles';

import {
  createUserSessionId,
  fetchAuthenticationToken,
  theMovieDatabaseApiInstance,
} from '../../utilities';

import { setUser } from '../../features/user_authentication';
import { DarkModeContext } from '../../utilities/ToggleDarkMode';
import { RootState } from '../../app/store';

const NavBar = () => {
  const theme = useTheme();

  const darkModeContext = useContext(DarkModeContext);

  const maxWidthStr = '(max-width:600px)';

  const isMobileDevice = useMediaQuery(maxWidthStr);

  const [MobileOpen, setMobileOpen] = useState(false);

  const paperDrawerWidth = 240;
  const none = 'none';

  const requestToken = localStorage.getItem('request_token');
  const userSessionId = localStorage.getItem('session_id');

  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.userAuthentication,
  );

  useEffect(() => {
    const login = async () => {
      const url = 'account?session_id=';

      if (requestToken) {
        if (userSessionId) {
          const { data: userData } = await theMovieDatabaseApiInstance.get(
            `${url}${userSessionId}`,
          );
          dispatch(setUser(userData));
        } else {
          const sessionId = await createUserSessionId();

          const { data: userData } = await theMovieDatabaseApiInstance.get(
            `${url}${sessionId}`,
          );
          dispatch(setUser(userData));
        }
      }
    };
    login();
  }, [requestToken, dispatch, userSessionId]);

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
          <IconButton
            color="inherit"
            sx={{ ml: 1 }}
            onClick={darkModeContext.toggleDarkMode}
          >
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobileDevice && <Search />}

          <Box>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchAuthenticationToken}>
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
                to={`/profile/${user.id}`}
              >
                {!isMobileDevice && <>My Movies &nbsp;</>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="Profile"
                  src=""
                />
              </Button>
            )}
          </Box>
          {isMobileDevice && <Search />}
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
              <SideBar />
            </Drawer>
          ) : (
            <Drawer
              variant="permanent"
              PaperProps={{
                sx: { width: paperDrawerWidth },
              }}
              open
            >
              <SideBar />
            </Drawer>
          )}
        </nav>
      </Box>
    </Box>
  );
};

export default NavBar;
