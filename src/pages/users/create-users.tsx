import { Box, Button, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import Swal from 'sweetalert2';

import api from 'api/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
type Inputs = {
  name: string;
  username: string;
  phone: string;
  password?: string;
  role: string;
};
const CreateUsersPage = () => {
  const navigate = useNavigate();
  const inputStyle = {
    width: '600px',
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  const { id } = useParams();
  const getData = async () => {
    const responseUser = await api.get(`/user/${id}`);

    if (id !== undefined) {
      setValue('username', responseUser.data.username);
      setValue('phone', responseUser.data.phone);
      setValue('name', responseUser.data.name);
      setValue('role', responseUser.data.role);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      let response;
      let message;
      if (id === undefined) {
        response = await api.post('/user/register', data);
        message = 'Usuário cadastrado com sucesso!';
      } else {
        let bodyForRequest: Inputs = {
          name: data.name,
          username: data.username,
          phone: data.phone,
          role: data.role,
        };

        if (data.password) {
          bodyForRequest = {
            ...bodyForRequest,
            password: data.password,
          };
        }
        response = await api.put(`/user/${id}`, bodyForRequest);

        message = 'Usuário actualizado com sucesso!';
      }
      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: message,
          showConfirmButton: false,
          timer: 5500,
        });

        navigate('/dashboard/users');
      }
    } catch (err) {
      if (err.status === 400) {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: err.response.data?.message[0] ?? err.response.data?.message,
          showConfirmButton: false,
          timer: 5500,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ width: '100%' }} mb={5}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            my: 4,
          }}
        >
          <Typography variant="h2">Adicionar Usuário</Typography>
        </Box>
        <Box>
          <Box marginTop={5} sx={{ width: '450px' }}>
            <label>Nome</label>
            <input
              {...register('name', { required: true })}
              style={inputStyle}
              id="outlined-basic"
            />
            {errors.name && <span className="error-message">Campo obrigatório</span>}
          </Box>
          <Box marginTop={5}>
            <label>Telefone</label>
            <input
              {...register('phone', { required: true })}
              style={inputStyle}
              id="outlined-basic"
            />
            {errors.phone && <span className="error-message">Campo obrigatório</span>}
          </Box>
          <Box marginTop={5}>
            <label>Utilizador</label>
            <input
              type="text"
              {...register('username', { required: true })}
              style={inputStyle}
              id="outlined-basic"
            />
            {errors.username && <span className="error-message">Campo obrigatório</span>}
          </Box>
          <Box marginTop={5} sx={{ display: 'flex', flexDirection: 'column', width: '39.5%' }}>
            <label>Tipo de Usuário</label>
            <select
              style={{ height: '40px', borderRadius: '5px' }}
              {...register('role', { required: true })}
            >
              <option value="ADMIN">Administrador</option>
              <option value="OPERATOR">Operador</option>
              <option value="RECEPTIONIST">Recepcionista</option>
            </select>
            {errors.role && <span className="error-message">Campo obrigatório</span>}
          </Box>

          <Box marginTop={5}>
            <label>Senha</label>
            <input
              {...register('password', { required: id === undefined })}
              style={inputStyle}
              type="password"
              autoComplete="off"
              id="outlined-basic"
            />
            {errors.password && <span className="error-message">Campo obrigatório</span>}
          </Box>

          <Box marginTop={5}>
            <Button type="submit" variant="outlined">
              {id === undefined ? 'Adicionar' : 'Actualizar'}
            </Button>
            <Button
              sx={{ marginLeft: '10px' }}
              onClick={() => {
                navigate('/dashboard/users');
              }}
              type="submit"
              variant="outlined"
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default CreateUsersPage;
