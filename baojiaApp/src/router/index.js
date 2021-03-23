import Vue from 'vue'
import VueRouter from 'vue-router'
import OngoingProjects from '@/components/OngoingProjects'
// eslint-disable-next-line no-unused-vars
import index from '@/components/index'
import Nav from '@/components/Nav'
import ProjectDetails from '@/components/ProjectDetails'
import Receivables from '@/components/Receivables'
import expenditure from '@/components/expenditure'
import SupplierList from '@/components/SupplierList'
import Customerlist from '@/components/Customerlist'
import Receivableslist from '@/components/Receivableslist'
import expenditurelist from '@/components/expenditurelist'
import RevenueContract from '@/components/RevenueContract'
import productslist from '@/components/productslist'
import SupplierData from '@/components/SupplierData'
import profitlist from '@/components/profitlist'
import stafflist from '@/components/stafflist'
import productstemplate from '@/components/productstemplate'
import SupplierDatalist from '@/components/SupplierDatalist'
import login from '@/components/login'
import searchpage from '@/components/searchpage'
import searchht from '@/components/searchht'
import upimg from '@/components/upimg'
import axios from 'axios'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/ProjectDetails/:id',
      name: 'ProjectDetails',
      components: {
        Nav: Nav,
        content: ProjectDetails
      }
    },
    {
      path: '/expenditure/:id',
      name: 'expenditure',
      components: {
        Nav: Nav,
        content: expenditure
      }
    },
    {
      path: '/RevenueContract/:id',
      name: 'RevenueContract',
      components: {
        Nav: Nav,
        content: RevenueContract
      }
    },
    {
      path: '/SupplierDatalist/:id',
      name: 'SupplierDatalist',
      components: {
        Nav: Nav,
        content: SupplierDatalist
      }
    },
    {
      path: '/searchpage',
      name: 'searchpage',
      components: {
        Nav: Nav,
        content: searchpage
      }
    },
    {
      path: '/searchht',
      name: 'searchht',
      components: {
        Nav: Nav,
        content: searchht
      }
    },
    {
      path: '/stafflist',
      name: 'stafflist',
      components: {
        Nav: Nav,
        content: stafflist
      }
    },
    {
      path: '/productstemplate',
      name: 'productstemplate',
      components: {
        Nav: Nav,
        content: productstemplate
      }
    },
    {
      path: '/upimg',
      name: 'upimg',
      components: {
        Nav: Nav,
        content: upimg
      }
    },
    {
      path: '/login',
      name: 'login',
      components: {
        content: login
      }
    },
    {
      path: '/expenditurelist',
      name: 'expenditurelist',
      components: {
        Nav: Nav,
        content: expenditurelist
      }
    },
    {
      path: '/profitlist',
      name: 'profitlist',
      components: {
        Nav: Nav,
        content: profitlist
      }
    },
    {
      path: '/SupplierData',
      name: 'SupplierData',
      components: {
        Nav: Nav,
        content: SupplierData
      }
    },
    {
      path: '/productslist',
      name: 'productslist',
      components: {
        Nav: Nav,
        content: productslist
      }
    },
    {
      path: '/index',
      name: 'index',
      components: {
        Nav: Nav,
        content: OngoingProjects
      }
    },
    {
      path: '/Receivables/:id',
      name: 'Receivables',
      components: {
        Nav: Nav,
        content: Receivables
      }
    },
    {
      path: '/Receivableslist/',
      name: 'Receivableslist',
      components: {
        Nav: Nav,
        content: Receivableslist
      }
    },
    {
      path: '/SupplierList/',
      name: 'SupplierList',
      components: {
        Nav: Nav,
        content: SupplierList
      }
    },
    {
      path: '/Customerlist/',
      name: 'Customerlist',
      components: {
        Nav: Nav,
        content: Customerlist
      }
    }
  ]
})

// 挂载一个路由导航守卫
router.beforeEach((to, from, next) => {
  // console.log(sessionStorage.getItem('Token'))
  var geturlFn
  if (window.location.href.match('localhost')) {
    geturlFn = 'http://localhost:3003'
  } else {
    geturlFn = ''
  }
  if (to.path === '/login') {
    next()
  } else {
    axios({
      url: geturlFn + '/getDatalogin/' + sessionStorage.getItem('Token'),
      method: 'GET',
      dataType: 'JSON',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(response => { // token通过
      console.log(response.data)
      if (response.data === 'OK') {
        next()
      } else {
        next('/login')
      }
    })
      .catch(error => {
        console.log(error)
      })
  }
})
export default router
