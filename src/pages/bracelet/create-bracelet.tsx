import { Box, Button, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import Swal from 'sweetalert2';

import api from 'api/axios';
import { useNavigate } from 'react-router-dom';
type Inputs = {
  name: string;
};
const CreateBraceletPage = () => {
  const navigate = useNavigate();
  const inputStyle = {
    width: '600px',
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await api.post('/bracelet', data);

      if (response.status === 201) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Pulseira cadastrado com sucesso!',
          showConfirmButton: false,
          timer: 5500,
        });

        navigate('/dashboard/bracelet');
      }
    } catch (err) {
      if (err.status === 400) {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: err.response.data?.message.message,
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
          <Typography variant="h2">Adicionar Pulseira</Typography>
        </Box>
        <Box>
          <Box marginTop={5}>
            <label>Cor da Pulseira</label>
            <input
              {...register('name', { required: true })}
              style={inputStyle}
              id="outlined-basic"
            />
            {errors.name && <span className="error-message">Campo obrigatório</span>}
          </Box>
          <Box marginTop={5}>
            <Button type="submit" variant="outlined">
              Adicionar
            </Button>
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default CreateBraceletPage;
