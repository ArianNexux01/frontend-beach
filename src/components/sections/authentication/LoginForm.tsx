import { Box, Typography, Button, Divider, Stack } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import axios from 'axios';
import { environment } from 'config/environment';

type Inputs = {
  username: string;
  password: string;
};
const inputStyle = {
  width: '95%',
};
const glassStyle = {
  background: 'rgba(255, 255, 255, 0.28)',
  borderRadius: '16px',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(8.3px)',
  WebkitBackdropFilter: 'blur(7.3px)',
  border: '1px solid rgba(255, 255, 255, 0.26)',
  padding: '80px',
};
interface MyTokenPayload extends JwtPayload {
  sub: string;
  username: string;
  name: string;
  role: string;
}

const LoginForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const setDecondeAndDataToLocalStorage = (token: string) => {
    const decodedToken = jwtDecode<MyTokenPayload>(token);
    localStorage.setItem('name', decodedToken.name);
    localStorage.setItem('username', decodedToken.username);
    localStorage.setItem('role', decodedToken.role);
    localStorage.setItem('id', decodedToken.sub);
  };
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await axios.post(environment.baseURL + '/login', data);
      localStorage.setItem('token', response.data.access_token);
      setDecondeAndDataToLocalStorage(response.data.access_token);
      if (response.status === 401) {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        if (localStorage.getItem('role') === 'RECEPTIONIST') {
          navigate('/dashboard/reception');
        } else if (localStorage.getItem('role') === 'OPERATOR') {
          navigate('/dashboard/search-partner');
        } else {
          navigate('/dashboard');
        }
        window.location.reload();
      }
    } catch (err) {
      const message =
        err.response.data?.message.message === 'Unauthorized'
          ? 'Utilizador ou senha incorreto'
          : err.response.data?.message.message;
      if (err.status === 401)
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: message,
          showConfirmButton: false,
          timer: 1500,
        });
    }
  };
  return (
    <Box sx={glassStyle}>
      <Typography
        variant="h1"
        sx={{
          typography: {
            whiteSpace: 'nowrap',
            color: 'white',
            textAlign: 'center',
            marginBottom: '20px',
          },
        }}
      >
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Box marginTop={5}>
            <label style={{ color: 'white' }}>Utilizador</label>
            <input
              type="text"
              {...register('username', { required: true })}
              style={inputStyle}
              id="outlined-basic"
            />
            {errors.username && <span className="error-message">Campo obrigatório</span>}
          </Box>
          <Box marginTop={5}>
            <label style={{ color: 'white' }}>Senha</label>
            <input
              {...register('password', { required: true })}
              style={inputStyle}
              type="password"
              id="outlined-basic"
            />
            {errors.password && <span className="error-message">Campo obrigatório</span>}
          </Box>
        </Stack>
        <Button
          color="primary"
          variant="contained"
          size="large"
          type="submit"
          fullWidth
          sx={{ my: 2, backgroundColor: '#c2b067' }}
        >
          Entrar
        </Button>
        <Divider
          sx={{
            my: 3,
          }}
        />
      </form>
    </Box>
  );
};

export default LoginForm;
