import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

export const LinkImage = styled(Link)(() => ({
  display: 'flex',
  justifyContent: 'center',
  padding: '10% 0',
}));

export const Image = styled('img')(() => ({
  width: '70%',
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
}));
