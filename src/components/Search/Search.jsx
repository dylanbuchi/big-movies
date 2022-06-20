import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Search as SearchIcon } from '@mui/icons-material';
import { TextField, InputAdornment, Box } from '@mui/material';
import { searchMovie } from '../../features/search_movie';

const Search = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      dispatch(searchMovie(query));
    }
  };

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
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
        variant="standard"
        placeholder="Search..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ ml: '5px' }}>
              <SearchIcon />
            </InputAdornment>
          ),
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
