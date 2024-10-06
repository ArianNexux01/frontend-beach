import { Theme } from '@mui/material';
import { Components } from '@mui/material/styles/components';

const ContainerLoginComponent: Components<Omit<Theme, 'components'>>['MuiContainer'] = {
  defaultProps: { maxWidth: false, disableGutters: true },
  styleOverrides: {
    root: ({ theme }) => ({
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      height: '911px',
      backgroundImage: 'url("/img-login.jpeg")',
      backgroundSize: '100% 100%',
      [theme.breakpoints.up('lg')]: {
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
      },
    }),
  },
};

export default ContainerLoginComponent;
