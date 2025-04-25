import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsUser = Loadable(lazy(() => import('views/utilities/user')));
const UtilsBrand = Loadable(lazy(() => import('views/utilities/brand')));
const UtilsProduct = Loadable(lazy(() => import('views/utilities/product')));

const UtilsCategory = Loadable(lazy(() => import('views/utilities/category')));
const UtilsContact = Loadable(lazy(() => import('views/utilities/contact')));
const UtilsOrder = Loadable(lazy(() => import('views/utilities/order')));
const UtilsAddress = Loadable(lazy(() => import('views/utilities/address')));
const UtilsOrderDetail = Loadable(lazy(() => import('views/utilities/orderDetail')));
const Utilsrole = Loadable(lazy(() => import('views/utilities/role')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'User',
      element: <UtilsUser />
    },
    {
      path: 'Brand',
      element: <UtilsBrand />
    },
    {
      path: 'Product',
      element: <UtilsProduct />
    },
    {
      path: 'Category',
      element: <UtilsCategory />
    },
    {
      path: 'Contact',
      element: <UtilsContact />
    },
    {
      path: 'Order',
      element: <UtilsOrder />
    },
    {
      path: 'Address',
      element: <UtilsAddress />
    },
    {
      path: 'OrderDetail',
      element: <UtilsOrderDetail />
    },
    {
      path: 'Role',
      element: <Utilsrole />
    },
    {
      path: '/sample-page',
      element: <SamplePage />
    }

  ]
};

export default MainRoutes;
