import { Link } from 'react-router-dom';

import { styled } from '@mui/material/styles';

export const StyledLink = styled(Link)(() => ({
  alignItems: 'center',
  fontWeight: 'bolder',
  textDecoration: 'none',
  overflow: 'hidden',

  '&:hover': {
    cursor: 'pointer',
    textShadow: '0.1px 0.1px',
    filter: 'brightness(1.05)',
  },
}));

export const MoviePoster = styled('img')(() => ({
  width: '208px',
  height: '300px',

  marginBottom: '0px',
  borderRadius: '15px',

  transition: 'all 0.5s',
  '&:hover': {
    transform: 'scale(1.08)',
  },
}));

export const typographyStyle = {
  color: 'black',
  textOverflow: 'ellipsis',

  alignItems: 'center',
  whiteSpace: 'nowrap',

  overflow: 'hidden',
  marginTop: '5px',
};
