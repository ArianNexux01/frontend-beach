import { Box, Button, Link, Stack, TextField } from '@mui/material';
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
      <Stack spacing={3}>
        <TextField
          fullWidth
          variant="outlined"
          id="email"
          type="Email"
          label="Nº do Sócio, Telefone ou E-mail"
          onChange={(e) => {
            setValueSearch(e.target.value);
          }}
        />
      </Stack>
      <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        component={Link}
        href="#!"
        onClick={() => {
          getData(valueSearch);
        }}
        sx={{ mt: 3, backgroundColor: '#c2b067' }}
      >
        Pesquisar
      </Button>
      <Stack
        sx={{
          textAlign: 'center',
          color: 'text.secondary',
          my: 3,
        }}
      />

      <Stack
        spacing={1.5}
        sx={{
          mt: 4,
        }}
      ></Stack>
    </Box>
  );
};

export default ForgotPasswordForm;
