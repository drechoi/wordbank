import Home from '@/views/HomeView';
// Demos
import AllUI from '@/views/demo/AllUI';
import StoreDemo from '@/views/demo/StoreDemo';
import LocalDBDemo from '@/views/demo/DbStoreDemo';
import LayoutDemo from '@/views/demo/LayoutDemo';

import Profile from '@/views/Profile';
import WordList from '@/views/Profile/WordList';

import DebugView from '@/views/DebugView';

import ShowData from '@/views/showData';
import UserIndex from '@/views/UserIndex';
import UserPage from '@/views/User';
import NotFound from '@/views/NotFound';

export default [
  { path: '/',
    name: 'Home',
    component: DebugView
  },
  {
    path: '/home',
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
    path: '/wordlist',
    name: 'Word List',
    component: WordList
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
  {
    path: '/showData',
    name: 'showData',
    component: ShowData
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
