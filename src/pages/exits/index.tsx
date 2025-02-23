import { Box, Button, Typography } from '@mui/material';
import { GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid';
import api from 'api/axios';
import Table from 'components/sections/dashboard/transactions/MainTable';
import { EntrancesItem } from 'interfaces/EntrancesItem';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
const ExitPage = () => {
  const [entrances, setEntrances] = useState<EntrancesItem[]>([]);
  const getData = async () => {
    const response = await api.get(`/companions/reports`);
    if (response.status === 200) {
      const newData: EntrancesItem[] = [];
      response.data.map((data: EntrancesItem) => {
        newData.push({
          id: data.entranceId ?? '0',
          name: data.name,
          ref: data.ref,
          bracelet: data.bracelet,
          isPartner: data.isPartner,
          isOut: data.isOut,
          entranceId: data.entranceId,
          createdAt: data.createdAt,
        });
        data.companions?.forEach((companion: EntrancesItem) => {
          newData.push({
            id: companion.id ?? '0',
            name: companion.name,
            ref: '',
            bracelet: companion.bracelet,
            isOut: companion.isOut,
            isPartner: 'Convidado',
            createdAt: data.createdAt,
          });
        });
      });
      setEntrances(newData);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const handleRegisterExit = async (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>,
  ) => {
    try {
      let response;

      if (data.row.isPartner === 'Convidado') {
        response = await api.put(`/companions/exit/${data.row.id}`);
      } else {
        response = await api.put(`/entrances/exit/${data.row.entranceId}`);
      }
      if (response.status === 200) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Saída registada com sucesso',
          showConfirmButton: false,
          timer: 5500,
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
          timer: 5500,
        });
      }
    }
  };
  const columns: GridColDef[] = [
    { field: 'ref', headerName: 'Nº do Sócio' },
    { field: 'name', headerName: 'Nome' },
    { field: 'bracelet', headerName: 'Pulseira' },
    { field: 'isPartner', headerName: 'Tipo' },
    { field: 'createdAt', headerName: 'Data e Hora' },
    {
      field: 'action',
      headerName: 'Registrar',
      renderCell: (data) => {
        return (
          <Button
            disabled={data.row.isOut}
            onClick={() => {
              handleRegisterExit(data);
            }}
            sx={{ opacity: data.row.isOut ? '0.5' : '1' }}
          >
            Sair
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
        <Typography variant="h2">Registar saídas</Typography>
      </Box>
      <Table data={entrances} columns={columns} />
    </div>
  );
};

export default ExitPage;
