import { Grid, Stack } from '@mui/material';
import LoginForm from 'components/sections/authentication/LoginForm';
const LoginPage = () => {
  return (
    <Grid container spacing={1} justifyContent="center" alignItems="center">
      <Grid item marginTop={'2%'} xs={12} sm={9} md={6} lg={5} xl={4}>
        <Stack
          spacing={1}
          sx={{
            mb: 1,
            textAlign: 'center',
          }}
        ></Stack>
        <LoginForm />
      </Grid>
    </Grid>
  );
};

export default LoginPage;
