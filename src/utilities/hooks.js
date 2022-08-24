import { useDispatch, useSelector } from 'react-redux';
import { setInputField } from '../features/search_movie';

export const useClearSearchInput = () => {
  const { searchInputField } = useSelector((state) => state.searchMovie);

  const dispatch = useDispatch();
  const clearInput = () => {
    if (searchInputField) dispatch(setInputField(''));
  };

  return clearInput;
};
