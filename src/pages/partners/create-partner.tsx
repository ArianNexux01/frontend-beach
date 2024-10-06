import { Box, Button, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import { SubmitHandler, useForm } from 'react-hook-form';
import api from 'api/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FileUploader } from 'react-drag-drop-files';
import { useEffect, useState } from 'react';

type Inputs = {
  name: string;
  email: string;
  phone: string;
  ref?: string;
};

const CreatePartnersPage = () => {
  const inputStyle = {
    width: '600px',
  };

  const navigate = useNavigate();
  const fileTypes = ['JPG', 'PNG', 'GIF'];
  const [picture, setPicture] = useState<Blob | string>(new Blob());
  const [nextNumberPartner, setNextNumberPartner] = useState(0);
  const [registrationForm, setRegistraitionForm] = useState<Blob | string>(new Blob());
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const getData = async () => {
    const response = await api.get('/partner/max-ref');
    setNextNumberPartner(response.data);
    const responsePartner = await api.get(`/partner/${id}`);
    setValue('ref', responsePartner.data.ref);

    if (id !== undefined) {
      setValue('email', responsePartner.data.email);
      setValue('phone', responsePartner.data.phone);
      setValue('ref', responsePartner.data.ref);
      setValue('name', responsePartner.data.name);
      setPicture('http://localhost:3001/' + responsePartner.data.picture);
      setRegistraitionForm('http://localhost:3001/' + responsePartner.data.registrationFormUrl);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append('files', registrationForm);
    formData.append('files', picture);
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('ref', nextNumberPartner.toString());
    const response = await api.post('/partner/register', formData);

    if (response.status === 201) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Sócio cadastrado com sucesso!',
        showConfirmButton: false,
        timer: 1500,
      });

      navigate('/dashboard/partners');
    }
  };
  const handleChangePicture = (file: File) => {
    setPicture(file);
  };
  const handleChangeRegistrationForm = (file: File) => {
    setRegistraitionForm(file);
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
          <Typography variant="h2">{id !== undefined ? 'Ver Sócio' : 'Adicionar Sócio'}</Typography>
        </Box>

        <Box>
          <Box marginTop={5} sx={{ width: '450px' }}>
            <label>Nome</label>
            <input
              disabled={id !== undefined}
              {...register('name', { required: true })}
              style={inputStyle}
              id="outlined-basic"
            />
            {errors.name && <span className="error-message">Campo obrigatório</span>}
          </Box>
          <Box marginTop={5}>
            <label>Telefone</label>
            <input
              disabled={id !== undefined}
              {...register('phone', { required: true })}
              style={inputStyle}
              id="outlined-basic"
            />
            {errors.phone && <span className="error-message">Campo obrigatório</span>}
          </Box>
          <Box marginTop={5}>
            <label>Número de Socio</label>
            <input
              value={nextNumberPartner}
              disabled={true}
              style={inputStyle}
              id="outlined-basic"
            />
          </Box>
          <Box marginTop={5}>
            <label>E-mail</label>
            <input
              disabled={id !== undefined}
              {...register('email', { required: true })}
              style={inputStyle}
              id="outlined-basic"
            />
            {errors.name && <span className="error-message">Campo obrigatório</span>}
          </Box>
          <Box marginTop={5} sx={{ display: 'flex', flexDirection: 'column' }}>
            <label>Foto</label>
            {id === undefined ? (
              <FileUploader
                fileOrFiles={{
                  dragActive: 'Drop the files here...',
                  dragReject: 'File type not accepted, sorry!',
                  drop: 'Drag & Drop your files here',
                }}
                label="TEXT"
                handleChange={handleChangePicture}
                name="file"
                types={fileTypes}
              />
            ) : (
              <img style={{ marginTop: '15px' }} width={250} src={picture.toString()} />
            )}
          </Box>
          <Box marginTop={5} sx={{ display: 'flex', flexDirection: 'column' }}>
            <label>Ficha de Inscrição</label>
            {id === undefined ? (
              <FileUploader
                fileOrFiles={{
                  dragActive: 'Drop the files here...',
                  dragReject: 'File type not accepted, sorry!',
                  drop: 'Drag & Drop your files here',
                }}
                label="TEXT"
                handleChange={handleChangeRegistrationForm}
                name="files"
                types={fileTypes}
              />
            ) : (
              <img style={{ marginTop: '15px' }} width={250} src={registrationForm.toString()} />
            )}
          </Box>
          <Box marginTop={5} marginBottom={5}>
            <Button
              onClick={() => {
                console.log(errors);
              }}
              type="submit"
              variant="outlined"
            >
              Adicionar
            </Button>
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default CreatePartnersPage;