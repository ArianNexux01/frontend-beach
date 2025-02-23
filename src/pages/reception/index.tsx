import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import api from 'api/axios';
import Table from 'components/sections/dashboard/transactions/MainTable';
import { useEffect, useRef, useState } from 'react';
import { StyledBackdrop, ModalContent, Modal } from 'components/modal';
import Swal from 'sweetalert2';
import StatisticsCards from 'components/sections/dashboard/statistics/StatisticCards';
import PdfGenerator from 'helpers/pdf-generator';
import 'index.css';
type Companions = {
  id: string;
  name: string;
  phone: string;
  bracelet: string;
  isPartner: boolean;
  isOwn: boolean;
};

export interface ChildHandle {
  getData: () => Promise<unknown>;
}
const ReceptionPage = () => {
  const [entrances, setEntrances] = useState([]);
  const [, setBracelet] = useState('');

  const [companions, setCompanions] = useState<Companions[]>([
    {
      id: '',
      name: '',
      phone: '',
      bracelet: '',
      isPartner: false,
      isOwn: false,
    },
  ]);
  const [open, setOpen] = useState(false);
  const [entranceId, setEntranceId] = useState('');
  const [braceletData, setBraceletData] = useState<{ name: string; id: string }[]>([
    {
      id: '',
      name: '',
    },
  ]);
  const dashboardReference = useRef<ChildHandle>(null);
  const handleClose = () => setOpen(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const getData = async () => {
    const response = await api.get('/entrances?verified=false&onlyToday=true');
    const responseBracelet = await api.get('/bracelet');
    if (response.status === 200) {
      setEntrances(response.data);
      setBraceletData(responseBracelet.data);
      fetchStatisticsData();
    }
  };

  const fetchStatisticsData = () => {
    if (dashboardReference.current) {
      dashboardReference.current.getData();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleGetCompanionsById = async (data: any) => {
    const response = await api.get(`/companions/entrance/${data.row.id}`);
    if (response.status === 200) {
      console.log(data.row);
      setCompanions([
        {
          id: data.row.guestId ?? data.row.partnerId,
          name: data.row.name,
          phone: data.row.phone,
          isPartner: data.row.guestId === null,
          isOwn: true,
        },
        ...response.data,
      ]);
    }

    handleOpen();
  };

  const handleUpdateBracelet = async () => {
    if (
      companions.filter(
        (companion) => companion?.bracelet === null || companion?.bracelet === undefined,
      ).length > 0
    ) {
      Swal.fire({
        position: 'top-right',
        icon: 'warning',
        title: 'Dados incompletos, Não é possível entrada no recinto sem especificar a pulseira',
        showConfirmButton: false,
        timer: 5500,
      });
      return;
    }
    const response = await api.put(`/companions/bracelet/${entranceId}`, companions);

    if (response.status === 200) {
      getData();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Pulseiras registradas com sucesso',
        showConfirmButton: false,
        timer: 5500,
      });
      setOpen(false);
    }
  };
  const handleChangeWatch = (event: SelectChangeEvent, data: Companions) => {
    setBracelet(event.target.value as string);
    const companionsData = companions;
    const companionsFoundIndex = companions.findIndex((c) => c.id === data.id);

    companionsData[companionsFoundIndex] = {
      ...companionsData[companionsFoundIndex],
      bracelet: event.target.value as string,
    };
    setCompanions(companionsData);
  };
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome' },
    { field: 'numberOfCompanions', headerName: 'Nº de Acompanhantes' },
    { field: 'numberOfChildren', headerName: 'Número de Crianças' },
    { field: 'numberOfTeenages', headerName: 'Número de Adolescentes' },
    {
      field: 'isPartner',
      headerName: 'Sócio',
      renderCell: (data) => {
        return <span>{data.row.partnerId === null ? 'Não' : 'Sim'}</span>;
      },
    },
    {
      field: 'action',
      headerName: 'Registrar',
      renderCell: (data) => {
        return (
          <Button
            onClick={() => {
              setEntranceId(data.row.id);
              handleGetCompanionsById(data);
            }}
          >
            Ver
          </Button>
        );
      },
    },
  ];
  return (
    <>
      <div>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            my: 4,
          }}
        >
          <Typography variant="h2">Recepção</Typography>
        </Box>
        <Box mb={4}>
          <StatisticsCards ref={dashboardReference} />
        </Box>
        <PdfGenerator />
        <Table data={entrances} columns={columns} />
      </div>

      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent>
          <h2 id="unstyled-modal-title" className="modal-title">
            Registrar Pulseira
          </h2>
          {companions.map((e: Companions, index: number) => (
            <Box key={index} mt={2} mb={2} sx={{ width: '450px' }}>
              {e.isOwn ? <h3>Host</h3> : <h3>Acompanhante {index}</h3>}
              <TextField
                sx={{
                  marginTop: '10px',
                  color: 'black',
                  '& .MuiInputBase-input.Mui-disabled': {
                    color: 'black !important',
                  },
                  '& .MuiInputLabel-root.Mui-disabled': {
                    color: 'black !important',
                  },
                }}
                fullWidth
                variant="outlined"
                id="email"
                type="text"
                label="Nome"
                value={e.name}
              />
              <InputLabel id="demo-simple-select-label">Pulseira</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={companions[0].bracelet ?? ''}
                label="Pulseira"
                fullWidth
                sx={{ height: '40px' }}
                onChange={(event: SelectChangeEvent) => {
                  handleChangeWatch(event, e);
                }}
              >
                {braceletData.map((data: { name: string }) => (
                  <MenuItem key={index} value={data.name}>
                    {data.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          ))}
          <Box marginTop={5} sx={{ width: '450px' }}>
            <Button onClick={handleUpdateBracelet} variant="outlined">
              Registrar
            </Button>
            <Button onClick={() => setOpen(false)} style={{ marginLeft: 5 }} variant="outlined">
              Cancelar
            </Button>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReceptionPage;
