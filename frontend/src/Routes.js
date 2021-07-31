import Login from './components/Login'
import Signup from './components/Signup'
import AllArticles from './components/AllArticles'
import NotFound from './components/NotFound'
import OneArticle from './components/OneArticle'

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
  },
  {
    path: '/404',
    name: 'notFound',
    component: NotFound
  }

]