import { useDispatch } from 'react-redux';

import { Search as SearchIcon } from '@mui/icons-material';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { searchMovie } from '../../features/search_movie';
import { useRef, useState } from 'react';

const Search = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [showClearButton, setShowClearButton] = useState(false);

  const changeInputElementText = (
    element: HTMLInputElement | null,
    value: string,
  ) => {
    if (!element) return;
    element.value = value;
  };

  const dispatch = useDispatch();
  const clearSearchInput = () => {
    changeInputElementText(inputRef.current, '');
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    setShowClearButton(true);
    if (event.key === 'Enter') {
      dispatch(searchMovie(inputRef.current?.value));
      clearSearchInput();
    }
  };

  const location = useLocation();

  const displayClearButton = () => {
    if (showClearButton) {
      return (
        <Button
          onClick={() => {
            setShowClearButton(false);
            clearSearchInput();
            dispatch(searchMovie(''));
          }}
          variant="contained"
          size="small"
          sx={{
            borderRadius: '15px',
            textTransform: 'none',
            m: '2.5px',
          }}
        >
          Clear
        </Button>
      );
    }
    return '';
  };

  if (location.pathname !== '/') return null;

  return (
    <Box
      sx={(theme) => ({
        [theme.breakpoints.down('sm')]: {
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        },
      })}
    >
      <TextField
        onKeyDown={handleKeyPress}
        inputRef={inputRef}
        variant="standard"
        placeholder="Search..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ ml: '5px' }}>
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: displayClearButton(),
          disableUnderline: true,
          sx: (theme) => ({
            color: theme.palette.mode === 'light' ? 'black' : 'white',
            background: theme.palette.mode === 'light' ? 'white' : '#202021',
            borderRadius: '15px',

            [theme.breakpoints.down('sm')]: {
              mt: '0px',
              mb: '10px',
            },
          }),
        }}
      />
    </Box>
  );
};

export default Search;
