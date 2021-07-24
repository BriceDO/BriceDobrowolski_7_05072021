import Login from './components/Login'
import Signup from './components/Signup'
import AllArticles from './components/AllArticles'

export default [
  {
    path: '/',
    name: 'login',
    component: Login
  },

  {
    path: '/auth',
    name: 'login',
    component: Login
  },

  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/articles',
    name: 'allArticles',
    component: AllArticles
  },
  /*
  Faire une vue 404 - page non trouvé 
  {
    path: '/*',
    name: 'allArticles',
    component: AllArticles
  }
  */
]