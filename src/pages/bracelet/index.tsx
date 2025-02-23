import { Box, Button, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import api from 'api/axios';
import Table from 'components/sections/dashboard/transactions/MainTable';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const BraceletPage = () => {
  const [bracelets, setBracelets] = useState([]);
  const getData = async () => {
    const response = await api.get('bracelet');

    if (response.status === 200) {
      setBracelets(response.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const handleDeleteBracelet = async (id: string) => {
    try {
      const response = await api.delete(`/bracelet/${id}`);
      console.log('ola mundo');
      if (response.status === 200) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Pulseira eliminada com sucesso!',
          showConfirmButton: false,
          timer: 5500,
        });

        await getData();
      }
    } catch (err) {
      if (err.status === 400) {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: err.response.data?.message.message,
          showConfirmButton: false,
          timer: 5500,
        });
      }
    }
  };
  const navigate = useNavigate();
  const handleRedirectToForm: VoidFunction = () => {
    navigate('/dashboard/create-bracelet');
  };
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Cor' },
    {
      field: 'action',
      headerName: 'Ação',
      renderCell: (data) => {
        return (
          <Button
            onClick={() => {
              handleDeleteBracelet(data.row.id);
            }}
          >
            Apagar
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
        <Typography variant="h2">Pulseiras</Typography>
        <Button
          onClick={() => {
            handleRedirectToForm();
          }}
          sx={{ border: '0.5px solid grey', background: 'white' }}
        >
          Adicionar Pulseira
        </Button>
      </Box>
      <Table data={bracelets} columns={columns} />
    </div>
  );
};

export default BraceletPage;
