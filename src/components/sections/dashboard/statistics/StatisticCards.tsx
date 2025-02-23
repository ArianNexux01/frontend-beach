import { Grid, SvgIconProps } from '@mui/material';
import CustomersIcon from 'components/icons/menu-icons/CustomersIcon';
import PersonalSettingsIcon from 'components/icons/menu-icons/PersonalSettingsIcon';
import StatisticsCardItem from './StatisticsCardItem';
import React, { useEffect, useImperativeHandle, useState, Ref, forwardRef } from 'react';
import api from 'api/axios';

export interface IStatisticsCard {
  id: number;
  title: string;
  subtitle: string;
  roles: string[];
  icon: (props: SvgIconProps) => JSX.Element;
}
export interface ChildHandle {
  getData: () => Promise<unknown>;
}
const StatisticsCards = forwardRef<ChildHandle>((_props, ref: Ref<ChildHandle>) => {
  const [stats, setStats] = useState<IStatisticsCard[]>([]);
  const getData = async () => {
    const response = await api.get('/dashboard');
    setStats([
      /* {
      id: 0,
      icon: DollarIcon,
      title: response.data.countPartners ?? 0,
      subtitle: 'Sócios',
    },

    {
      id: 1,
      icon: CartIcon,
      title: response.data.countUsers ?? 0,
      subtitle: 'Usuários',
    },*/
      {
        id: 1,
        icon: PersonalSettingsIcon,
        title: response.data.entrancesDay[0].total ?? 0,
        subtitle: 'Entradas de Sócios - Dia',
        roles: ['ADMIN', 'OPERATOR', 'RECEPTIONIST'],
      },
      {
        id: 2,
        icon: CustomersIcon,
        title: response.data.entrancesGuestDay[0].total ?? 0,
        subtitle: 'Entrada de Não Sócios - Dia',
        roles: ['ADMIN', 'OPERATOR', 'RECEPTIONIST'],
      },
      {
        id: 3,
        icon: CustomersIcon,
        title: response.data.countCompaniosDay ?? 0,
        subtitle: 'Acompanhantes - Dia',
        roles: ['ADMIN', 'OPERATOR', 'RECEPTIONIST'],
      },
      {
        id: 4,
        icon: CustomersIcon,
        title: response.data.countChildrenDay ?? 0,
        subtitle: 'Crianças - Dia',
        roles: ['ADMIN', 'OPERATOR', 'RECEPTIONIST'],
      },
      {
        id: 4,
        icon: CustomersIcon,
        title: response.data.countTeenagesDay ?? 0,
        subtitle: 'Adolescentes - Dia',
        roles: ['ADMIN', 'OPERATOR', 'RECEPTIONIST'],
      },
      {
        id: 5,
        icon: CustomersIcon,
        title:
          Number(response.data.countTeenagesDay) +
          Number(response.data.countChildrenDay) +
          Number(response.data.entrancesDay[0].total) +
          Number(response.data.countCompaniosDay) +
          Number(response.data.entrancesGuestDay[0].total),
        subtitle: 'Total - Dia',
        roles: ['ADMIN', 'OPERATOR', 'RECEPTIONIST'],
      },
      {
        id: 13,
        icon: CustomersIcon,
        title: response.data.entrancesMonth[0].total ?? 0,
        subtitle: 'Entrada de sócios - Mês',
        roles: ['ADMIN'],
      },
      {
        id: 6,
        icon: CustomersIcon,
        title: response.data.entrancesGuestMonth[0].total ?? 0,
        subtitle: 'Entrada de Não sócios - Mês',
        roles: ['ADMIN'],
      },
      {
        id: 7,
        icon: CustomersIcon,
        title: response.data.countCompaniosMonth ?? 0,
        subtitle: 'Acompanhantes - Mês',
        roles: ['ADMIN'],
      },
      {
        id: 8,
        icon: CustomersIcon,
        title: response.data.countChildrenMonth ?? 0,
        subtitle: 'Crianças - Mês',
        roles: ['ADMIN'],
      },
      {
        id: 8,
        icon: CustomersIcon,
        title: response.data.countTeenagesMonth ?? 0,
        subtitle: 'Adolescentes - Mês',
        roles: ['ADMIN'],
      },
      {
        id: 13,
        icon: CustomersIcon,
        title:
          Number(response.data.countTeenagesMonth) +
          Number(response.data.countChildrenMonth) +
          Number(response.data.entrancesMonth[0].total) +
          Number(response.data.countCompaniosMonth) +
          Number(response.data.entrancesGuestMonth[0].total),
        subtitle: 'Total - Mês',
        roles: ['ADMIN'],
      },
      {
        id: 9,
        icon: CustomersIcon,
        title: response.data.entrancesYear[0].total ?? 0,
        subtitle: 'Entrada de sócios - Ano',
        roles: ['ADMIN'],
      },
      {
        id: 10,
        icon: CustomersIcon,
        title: response.data.entrancesGuestYear[0].total ?? 0,
        subtitle: 'Entrada de Não sócios - Ano',
        roles: ['ADMIN'],
      },
      {
        id: 11,
        icon: CustomersIcon,
        title: response.data.countCompaniosYear[0].total ?? 0,
        subtitle: 'Acompanhantes - Ano',
        roles: ['ADMIN'],
      },
      {
        id: 12,
        icon: CustomersIcon,
        title: response.data.countChildrenYear[0].total ?? 0,
        subtitle: 'Crianças - Ano',
        roles: ['ADMIN'],
      },
      {
        id: 12,
        icon: CustomersIcon,
        title: response.data.countTeenagesYear[0].total ?? 0,
        subtitle: 'Adolescentes - Ano',
        roles: ['ADMIN'],
      },
      {
        id: 13,
        icon: CustomersIcon,
        title:
          Number(response.data.countTeenagesYear[0].total) +
          Number(response.data.countChildrenYear[0].total) +
          Number(response.data.entrancesYear[0].total) +
          Number(response.data.countCompaniosYear[0].total) +
          Number(response.data.entrancesGuestYear[0].total),
        subtitle: 'Total - Ano',
        roles: ['ADMIN'],
      },
    ]);
  };

  useImperativeHandle(ref, () => ({
    getData,
  }));

  useEffect(() => {
    getData();
  }, []);
  return (
    <Grid container spacing={0.5}>
      {stats
        .filter((e: IStatisticsCard) => e.roles.includes(localStorage.getItem('role') ?? 'ADMIN'))
        .map((cardItem) => {
          return (
            <Grid item sx={{ width: '20%' }} key={cardItem.id}>
              <StatisticsCardItem
                cardData={cardItem}
                index={cardItem.id}
                totalCount={stats.length}
              />
            </Grid>
          );
        })}
    </Grid>
  );
});

export default StatisticsCards;
