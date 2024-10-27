import { Box, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import api from 'api/axios';
import Table from 'components/sections/dashboard/transactions/Table';
import { useEffect, useState } from 'react';

const EntrancesPage = () => {
  const [entrances, setEntrances] = useState([]);
  const getData = async () => {
    const response = await api.get(`/entrances?verified=true`);
    if (response.status === 200) {
      setEntrances(response.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome' },
    { field: 'numberOfCompanions', headerName: 'Nº de Acompanhates' },
    { field: 'numberOfChildren', headerName: 'Nº de Crianças' },
    { field: 'isPartner', headerName: 'Sócio?' },
    { field: 'createdAt', headerName: 'Data e Hora' },
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
        <Typography variant="h2">Entradas</Typography>
      </Box>
      <Table data={entrances} columns={columns} />
    </div>
  );
};

export default EntrancesPage;
