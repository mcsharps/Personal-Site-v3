import AppComponent from './components/app';
import HomeComponent from './components/home';
import AboutComponent from './components/resume';
import TwitterComponent from './components/twitter';
import StravaComponent from './components/biking';
const routes = {
  path: '',
  component: AppComponent,
  childRoutes: [
    {
      path: '/',
      component: HomeComponent
    },
    {
      path: '/resume',
      component: AboutComponent
    },
    {
      path: '/twitter',
      component: TwitterComponent
    },
    {
      path: '/biking',
      component: StravaComponent
    }
  ]
}

export { routes };