import { Box, Button, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import { SubmitHandler, useForm } from 'react-hook-form';
import api from 'api/axios';
//import { useNavigate } from 'react-router-dom';

type Inputs = {
  password: string;
  newPassword: string;
  confirmPassword: string;
};

const Account = () => {
  const inputStyle = {
    width: '600px',
  };
  //const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    try {
      const response = await api.put(`/user/update/password/${localStorage.getItem('id')}`, data);

      if (response.status === 201 || response.status === 200) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Senha actualizada com sucesso!',
          showConfirmButton: false,
          timer: 1500,
        });

        //  navigate('/dashboard/partners');
      }
    } catch (error) {
      if (error.response.status >= 400 && error.response.status <= 500) {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: error.response.data.details,
          showConfirmButton: false,
          timer: 1500,
        });

        //  navigate('/dashboard/partners');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            my: 4,
          }}
        >
          <Typography variant="h2">Minha Conta</Typography>
        </Box>

        <Box>
          <Box marginTop={5} sx={{ width: '450px' }}>
            <label>Nome</label>
            <input
              value={localStorage.getItem('name') ?? ''}
              disabled
              style={inputStyle}
              id="outlined-basic"
            />
          </Box>
          <Box marginTop={5}>
            <label>Utilizador</label>
            <input
              value={localStorage.getItem('username') ?? ''}
              disabled
              style={inputStyle}
              id="outlined-basic"
            />
          </Box>
          <Box marginTop={5}>
            <label>Tipo de Usuário</label>
            <input
              value={localStorage.getItem('role') ?? ''}
              disabled
              style={inputStyle}
              id="outlined-basic"
            />
          </Box>
          <Box marginTop={5}>
            <label>Senha Actual</label>
            <input
              type="password"
              {...register('password', { required: true })}
              style={inputStyle}
              id="outlined-basic"
            />
            {errors.password && <span className="error-message">Campo obrigatório</span>}
          </Box>
          <Box marginTop={5}>
            <label>Nova Senha</label>
            <input
              type="password"
              {...register('newPassword', { required: true })}
              style={inputStyle}
              id="outlined-basic"
            />
            {errors.newPassword && <span className="error-message">Campo obrigatório</span>}
          </Box>
          <Box marginTop={5}>
            <label>Confirmar Senha</label>
            <input
              type="password"
              {...register('confirmPassword', { required: true })}
              style={inputStyle}
              id="outlined-basic"
            />
            {errors.confirmPassword && <span className="error-message">Campo obrigatório</span>}
          </Box>
          <Box marginTop={5} marginBottom={5}>
            <Button type="submit" variant="outlined">
              Actualizar
            </Button>
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default Account;
