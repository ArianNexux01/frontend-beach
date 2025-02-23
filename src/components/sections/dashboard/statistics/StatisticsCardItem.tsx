import { Box, Card, Grid, Typography } from '@mui/material';
import { useBreakpoints } from 'providers/useBreakPoint';
import { IStatisticsCard } from './StatisticCards';

interface StatisticsCardProps {
  cardData: IStatisticsCard;
  index: number;
  totalCount?: number;
}

const StatisticsCardItem = ({ cardData, index }: StatisticsCardProps) => {
  const { title, subtitle } = cardData || {};
  const { up } = useBreakpoints();
  const upXl = up('sm');
  const upSm = up('sm');
  const upXs = up('sm');
  return (
    <>
      <Card
        sx={{
          borderRadius: 4,
          ...(upXs && {
            borderTopLeftRadius: index === 0 ? 8 : 0,
            borderTopRightRadius: index === 0 ? 8 : 0,
            borderBottomLeftRadius: index === 5 ? 8 : 0,
            borderBottomRightRadius: index === 5 ? 8 : 0,
          }),
          ...(upSm && {
            borderTopLeftRadius: index === 0 ? 8 : 0,
            borderBottomLeftRadius: index === 2 ? 8 : 0,
            borderTopRightRadius: index === 1 ? 8 : 0,
            borderBottomRightRadius: index === 3 ? 8 : 0,
          }),
          ...(upXl && {
            borderTopLeftRadius: index === 0 ? 8 : 0,
            borderBottomLeftRadius: index === 0 ? 8 : 0,
            borderTopRightRadius: index === 3 ? 8 : 0,
            borderBottomRightRadius: index === 3 ? 8 : 0,
          }),
        }}
      >
        <Box
          sx={{
            p: 5,
            flexGrow: 3,
            height: '150px',
          }}
        >
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs={8}>
              <Box ml={0} lineHeight={1}>
                <Typography variant="h1" textTransform="uppercase" color="text.primary">
                  {parseFloat(title)}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" mb={1}>
                  {subtitle}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
};

export default StatisticsCardItem;
