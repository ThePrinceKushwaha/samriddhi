import { lazy } from 'react';
import ProductHistory from '../pages/ProductHistory';
import SalesHistory from '../pages/SalesHistory';
import SalesHistoryTable from '../components/SalesHistoryTable';
import SalesForm from '../pages/Form/SalesForm';
import ContactForm from '../pages/Form/ContactForm';

const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Tables = lazy(() => import('../pages/Tables'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));

const coreRoutes = [
  {
    path: '/calendar',
    title: 'Calender',
    component: Calendar,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/forms/sales-form',
    title: 'Sales Form',
    component: SalesForm ,
  }
  ,
  {
    path: '/forms/form-elements',
    title: 'Forms Elements',
    component: FormElements,
  },
  {
    path: '/forms/contact-form',
    title: 'Contact Form',
    component: ContactForm,
  },
  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path:'/productHistory',
    title: 'Product History',
    component: ProductHistory,
  },
  {
    path:'/salesHistory',
    title: 'Sales History',
    component: SalesHistory,
  },

  {
    path:"/salesHistoryTable",
    title: "Sales History Table",
    component: SalesHistoryTable,
  }
  ,
  {
    path: '/tables',
    title: 'Tables',
    component: Tables,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
];

const routes = [...coreRoutes];
export default routes;
