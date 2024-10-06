export type Columns = {
  field: string;
  headerName: string;
  width?: number;
  renderCell?: (params: Params) => unknown;
};
type Params = {
  value: string;
};
