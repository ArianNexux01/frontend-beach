import { Box, Grid } from '@mui/material';
import PageHeader from 'components/common/PageHeader';
import StatisticsCards from 'components/sections/dashboard/statistics/StatisticCards';

const Dashboard = () => {
  return (
    <Box
      sx={{
        pb: 1,
      }}
    >
      <PageHeader>Dashboard</PageHeader>

      <Grid container spacing={3} mt={1} mb={3}>
        <Grid item xs={12} lg={12}>
          <StatisticsCards />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
