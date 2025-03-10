import { AppBar, Box, IconButton, Link, Stack, Toolbar } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import Logo from 'components/icons/brand/Logo';
import ProfileDropdown from './ProfileDropdown';

interface MainNavbarProps {
  onDrawerToggle: () => void;
}

const MainNavbar = ({ onDrawerToggle }: MainNavbarProps) => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Stack direction="row" spacing={{ xs: 0, sm: 2 }} alignItems="center">
          <Link
            href="/"
            sx={{
              overflow: 'hidden',
              display: { xs: 'flex', lg: 'none' },
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            <Logo sx={{ fontSize: 40, p: 1 }} />
          </Link>
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={onDrawerToggle}
            sx={{
              display: { xs: 'block', lg: 'none' },
              width: 40,
              height: 42,
            }}
          >
            <IconifyIcon
              icon="oi:menu"
              color="primary.main"
              sx={{
                fontSize: 18,
              }}
            />
          </IconButton>

          <IconButton>
            <IconifyIcon
              icon="majesticons:search-line"
              color="primary.main"
              sx={{
                display: { xs: 'block', lg: 'none' },
              }}
            />{' '}
          </IconButton>
        </Stack>
        <Box flexGrow={1} />
        <Stack spacing={0.5} direction="row" alignItems="center">
          <ProfileDropdown />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default MainNavbar;
