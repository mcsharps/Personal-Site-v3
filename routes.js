import AppComponent from './components/app';
import IndexComponent from './components/index';
import AboutComponent from './components/about';
import TwitterComponent from './components/twitter';
import StravaComponent from './components/strava';
const routes = {
  path: '',
  component: AppComponent,
  childRoutes: [
    {
      path: '/',
      component: IndexComponent
    },
    {
      path: '/about',
      component: AboutComponent
    },
    {
      path: '/twitter',
      component: TwitterComponent
    },
    {
      path: '/strava',
      component: StravaComponent
    }
  ]
}

export { routes };