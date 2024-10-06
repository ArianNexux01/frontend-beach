import { Box, Button, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import api from 'api/axios';
import Table from 'components/sections/dashboard/transactions/Table';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const getData = async () => {
    const response = await api.get('user');

    if (response.status === 200) {
      setUsers(response.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const navigate = useNavigate();
  const handleRedirectToForm: VoidFunction = () => {
    navigate('/dashboard/create-users');
  };
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome' },
    { field: 'username', headerName: 'Utilizador' },
    { field: 'phone', headerName: 'Telefone' },
    { field: 'role', headerName: 'Permissões' },
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
        <Typography variant="h2">Usuários</Typography>
        <Button
          onClick={() => {
            handleRedirectToForm();
          }}
          sx={{ border: '0.5px solid grey', background: 'white' }}
        >
          Adicionar Usuários
        </Button>
      </Box>
      <Table data={users} columns={columns} />
    </div>
  );
};

export default UsersPage;
