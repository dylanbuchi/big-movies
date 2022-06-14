import { styled } from '@mui/system';

export const DivRoot = styled('div')(() => ({
  display: 'flex',
  height: '100%',
  overflowX: 'hidden',
}));

export const DivToolbar = styled('div')(() => ({
  height: '70px',
}));

export const MainContent = styled('main')(() => ({
  flexGrow: '1',
  padding: '2em',
}));
