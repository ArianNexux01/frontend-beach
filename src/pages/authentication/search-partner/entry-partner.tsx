import { Box, Button, IconButton, TextField } from '@mui/material';
import api from 'api/axios';
import IconifyIcon from 'components/base/IconifyIcon';
import { StyledBackdrop, ModalContent, Modal } from 'components/modal';
import { environment } from 'config/environment';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

interface PartnerData {
  id: string;
  name: string;
  email: string;
  phone: string;
  ref: string;
  picture: string;
  registrationFormUrl: string;
}

type Companions = {
  name: string;
  phone: string;
};
type Inputs = {
  numberOfChildren: number;
  numberOfCompanions: number;
  numberOfTeenages: number;
  partnerId: string;
};
const inputStyle = {
  width: '100%',
};
const EntryPartnerPage = () => {
  const [partner, setPartner] = useState<PartnerData>();
  const [open, setOpen] = useState(false);
  const [companionsData, setCompanionsData] = useState<Companions[]>([]);
  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const { id } = useParams();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    const getData = async () => {
      const response = await api.get(`/partner/${id}`);
      setPartner(response.data);
    };

    getData();
  }, []);
  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    try {
      if (partner !== undefined) {
        if (
          companionsData.length > 0 &&
          companionsData.filter((companion) => companion.name === '').length > 0
        ) {
          await Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Preencha os dados dos acompanhantes',
            showConfirmButton: false,
            timer: 5500,
          });
          setOpen(true);
          return;
        }
        let companionsWithoutPhone = companionsData.filter((companion) => companion.phone === '');
        const companionsWithPhone = companionsData.filter((companion) => companion.phone !== '');
        companionsWithoutPhone = companionsWithoutPhone.map((companion) => ({
          ...companion,
          phone: partner.phone,
        }));

        data.partnerId = partner.id;
        const response = await api.post('/partner/entrance', {
          numberOfCompanions: Number(data.numberOfCompanions),
          companions: [...companionsWithPhone, ...companionsWithoutPhone],
          numberOfChildren: Number(data.numberOfChildren),
          numberOfTeenages: Number(data.numberOfTeenages),
          partnerId: partner.id,
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 id="spring-modal-title" className="modal-title">
          Registrar entrada do Sócio
        </h2>
        <span id="spring-modal-description" className="modal-description">
          Dados do Sócio
        </span>
        <Box mt={4} mb={4} sx={{ width: '450px' }}>
          <img width={200} src={environment.fileURL + partner?.picture} />
        </Box>
        <Box mt={5} mb={5} paddingRight={2} sx={{ width: '450px' }}>
          <label>Nome</label>
          <input disabled value={partner?.name} style={inputStyle} id="outlined-basic" />
        </Box>
        <Box mt={2} mb={5} paddingRight={2} sx={{ width: '450px' }}>
          <label>Nº do Sócio</label>
          <input disabled value={partner?.ref} style={inputStyle} id="outlined-basic" />
        </Box>
        <Box mt={2} mb={5} paddingRight={2} sx={{ width: '450px' }}>
          <TextField
            fullWidth
            variant="outlined"
            id="email"
            type="number"
            defaultValue={0}
            label="Nº de Acompanhantes"
            {...register('numberOfCompanions', { required: true })}
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
          {errors.numberOfCompanions && <span className="error-message">Campo obrigatório</span>}
        </Box>
        <Box mt={2} mb={5} paddingRight={2} sx={{ width: '450px' }}>
          <TextField
            fullWidth
            variant="outlined"
            id="email"
            type="number"
            defaultValue={0}
            label="Nº de Crianças"
            {...register('numberOfChildren', { required: true })}
          />
          {errors.numberOfChildren && <span className="error-message">Campo obrigatório</span>}
        </Box>
        <Box mt={2} mb={5} paddingRight={2} sx={{ width: '450px' }}>
          <TextField
            fullWidth
            variant="outlined"
            id="email"
            type="number"
            defaultValue={0}
            label="Nº de Adolescentes"
            {...register('numberOfTeenages', { required: true })}
          />
          {errors.numberOfTeenages && <span className="error-message">Campo obrigatório</span>}
        </Box>

        <Box marginTop={5}>
          <Button type="submit" variant="outlined">
            Registrar
          </Button>
          <Button
            onClick={() => {
              navigate(`/dashboard/search-partner?searchText=${params.get('searchText')}`);
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
                defaultValue={companionsData[index]?.phone}
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

export default EntryPartnerPage;
