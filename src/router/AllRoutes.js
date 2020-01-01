import Home from '@/views/HomeView';
// Demos
import AllUI from '@/views/demo/AllUI';
import StoreDemo from '@/views/demo/StoreDemo';
import LocalDBDemo from '@/views/demo/DbStoreDemo';
import LayoutDemo from '@/views/demo/LayoutDemo';

import DebugView from '@/views/DebugView';
import Profile from '@/views/Profile/index';
import ShowData from '@/views/showData';
import WishList from '@/views/wishList';
import UserIndex from '@/views/UserIndex';
import UserPage from '@/views/User';
import NotFound from '@/views/NotFound';

export default [
  { path: '/',
    name: 'Home',
    component: DebugView
  },
  {
    path: '/demo/AllUI',
    name: 'UI Demo',
    component: AllUI
  },
  {
    path: '/demo/Store',
    name: 'Store Demo',
    component: StoreDemo
  },
  {
    path: '/demo/LocalDBDemo',
    name: 'Local DB Demo',
    component: LocalDBDemo
  },
  {
    path: '/demo/LayoutDemo',
    name: 'Layout Demo',
    component: LayoutDemo
  },
  { path: '/home',
    name: 'Home - Real',
    component: Home
  },
  { path: '/Debug',
    name: 'Debug',
    component: DebugView
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/showData',
    name: 'showData',
    component: ShowData
  },
  {
    path: '/wishList',
    name: 'wish List',
    component: WishList
  },
  {
    path: '/user',
    name: 'User Index',
    component: UserIndex
  },
  {
    path: '/user/:id',
    name: 'User Page',
    component: UserPage
  },
  {
    path: '*',
    name: 'Not found',
    component: NotFound
  }
];
