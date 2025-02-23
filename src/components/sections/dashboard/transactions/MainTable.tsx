import { LinearProgress, Stack } from '@mui/material';
import { DataGrid, GridColDef, GridSlots, useGridApiRef } from '@mui/x-data-grid';
import { ChangeEvent, useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';

import CustomDataGridFooter from 'components/common/table/CustomDataGridFooter';
import CustomDataGridHeader from 'components/common/table/CustomDataGridHeader';
import CustomDataGridNoRows from 'components/common/table/CustomDataGridNoRows';

/*eslint-disable */

type Props = {
  columns: GridColDef[];
  data: any[];
  title?: string;
  showInputBar?: boolean;
  numberOfPages?: number;
};

const MainTable: React.FC<Props> = ({
  columns,
  data,
  showInputBar = true,
  title = 'Lista',
  numberOfPages = 1,
}) => {
  const [searchText, setSearchText] = useState('');
  const apiRef = useGridApiRef<any>();

  useEffect(() => {
    apiRef.current.setRows(data);
  });

  useEffect(() => {
    apiRef.current.setQuickFilterValues([searchText]);
  }, [searchText, apiRef]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.currentTarget.value;
    setSearchText(searchValue);
    if (searchValue === '') {
      apiRef.current.setRows(data);
    }
  };

  return (
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
          autoHeight={false}
          rowHeight={52}
          columns={columns}
          loading={false}
          apiRef={apiRef}
          onResize={() => {
            apiRef.current.autosizeColumns({
              includeOutliers: true,
              expand: true,
            });
          }}
          onCellClick={(data) => {
            console.log('Ola cell clicked: ', data);
          }}
          hideFooterSelectedRowCount
          disableColumnResize
          disableColumnMenu
          disableColumnSelector
          disableRowSelectionOnClick
          rowSelection={false}
          slots={{
            loadingOverlay: LinearProgress as GridSlots['loadingOverlay'],
            pagination: CustomDataGridFooter,
            toolbar: showInputBar ? CustomDataGridHeader : undefined,
            noResultsOverlay: CustomDataGridNoRows,
          }}
          slotProps={{
            toolbar: {
              title,
              flag: 'user',
              value: searchText,
              onChange: handleChange,
              clearSearch: () => setSearchText(''),
            },
            pagination: { labelRowsPerPage: numberOfPages },
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
    </Stack>
  );
};

export default MainTable;
