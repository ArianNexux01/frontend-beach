import { Box, Button, ListItemIcon, Menu, MenuItem, Stack, Typography } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { profileOptions } from 'data/navbar/menu-data';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const ProfileDropdown = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRedirectToMyAccount = () => {
    navigate('/dashboard/account');
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
    navigate('/login');
    window.location.reload();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      sx={{
        px: 0.75,
        pr: 2,
      }}
    >
      <span onClick={handleClick}>
        <Stack
          spacing={1.5}
          direction="row"
          alignItems="center"
          sx={{
            py: 0.75,
            ml: 0.75,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              display: { xs: 'none', sm: 'block' },
            }}
          >
            {localStorage.getItem('username')}
          </Typography>
        </Stack>
      </span>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        slotProps={{
          paper: {
            style: {
              paddingTop: '8px',
              width: '100%',
              maxWidth: 120,
            },
          },
        }}
      >
        {profileOptions.map((option) => (
          <MenuItem
            key={option.id}
            sx={{
              py: 1,
              px: 1.5,
            }}
            onClick={handleRedirectToMyAccount}
          >
            <ListItemIcon sx={{ '&.MuiListItemIcon-root': { minWidth: 2, mr: 1 } }}>
              <IconifyIcon width={16} height={16} icon={option.icon} />
            </ListItemIcon>
            <Typography variant="subtitle2"> {option.title}</Typography>
          </MenuItem>
        ))}
        <Stack direction="row" sx={{ width: 1, justifyContent: 'center' }}>
          <Button
            size="small"
            onClick={handleLogout}
            variant="outlined"
            sx={{
              mt: 1.5,
              width: '80%',
              py: 0.5,
            }}
          >
            Logout
          </Button>
        </Stack>
      </Menu>
    </Box>
  );
};
export default ProfileDropdown;
