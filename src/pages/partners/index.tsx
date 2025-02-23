import { useState, useEffect, ChangeEvent } from 'react';

import { Box, Button, Typography, Switch as SwitchInput, Stack } from '@mui/material';
import { DataGrid, GridColDef, GridPaginationModel, useGridApiRef } from '@mui/x-data-grid';
import api from 'api/axios';
import CustomDataGridFooter from 'components/common/table/CustomDataGridFooter';
import CustomDataGridHeader from 'components/common/table/CustomDataGridHeader';
import CustomDataGridNoRows from 'components/common/table/CustomDataGridNoRows';
import { useNavigate } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import Swal from 'sweetalert2';
import { environment } from 'config/environment';

const PartnersPage = () => {
  const [searchText, setSearchText] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const apiRef = useGridApiRef<any>();
  const [data, setData] = useState({
    totalItems: 0,
    numberPages: 0,
  });
  const handlePageChange = (model: GridPaginationModel) => {
    console.log(model.page);
    callbackUseEffect(model.page + 1, 5, searchText);
  };

  const handleDeletePartner = async (id: number) => {
    try {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'De certeza que pretente realmente eliminar este socio?',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Cancelar',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await api.delete(`/partner/${id}`);

          if (response.status === 200) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Sócio eliminado com sucesso',
              showConfirmButton: false,
              timer: 5500,
            });
            callbackUseEffect();
          }
        } else if (result.isDenied) {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Eliminação cancelada',
            showConfirmButton: false,
            timer: 5500,
          });
        }
      });
    } catch (err) {
      if (err.status === 400) {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: err.response.data?.message[0] ?? err.response.data?.message,
          showConfirmButton: false,
          timer: 5500,
        });
      } else {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Eliminação cancelada',
          showConfirmButton: false,
          timer: 5500,
        });
      }
    }
  };

  const callbackUseEffect = async (page: number = 1, limit: number = 5, query: string = '') => {
    const data = await getData(page, limit, query);
    apiRef.current.setRows(data.data);
    apiRef.current.setRowCount(data.totalItems);
  };
  useEffect(() => {
    callbackUseEffect();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.currentTarget.value;
    setSearchText(searchValue);
    callbackUseEffect(1, 5, searchValue);
  };

  const navigate = useNavigate();
  const routeToGetPartners = '/dashboard/create-partners';
  const routeToUpdatePartners = '/dashboard/update-partners';
  const getData = async (page: number = 1, limit: number = 5, query: string = '') => {
    const response = await api.get(`/partner?limit=${limit}&page=${page}&query=${query}`);
    if (response.status === 200) {
      setData({ totalItems: response.data.totalItems, numberPages: response.data.numberOfPages });
      return response.data;
    }
  };

  const handleExportsPartners = async () => {
    window.location.href = environment.baseURL + `/export-excel/partners/`;
  };

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
          <>
            <Button
              onClick={() => {
                navigate(routeToUpdatePartners + `/${data.row.id}`);
              }}
            >
              Ver
            </Button>
            <Button
              onClick={() => {
                handleDeletePartner(data.row.id);
              }}
            >
              Eliminar
            </Button>
          </>
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
        <Typography variant="h2">Sócios</Typography>´
        <Box>
          <Button
            onClick={() => {
              handleExportsPartners();
            }}
            sx={{ border: '0.5px solid grey', background: 'white' }}
          >
            Exportar Sócios
          </Button>
          <Button
            onClick={() => {
              handleRedirectToForm();
            }}
            sx={{ border: '0.5px solid grey', background: 'white' }}
          >
            Adicionar Socios
          </Button>
        </Box>
      </Box>
      <Stack
        sx={{
          overflow: 'auto',
          // minHeight: 0,
          position: 'relative',
          height: { xs: 'auto', sm: 1 },
          width: 1,
        }}
      >
        <SimpleBar>
          <DataGrid
            autoHeight={false} // Disable auto height adjustment
            scrollbarSize={15}
            rowHeight={52}
            columns={columns}
            loading={false}
            apiRef={apiRef}
            rowCount={data.totalItems}
            onResize={() => {
              apiRef.current.autosizeColumns({
                includeOutliers: false,
                expand: false,
              });
            }}
            hideFooterSelectedRowCount
            disableColumnResize
            disableColumnMenu
            paginationMode="server"
            autoPageSize={false}
            disableColumnSelector
            disableRowSelectionOnClick
            rowSelection={false}
            onPaginationModelChange={handlePageChange} // Updates page state
            slots={{
              pagination: CustomDataGridFooter,
              toolbar: CustomDataGridHeader,
              noResultsOverlay: CustomDataGridNoRows,
            }}
            slotProps={{
              toolbar: {
                title: 'Tabelas de Sócios',
                flag: 'Pesquisar por nome, telefone e numero de socio',
                onChange: handleChange,
                clearSearch: () => setSearchText(''),
              },
              pagination: { labelRowsPerPage: data.totalItems },
            }}
            initialState={{ pagination: { paginationModel: { page: 1, pageSize: 5 } } }}
            pageSizeOptions={[5, 10, 25]}
            sx={{
              boxShadow: 1,
              px: 3,
              borderColor: 'active.selected',
              height: 1,
              width: 1,
              tableLayout: 'fixed',
            }}
          />
        </SimpleBar>
      </Stack>{' '}
    </div>
  );
};

export default PartnersPage;
