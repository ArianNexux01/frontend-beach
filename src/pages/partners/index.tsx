import { Box, Button, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import api from 'api/axios';
import Table from 'components/sections/dashboard/transactions/Table';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name' },
    { field: 'email', headerName: 'E-mail' },
    { field: 'phone', headerName: 'Telefone' },
    { field: 'ref', headerName: 'Nº do Sócio' },
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
