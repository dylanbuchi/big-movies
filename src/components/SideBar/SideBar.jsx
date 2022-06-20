import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
} from '@mui/material';

import { useTheme } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { LinkImage, Image, StyledLink } from './styles';
import { useGetMovieGenresQuery } from '../../services/the_movie_database_api';

import LoadingIcon from '../LoadingIcon/LoadingIcon';
import movieGenreIcons from '../../assets/images/movie_genres';
import { selectMovieCategoryOrGenre } from '../../features/movie_category_or_genre';

const SideBar = ({ setMobileOpen }) => {
  const theme = useTheme();

  const dispatch = useDispatch();

  const selectMovie = (value) => {
    dispatch(selectMovieCategoryOrGenre(value));
  };

  const { data, isFetching } = useGetMovieGenresQuery();

  const darkLogo = '';
  const lightLogo = '';

  const movieCategories = [
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Trending Now', value: 'trending' },
    { label: 'Coming Soon', value: 'upcoming' },
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
            <ListItem onClick={() => selectMovie(value)} button>
              <ListItemText primary={label} />
            </ListItem>
          </StyledLink>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <LoadingIcon />
        ) : (
          data.genres.map(({ name, id }) => (
            <StyledLink key={name} to="/">
              <ListItem onClick={() => selectMovie(id)} button>
                <ListItemIcon>
                  <img
                    src={movieGenreIcons[name.toLowerCase()]}
                    height="35px"
                    width="35px"
                  />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            </StyledLink>
          ))
        )}
      </List>
    </>
  );
};

export default SideBar;
