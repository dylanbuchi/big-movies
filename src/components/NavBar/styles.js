import { styled } from '@mui/system';

import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

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

  [theme.breakpoints.up()]: {
    display: 'none',
  },
}));
