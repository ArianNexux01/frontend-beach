import { Box, Button, Typography, Switch as SwitchInput } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import api from 'api/axios';
import Table from 'components/sections/dashboard/transactions/Table';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const PartnersPage = () => {
  const navigate = useNavigate();
  const [partners, setPartners] = useState([]);
  const routeToGetPartners = '/dashboard/create-partners';
  const routeToUpdatePartners = '/dashboard/update-partners';
  const getData = async () => {
    const response = await api.get('/partner');
    if (response.status === 200) {
      setPartners(response.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const handleRedirectToForm: VoidFunction = () => {
    navigate(routeToGetPartners);
  };
  const handleChangeStatus = async (id: string) => {
    try {
      const response = await api.put(`/partner/change-status/${id}`);
      const message = 'Estado actualizado com sucesso!';

      if (response.status === 200) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: message,
          showConfirmButton: false,
          timer: 1500,
        });
        getData();
      }
    } catch (err) {
      if (err.status === 400) {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: err.response.data?.message[0] ?? err.response.data?.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name' },
    { field: 'email', headerName: 'E-mail' },
    { field: 'phone', headerName: 'Telefone' },
    { field: 'ref', headerName: 'Nº do Sócio' },
    {
      field: 'isActive',
      headerName: 'Estado',
      renderCell: (data) => {
        return (
          <>
            {' '}
            <SwitchInput
              onClick={() => {
                handleChangeStatus(data.row.id);
              }}
              checked={data.row.isActive}
              color="default"
            ></SwitchInput>{' '}
            <Box ml={1}>{data.row.isActive ? 'Activo' : 'Inactivo'}</Box>
          </>
        );
      },
    },
    {
      field: 'action',
      headerName: 'Ação',
      renderCell: (data) => {
        return (
          <Button
            onClick={() => {
              navigate(routeToUpdatePartners + `/${data.id}`);
            }}
          >
            Ver
          </Button>
        );
      },
    },
  ];
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          my: 4,
        }}
      >
        <Typography variant="h2">Sócios</Typography>
        <Button
          onClick={() => {
            handleRedirectToForm();
          }}
          sx={{ border: '0.5px solid grey', background: 'white' }}
        >
          Adicionar Socios
        </Button>
      </Box>
      <Table data={partners} columns={columns} />
    </div>
  );
};

export default PartnersPage;
