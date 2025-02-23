import { Box, Button, Grid, Stack, TextField } from '@mui/material';
import { useState } from 'react';

interface Props {
  getData(data: string): void;
}
const ForgotPasswordForm = ({ getData }: Props) => {
  const [valueSearch, setValueSearch] = useState('');
  return (
    <Box
      sx={{
        mt: { sm: 5, xs: 2.5 },
      }}
    >
      <Grid spacing={3} flexDirection={'row'}>
        <TextField
          variant="outlined"
          id="email"
          type="Email"
          label="Nº do Sócio, Telefone ou E-mail"
          onChange={(e) => {
            setValueSearch(e.target.value);
          }}
        />
        <Button
          variant="contained"
          size="large"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            mt: 3,
            backgroundColor: '#c2b067',
            color: '#FFF',
          }}
          onClick={() => {
            getData(valueSearch);
          }}
        >
          Pesquisar
        </Button>
      </Grid>
      <Stack
        sx={{
          textAlign: 'center',
          color: 'text.secondary',
          my: 3,
        }}
      />
    </Box>
  );
};

export default ForgotPasswordForm;
