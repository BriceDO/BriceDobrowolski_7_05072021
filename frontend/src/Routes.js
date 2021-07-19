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
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/articles',
    name: 'allArticles',
    component: AllArticles
  }
]