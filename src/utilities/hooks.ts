import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { setInputField } from '../features/search_movie';

export const useClearSearchInput = () => {
  const { searchInputField } = useSelector(
    (state: RootState) => state.searchMovie,
  );

  const dispatch = useDispatch();
  const clearInput = () => {
    if (searchInputField) dispatch(setInputField(''));
  };

  return clearInput;
};
