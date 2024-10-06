export const rootPaths = {
  root: '/',
  pagesRoot: '/dashboard',
  authRoot: '/authentication',
  errorRoot: '/error',
};

const paths = {
  default: `${rootPaths.root}`,
  dashboard: `${rootPaths.root}dashboard`,
  account: `account`,
  entrances: `entrances`,
  partners: `partners`,
  createPartners: `create-partners`,
  updatePartners: `update-partners/:id`,
  entryPartner: `entry-partner/:id`,
  entryGuest: `entry-guest`,
  createUsers: `create-users`,
  reception: 'reception',
  users: `users`,
  searchPartner: `search-partner`,
  login: `login`,
  signup: `/sign-up`,
  resetPassword: `/reset-password`,
  notFound: `${rootPaths.errorRoot}/404`,
};

export default paths;