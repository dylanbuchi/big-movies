import { styled } from '@mui/system';

import { Toolbar, IconButton, Button } from '@mui/material';

const navDrawerWith = 240;

export const StyledToolBar = styled(Toolbar)(({ theme }) => ({
  height: '80px',
  display: 'flex',
  justifyContent: 'space-between',
  marginLeft: '240px',

  [theme.breakpoints.down('sm')]: {
    marginLeft: '0',
    flexWrap: 'wrap',
  },
}));

export const MenuButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),

  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));

export const NavDrawer = styled('nav')(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    width: navDrawerWith,
    flexShrink: 0,
  },
}));

export const LinkButton = styled(Button)(() => ({
  '&:hover': {
    color: 'white !important',
    textDecoration: 'none',
  },
}));
