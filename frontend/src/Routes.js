import Login from './components/Login'
import Signup from './components/Signup'
import AllArticles from './components/AllArticles'
import OneArticle from './components/OneArticle'
import SignupSuccess from './components/SignupSuccess'

export default [
  {
    path: '/',
    name: 'login',
    component: Login
  },

  {
    path: '/auth',
    name: 'login',
    component: Login,
  },

  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/signup/success',
    name: 'signupSuccess',
    component: SignupSuccess,
  },
  {
    path: '/articles',
    name: 'allArticles',
    component: AllArticles,
    meta: { requiresAuth: true }
  },
  {
    path: '/articles/:id',
    name: 'oneArticle',
    component: OneArticle,
    meta: { requiresAuth: true }
  }
]