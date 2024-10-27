import { Box, Button, Switch as SwitchInput, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import api from 'api/axios';
import Table from 'components/sections/dashboard/transactions/Table';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UsersPage = () => {
  const routeToUpdateUsers = '/dashboard/update-users';

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
  const handleChangeStatus = async (id: string) => {
    try {
      const response = await api.put(`/user/change-status/${id}`);
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
  const navigate = useNavigate();
  const handleRedirectToForm: VoidFunction = () => {
    navigate('/dashboard/create-users');
  };
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome' },
    { field: 'username', headerName: 'Utilizador' },
    { field: 'phone', headerName: 'Telefone' },
    { field: 'role', headerName: 'Permissões' },
    {
      field: 'isActive',
      headerName: 'Estado',
      renderCell: (data) => {
        return (
          <>
            {' '}
            <SwitchInput
              disabled={data.row.role === 'ADMIN'}
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
              navigate(routeToUpdateUsers + `/${data.id}`);
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
