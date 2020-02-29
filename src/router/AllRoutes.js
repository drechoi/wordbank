import Home from '@/views/HomeView';
import HomeDebug from '@/views/HomeView/homeDebug';

// Demos
import AllUI from '@/views/demo/AllUI';
import StoreDemo from '@/views/demo/StoreDemo';
import LocalDBDemo from '@/views/demo/DbStoreDemo';
import LayoutDemo from '@/views/demo/LayoutDemo';

import Profile from '@/views/Profile';
import SchemeIndex from '@/views/Scheme';
import SchemeView from '@/views/Scheme/schemeView';
import SchemeList from '@/views/Scheme/listView';

import BookView from '@/views/Book/BookView';
import BookList from '@/views/Book/BookList';
import BookSettings from '@/views/Book/Setting';

import userSettings from '@/views/Profile/Settings';
import WordList from '@/views/Profile/WordList';

import DebugView from '@/views/DebugView';
import Login from '@/views/Login';

import ShowData from '@/views/showData';
import UserIndex from '@/views/UserIndex';
import UserPage from '@/views/User';
import NotFound from '@/views/NotFound';

export default [
  { path: '/',
    name: 'Root',
    component: DebugView,
    meta: {
      skipAuth: true
    }
  },
  {
    path: '/home',
    name: 'Home - Real',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  { path: '/HomeDebug',
    name: 'HomeDebug',
    component: HomeDebug
  },
  {
    path: '/Scheme/all/',
    name: 'SchemeList',
    component: SchemeList,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Scheme/:id',
    name: 'SchemeView',
    component: SchemeView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Scheme',
    name: 'SchemeIndex',
    component: SchemeIndex,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Book/:id',
    name: 'BookView',
    component: BookView,
  },
  {
    path: '/BookList',
    name: 'BookList',
    component: BookList,
  },
  {
    path: '/Book/:id/settings',
    name: 'BookSettings',
    component: BookSettings,
    meta: {
      // is not that working ... solve it later
      breadcrumb: [
        { text: 'Scheme', href: '/Scheme' },
        { text: 'Book', href: '/Book' },
        { text: 'Settings', active: true }
      ]
    }
  },
  { path: '/DebugAuth',
    name: 'DebugAuth',
    component: DebugView
  },
  { path: '/Login',
    name: 'Login',
    component: Login,
    meta: {
      skipAuth: true
    }
  },
  {
    path: '/Profile/Settings',
    name: 'UserSettings',
    component: userSettings,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: {
      requiresAuth: true
    }
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
    component: NotFound,
    meta: {
      skipAuth: true
    }
  }
];
