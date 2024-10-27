import { Box, Button, Grid, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import api from 'api/axios';
import ForgotPasswordForm from 'components/sections/authentication/ForgotPasswordForm';
import { useState } from 'react';
import Table from 'components/sections/dashboard/transactions/Table';
import { useNavigate } from 'react-router-dom';
import StatisticsCards from 'components/sections/dashboard/statistics/StatisticCards';

const SearchPartnersPage = () => {
  const [partners, setPartners] = useState([]);
  const handleNavigateToEntryGuest = () => {
    navigate(`/dashboard/entry-guest`);
  };
  const navigate = useNavigate();

  const getData = async (data: string) => {
    const response = await api.get(`/partner/search-by-state/${data}?isActive=true`);
    if (response.status === 200) {
      setPartners(response.data);
    }
  };

  const handleNavigateToEntryPartner = (id: string) => {
    navigate(`/dashboard/entry-partner/${id}`);
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome' },
    { field: 'ref', headerName: 'Nº do Sócio' },
    {
      field: 'action',
      headerName: 'Ação',
      renderCell: (value) => {
        return (
          <Button
            onClick={() => {
              handleNavigateToEntryPartner(value.row.id);
            }}
          >
            Ver
          </Button>
        );
      },
    },
  ];
  return (
    <Box mt={5}>
      <Grid container spacing={1} justifyContent="center" alignItems="center" mb={10}>
        <StatisticsCards />
        <Grid item mt={8} xs={12} sm={9}>
          <Typography
            variant="h1"
            sx={{
              typography: {
                whiteSpace: 'wrap',
              },
            }}
          >
            Entrada de Sócio
          </Typography>

          <Typography variant="button" color="text.secondary">
            Insira o número do Sócio ou Nº de Bilhete para encontrar um sócio
          </Typography>

          <ForgotPasswordForm getData={getData} />
          <Button
            sx={{ marginBottom: 2, width: '100%', color: '#c2b067' }}
            onClick={handleNavigateToEntryGuest}
            variant="outlined"
          >
            Entrada de Não Sócio
          </Button>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Table
            showInputBar={false}
            title="Sócios Encontrados"
            data={partners}
            columns={columns}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchPartnersPage;
