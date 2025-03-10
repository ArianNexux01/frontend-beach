import { Box, Button, IconButton, TextField } from '@mui/material';
import api from 'api/axios';
import IconifyIcon from 'components/base/IconifyIcon';
import { StyledBackdrop, ModalContent, Modal } from 'components/modal';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const EntryGuestPage = () => {
  const [open, setOpen] = useState(false);
  const [companionsData, setCompanionsData] = useState<Companions[]>([]);
  const navigate = useNavigate();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  type InputsGuest = {
    name?: string;
    phone: string;
    numberOfCompanions?: number;
    numberOfChildren?: number;
    numberOfTeenages?: number;
  };

  type Companions = {
    name: string;
    phone: string;
  };
  const {
    register: registerGuest,
    handleSubmit: handleSubmitGuest,
    watch,
  } = useForm<InputsGuest>();
  const onSubmitGuest: SubmitHandler<InputsGuest> = async (data: InputsGuest) => {
    try {
      if (
        companionsData.filter((companion) => companion.name === '' || companion.phone === '')
          .length > 0
      ) {
        await Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Preencha os dados dos acompanhantes',
          showConfirmButton: false,
          timer: 4500,
        });
        setOpen(true);
        return;
      }
      let companionsWithoutPhone = companionsData.filter((companion) => companion.phone === '');
      const companionsWithPhone = companionsData.filter((companion) => companion.phone !== '');
      companionsWithoutPhone = companionsWithoutPhone.map((companion) => ({
        ...companion,
        phone: watch('phone'),
      }));

      const response = await api.post('/guest/entrance', {
        name: data.name,
        telephone: data.phone,
        companions: [...companionsWithPhone, ...companionsWithoutPhone],
        numberOfCompanions: Number(data.numberOfCompanions),
        numberOfChildren: Number(data.numberOfChildren),
        numberOfTeenages: Number(data.numberOfTeenages),
      });

      if (response.status === 201) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Entrada registada com sucesso!',
          showConfirmButton: false,
          timer: 5500,
        });
        navigate('/dashboard/search-partner');
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: error.response.data.message.message,
        showConfirmButton: false,
        timer: 5500,
      });
    }
  };

  const handleSetNameCompaniosByIndex = (index: number, e: React.FocusEvent<HTMLInputElement>) => {
    if (companionsData !== undefined) {
      const allCompanions: Companions[] = companionsData;
      allCompanions[index].name = e.target.value;
      setCompanionsData(allCompanions);
    }
  };

  const handleSetTelephoneCompaniosByIndex = (
    index: number,
    e: React.FocusEvent<HTMLInputElement>,
  ) => {
    if (companionsData !== undefined) {
      const allCompanions: Companions[] = companionsData;
      console.log(companionsData, index);

      allCompanions[index].phone = e.target.value;
      setCompanionsData(allCompanions);
    }
  };

  useEffect(() => {
    if (companionsData.length != Number(watch('numberOfCompanions'))) {
      const companiosDt: Companions[] = [];
      for (let i = 0; i < Number(watch('numberOfCompanions')); i++) {
        companiosDt.push({
          name: '',
          phone: '',
        });
      }

      setCompanionsData(companiosDt);
    }
  }, [watch('numberOfCompanions')]);

  return (
    <>
      <form onSubmit={handleSubmitGuest(onSubmitGuest)}>
        <h2 id="spring-modal-title" className="modal-title">
          Registrar entrada de Não Sócio
        </h2>
        <span id="spring-modal-description" className="modal-description">
          Dados do Não Sócio
        </span>
        <Box mt={4} mb={4} sx={{ width: '450px' }}>
          <TextField
            fullWidth
            variant="outlined"
            id="email"
            type="text"
            label="Nome"
            {...registerGuest('name', { required: true })}
          />
        </Box>

        <Box mt={4} mb={4} sx={{ width: '450px' }}>
          <TextField
            fullWidth
            variant="outlined"
            id="email"
            type="tel"
            label="Telefone"
            {...registerGuest('phone', { required: true })}
          />
        </Box>
        <Box mt={4} mb={4} sx={{ width: '450px' }}>
          <TextField
            fullWidth
            variant="outlined"
            id="email"
            type="number"
            defaultValue={0}
            label="Nº de Acompanhantes"
            {...registerGuest('numberOfCompanions', { required: true })}
            InputProps={{
              endAdornment: (
                <IconButton
                  title="Clear"
                  aria-label="Abrir modal para inserir dados dos acompanhantes"
                  size="small"
                  onClick={handleOpen}
                >
                  <IconifyIcon icon="mdi:plus-circle" fontSize="1rem" />
                </IconButton>
              ),
            }}
          />
        </Box>
        <Box mt={4} mb={4} sx={{ width: '450px' }}>
          <TextField
            fullWidth
            variant="outlined"
            id="email"
            type="number"
            defaultValue={0}
            label="Nº de Crianças"
            {...registerGuest('numberOfChildren', { required: true })}
          />
        </Box>
        <Box mt={4} mb={4} sx={{ width: '450px' }}>
          <TextField
            fullWidth
            variant="outlined"
            id="email"
            type="number"
            defaultValue={0}
            label="Nº de Adolescentes"
            {...registerGuest('numberOfTeenages', { required: true })}
          />
        </Box>

        <Box marginTop={5} sx={{ width: '450px' }}>
          <Button type="submit" variant="outlined">
            Registrar
          </Button>
          <Button
            onClick={() => {
              navigate('/dashboard/search-partner');
            }}
            style={{ marginLeft: 5 }}
            variant="outlined"
          >
            Cancelar
          </Button>
        </Box>
      </form>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent>
          <h2 id="unstyled-modal-title" className="modal-title">
            Adicionar dados dos acompanhantes
          </h2>
          {companionsData.map((e: Companions, index: number) => (
            <Box key={index} mt={2} mb={2} sx={{ width: '450px' }}>
              <h3>Acompanhante {index + 1}</h3>
              <TextField
                sx={{ marginTop: '10px' }}
                fullWidth
                variant="outlined"
                id="email"
                type="text"
                label="Nome"
                defaultValue={companionsData[index]?.name ?? ''}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                  handleSetNameCompaniosByIndex(index, e);
                }}
              />
              <TextField
                sx={{ marginTop: '10px' }}
                fullWidth
                variant="outlined"
                id="email"
                type="text"
                label="Telefone"
                defaultValue={companionsData[index]?.phone ?? 0}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                  handleSetTelephoneCompaniosByIndex(index, e);
                }}
              />
            </Box>
          ))}
          <Box marginTop={5} sx={{ width: '450px' }}>
            <Button
              onClick={() => {
                setOpen(false);
              }}
              variant="outlined"
            >
              Adicionar
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
              }}
              style={{ marginLeft: 5 }}
              variant="outlined"
            >
              Cancelar
            </Button>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EntryGuestPage;
