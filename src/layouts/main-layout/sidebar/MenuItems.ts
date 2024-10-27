/* eslint-disable @typescript-eslint/no-explicit-any */
import { SvgIconProps } from '@mui/material';
import CustomersIcon from 'components/icons/menu-icons/CustomersIcon';
import HomeIcon from 'components/icons/menu-icons/HomeIcon';
import InboxIcon from 'components/icons/menu-icons/InboxIcon';
import OrderIcon from 'components/icons/menu-icons/OrderIcon';
import SignInIcon from 'components/icons/menu-icons/SignInIcon';

import { uniqueId } from 'lodash';
import paths from 'routes/path';

export interface IMenuitems {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: (props: SvgIconProps) => JSX.Element;
  href?: string;
  children?: IMenuitems[];
  chip?: string;
  chipColor?: string | any;
  variant?: string | any;
  available?: boolean;
  level?: number;
  onClick?: React.MouseEvent<HTMLButtonElement, MouseEvent>;
}

const Menuitems: IMenuitems[] = [
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: HomeIcon,
    href: '/dashboard',
    available: true,
    roles: ['ADMIN'],
  },
  {
    id: uniqueId(),
    title: 'Sócios',
    icon: OrderIcon,
    href: `${paths.partners}`,
    chip: '16',
    chipColor: 'secondary',
    available: true,
    roles: ['ADMIN'],
  },
  {
    id: uniqueId(),
    title: 'Usuários',
    icon: CustomersIcon,
    href: `${paths.users}`,
    available: true,
    roles: ['ADMIN'],
  },
  {
    id: uniqueId(),
    title: 'Pulseiras',
    icon: InboxIcon,
    href: `${paths.bracelet}`,
    available: true,
    roles: ['ADMIN'],
  },
  {
    id: uniqueId(),
    title: 'Entradas',
    icon: SignInIcon,
    href: `${paths.entrances}`,
    available: true,
    roles: ['ADMIN'],
  },
  {
    id: uniqueId(),
    title: 'Registar Entrada',
    icon: SignInIcon,
    href: `${paths.searchPartner}`,
    available: true,
    roles: [],
  },
  {
    id: uniqueId(),
    title: 'Recepção',
    icon: SignInIcon,
    href: `${paths.reception}`,
    available: true,
    roles: [],
  },
  /* {
     navlabel: true,
     subheader: 'Authentication',
   },
   {
     id: uniqueId(),
     title: 'Sign Up',
     icon: SignUpIcon,
     href: '/authentication/sign-up',
     available: true,
   },
   {
     id: uniqueId(),
     title: 'Sign In',
     icon: SignInIcon,
     href: '/authentication/login',
     available: true,
   },
   {
     id: uniqueId(),
     title: 'Forgot Password',
     icon: ForgotPasswordIcon,
     href: '/authentication/forgot-password',
     available: true,
   },
   {
     id: uniqueId(),
     title: 'Reset Password',
     icon: ResetPasswordIcon,
     href: '/authentication/reset-password',
     available: true,
   },
 
   {
     navlabel: true,
     subheader: 'Settings',
   },
   {
     id: uniqueId(),
     title: 'Personal Settings',
     icon: PersonalSettingsIcon,
     href: '/settings/#!',
     available: false,
   },
   {
     id: uniqueId(),
     title: 'Global Settings',
     icon: GlobalSettingsIcon,
     href: '/settings/#!',
     available: false,
   },*/
];

export default Menuitems;
