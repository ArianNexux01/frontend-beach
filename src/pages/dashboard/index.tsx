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

      <Grid item xs={12} lg={8}>
        <StatisticsCards />
      </Grid>
    </Box>
  );
};

export default Dashboard;
