import PageLoader from 'components/loading/PageLoader';
import Splash from 'components/loading/Splash';
import AuthLayout from 'layouts/auth-layout';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import paths, { rootPaths } from './path';
import Protected from './protected';
import ReceptionPage from 'pages/reception';
/* ---------------- Lazy loads various components ------------------------- */
const App = lazy(() => import('App'));
const MainLayout = lazy(() => import('layouts/main-layout'));
const LoginPage = lazy(() => import('pages/authentication/login'));
const EntrancesPage = lazy(() => import('pages/entrances'));
const CustomersPage = lazy(() => import('pages/users'));
const OrdersPage = lazy(() => import('pages/partners'));
const Account = lazy(() => import('pages/account'));
const SignUpPage = lazy(() => import('pages/authentication/register'));
const SearchPartnersPage = lazy(() => import('pages/authentication/search-partner'));
const PasswordResetPage = lazy(() => import('pages/authentication/reset-password'));
const CreatePartnersPage = lazy(() => import('pages/partners/create-partner'));
const CreateUsersPage = lazy(() => import('pages/users/create-users'));
const Dashboard = lazy(() => import('pages/dashboard/index'));
const EntryPartner = lazy(() => import('pages/authentication/search-partner/entry-partner'));
const EntryGuest = lazy(() => import('pages/authentication/search-partner/entry-guest'));
const NotFoundPage = lazy(() => import('pages/not-found'));
/* -------------------------------------------------------------------------- */

/**
 * @Defines the routes for the application using React Router.
 */
export const routes = [
  {
    element: (
      <Suspense fallback={<Splash />}>
        <App />
      </Suspense>
    ),
    children: [
      {
        path: paths.dashboard,
        element: (
          <Suspense fallback={<PageLoader />}>
            <MainLayout />
          </Suspense>
        ),
        children: [
          {
            index: true,
            path: paths.dashboard,
            element: (
              <Protected allAvailable={true}>
                <Dashboard />
              </Protected>
            ),
          },
          {
            path: paths.partners,
            element: (
              <Protected>
                <OrdersPage />
              </Protected>
            ),
          },
          {
            path: paths.entrances,
            element: (
              <Protected>
                <EntrancesPage />
              </Protected>
            ),
          },
          {
            path: paths.reception,
            element: (
              <Protected allAvailable={true}>
                <ReceptionPage />
              </Protected>
            ),
          },
          {
            path: paths.createPartners,
            element: (
              <Protected>
                <CreatePartnersPage />
              </Protected>
            ),
          },
          {
            path: paths.updatePartners,
            element: (
              <Protected>
                <CreatePartnersPage />
              </Protected>
            ),
          },
          {
            path: paths.createUsers,
            element: (
              <Protected>
                <CreateUsersPage />
              </Protected>
            ),
          },
          {
            path: paths.users,
            element: (
              <Protected>
                <CustomersPage />
              </Protected>
            ),
          },
          {
            path: paths.account,
            element: (
              <Protected allAvailable={true}>
                <Account />
              </Protected>
            ),
          },
          {
            path: paths.entryPartner,
            element: (
              <Protected allAvailable={true}>
                <EntryPartner />
              </Protected>
            ),
          },
          {
            path: paths.entryGuest,
            element: (
              <Protected allAvailable={true}>
                <EntryGuest />
              </Protected>
            ),
          },
          {
            path: paths.searchPartner,
            element: <SearchPartnersPage />,
          },
        ],
      },
      {
        path: paths.default,
        element: <AuthLayout />,
        children: [
          {
            index: true,
            path: paths.login,
            element: <LoginPage />,
          },
          {
            path: paths.signup,
            element: <SignUpPage />,
          },

          {
            path: paths.resetPassword,
            element: <PasswordResetPage />,
          },
        ],
      },
      {
        path: rootPaths.errorRoot,
        children: [
          {
            path: paths.notFound,
            element: <NotFoundPage />,
          },
        ],
      },
      {
        path: '*',
        element: <Navigate to={paths.notFound} replace />,
      },
    ],
  },
];

const router = createBrowserRouter(routes, {
  basename: '/',
});

export default router;
