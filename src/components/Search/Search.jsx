import { useDispatch, useSelector } from 'react-redux';

import { Search as SearchIcon } from '@mui/icons-material';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { searchMovie, setInputField } from '../../features/search_movie';
import { useClearSearchInput } from '../../utilities/hooks';

const Search = () => {
  const { searchInputField } = useSelector((state) => state.searchMovie);

  const dispatch = useDispatch();
  const clearSearchInput = useClearSearchInput();

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      dispatch(searchMovie(searchInputField));
    }
  };

  const setSearchInputField = (value) => {
    dispatch(setInputField(value));
  };

  const location = useLocation();

  const displayClearButton = () => {
    if (searchInputField) {
      return (
        <Button
          onClick={() => {
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
        value={searchInputField}
        onChange={(event) => {
          setSearchInputField(event.target.value);
        }}
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
