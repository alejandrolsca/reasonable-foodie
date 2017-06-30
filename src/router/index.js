import Vue from 'vue'
import Router from 'vue-router'
import places from '@/components/places'
import placesDetail from '@/components/places.detail'
import error from '@/components/error'
import e404 from '@/components/e404'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/places'
    },
    {
      path: '/places',
      name: 'places',
      component: places
    },
    {
      path: '/places/:place_id',
      name: 'placesDetail',
      component: placesDetail
    },
    { path: '/error',
      name: 'error',
      component: error,
      props: (route) => ({
        query: route.query.error
      })
    },
    { path: '*',
      name: 'e404',
      component: e404
    }
  ]
})
