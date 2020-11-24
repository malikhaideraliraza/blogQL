// pages
import Home from './pages/Home';
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp';

// posts
import CreatePost from './pages/CreatePost';
import PostDetails from './pages/PostDetails';

// layouts
import AppLayout from './layouts/app';

export default [
  {
    path: '/',
    component: Home,
    layout: AppLayout,
    exact: true
  },
  {
    path: '/signin',
    component: SignIn,
    layout: AppLayout,
    exact: true
  },
  {
    path: '/signup',
    component: SignUp,
    layout: AppLayout,
    exact: true
  },
  {
    path: '/create-post',
    component: CreatePost,
    layout: AppLayout,
    exact: true
  },
  {
    path: '/post-details',
    component: PostDetails,
    layout: AppLayout,
    exact: true
  },
];
