import React from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
} from '@mui/material';

import { useTheme } from '@mui/system';

import { LinkImage, Image, StyledLink } from './styles';

const SideBar = ({ setMobileOpen }) => {
  const theme = useTheme();

  const darkLogo = '';
  const lightLogo = '';

  const movieCategories = [
    { label: 'Popular', value: 'popular' },
    { label: 'Just Added', value: 'just_added' },
    { label: 'Coming Soon', value: 'coming_soon' },
  ];

  const movieGenres = [
    { label: 'Action', value: 'action' },
    { label: 'Comedy', value: 'comedy' },
    { label: 'Drama', value: 'drama' },
  ];

  return (
    <>
      <LinkImage to="/" />
      <Image src={theme.palette.mode === 'dark' ? darkLogo : lightLogo} />
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {movieCategories.map(({ label, value }) => (
          <StyledLink key={value} to="/">
            <ListItem onClick={() => {}} button>
              <ListItemIcon>
                <img src="" />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </StyledLink>
        ))}
      </List>
      <Divider />
      <List>
        {movieGenres.map(({ label, value }) => (
          <StyledLink key={value} to="/">
            <ListItem onClick={() => {}} button>
              <ListItemIcon>
                <img src="" />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </StyledLink>
        ))}
      </List>
    </>
  );
};

export default SideBar;
