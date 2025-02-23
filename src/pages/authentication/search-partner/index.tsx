import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import api from 'api/axios';
import { useEffect, useState } from 'react';
import Table from 'components/sections/dashboard/transactions/MainTable';
import { useNavigate } from 'react-router-dom';
import StatisticsCards from 'components/sections/dashboard/statistics/StatisticCards';

const SearchPartnersPage = () => {
  const [partners, setPartners] = useState([]);
  const [valueSearch, setValueSearch] = useState('');

  const handleNavigateToEntryGuest = () => {
    navigate(`/dashboard/entry-guest`);
  };
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const getData = async (data: string) => {
    setSearchText(data);
    const response = await api.get(`/partner/search-by-state/${data}?isActive=true`);
    if (response.status === 200) {
      setPartners(response.data);
    }
  };
  useEffect(() => {
    if (params?.get('searchText') !== null) {
      setValueSearch(params.get('searchText') ?? '');
      getData(params.get('searchText') ?? '');
    }
  }, []);
  const handleNavigateToEntryPartner = (id: string) => {
    navigate(`/dashboard/entry-partner/${id}?searchText=${searchText}`);
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
      <Grid container spacing={1} justifyContent="center" alignItems="center">
        <StatisticsCards />
        <Grid item mt={2} xs={12} sm={9}>
          <Typography
            variant="h1"
            sx={{
              typography: {
                whiteSpace: 'wrap',
              },
            }}
          >
            Entrada
          </Typography>

          <Box
            sx={{
              mt: 1,
            }}
          >
            <Box
              sx={{ display: 'flex', alignItems: 'flex-end', margin: '10px 0 20px 0' }}
              flexDirection={'row'}
            >
              <TextField
                fullWidth
                variant="outlined"
                id="email"
                type="Email"
                defaultValue={params.get('searchText') ?? ''}
                label="Nº do Sócio, Telefone ou E-mail"
                onChange={(e) => {
                  setValueSearch(e.target.value);
                }}
              />
              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: '#c2b067',
                  color: '#FFF',
                  marginBottom: '0px !important',
                }}
                onClick={() => {
                  getData(valueSearch);
                }}
              >
                Pesquisar
              </Button>
            </Box>
            <Table
              showInputBar={false}
              title="Sócios Encontrados"
              data={partners}
              columns={columns}
            />
            <Button
              onClick={handleNavigateToEntryGuest}
              variant="outlined"
              sx={{ width: '100%', margin: '35px 0 0 0 !important' }}
            >
              Entrada de Não Sócio
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchPartnersPage;
