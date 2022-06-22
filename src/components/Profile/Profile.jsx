import { useSelector } from 'react-redux';

import { ExitToApp } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';

const Profile = () => {
  const { user } = useSelector((state) => state.userAuthentication);

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" marginLeft="20px">
        <Typography gutterBottom variant="h4">
          {user.username}
        </Typography>
        <Button
          variant="contained"
          size="small"
          color="primary"
          sx={{
            borderRadius: '20px',
            textTransform: 'none',
            fontSize: '16px',
            mr: '10px',
            mb: '25px',
            p: '8px',
          }}
          onClick={logout}
        >
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
