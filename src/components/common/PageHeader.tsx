import { Box, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface PageHeaderProps {
  children: ReactNode;
}

const PageHeader = ({ children }: PageHeaderProps) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        pt: 1,
      }}
    >
      <Typography variant="h2">{children}</Typography>
      <Box flexGrow={1} />
    </Stack>
  );
};

export default PageHeader;
