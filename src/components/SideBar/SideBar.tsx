import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';

import { useTheme } from '@mui/system';
import { useDispatch } from 'react-redux';
import { useGetMovieGenresQuery } from '../../services/the_movie_database_api';
import { Image, LinkImage, StyledLink } from './styles';

import logos from '../../assets/images/logos';
import movieGenreIcons from '../../assets/images/movie_genres';
import { searchMovie } from '../../features/search_movie';

import { LoadingIcon } from '..';
import { selectMovieCategoryOrGenre } from '../../features/movie_category_or_genre';
import { MovieGenre } from '../../interfaces/movies';

const SideBar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const selectMovie = (value: string) => {
    dispatch(selectMovieCategoryOrGenre(value));
  };

  const removeSearchMovieState = () => dispatch(searchMovie(''));
  const { data, isFetching } = useGetMovieGenresQuery({});

  const movieCategories = [
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Trending Now', value: 'trending' },
    { label: 'Coming Soon', value: 'upcoming' },
  ];

  return (
    <>
      <LinkImage to="/" />
      <Image
        src={theme.palette.mode === 'dark' ? logos.red : logos.blue}
        height="50px"
        width="200px"
        style={{
          marginLeft: '30px',
          marginBottom: '35px',
        }}
      />
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {movieCategories.map(({ label, value }) => (
          <StyledLink key={value} to="/">
            <ListItem
              onClick={() => {
                selectMovie(value);
                removeSearchMovieState();
              }}
              button
            >
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
          data.genres.map(({ name, id }: MovieGenre) => (
            <StyledLink key={name} to="/">
              <ListItem
                onClick={() => {
                  selectMovie(id);
                  removeSearchMovieState();
                }}
                button
              >
                <ListItemIcon>
                  <img
                    alt={name}
                    src={movieGenreIcons[name.toLowerCase()]}
                    height="35px"
                    width="35px"
                    style={{
                      filter:
                        theme.palette.mode === 'dark' ? 'invert(1)' : undefined,
                    }}
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
