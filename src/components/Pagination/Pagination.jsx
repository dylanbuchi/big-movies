import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { useClearSearchInput } from '../../utilities/hooks';

const Pagination = ({ page, totalPages, setPage }) => {
  const clearSearchInput = useClearSearchInput();
  const nextPage = () => {
    clearSearchInput();
    setPage((prevPage) => prevPage + 1);
  };
  const previousPage = () => {
    clearSearchInput();
    setPage((prevPage) => prevPage - 1);
  };

  if (!totalPages) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {page > 1 && (
        <Button
          sx={{ m: '20px' }}
          variant="contained"
          size="small"
          onClick={previousPage}
          startIcon={<KeyboardArrowLeft />}
        >
          Prev
        </Button>
      )}
      <Typography variant="h6">{page}</Typography>
      {page < totalPages && (
        <Button
          variant="contained"
          sx={{ m: '20px' }}
          onClick={nextPage}
          size="small"
          endIcon={<KeyboardArrowRight />}
        >
          Next
        </Button>
      )}
    </Box>
  );
};

export default Pagination;
