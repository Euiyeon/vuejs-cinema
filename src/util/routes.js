import Overview from '../components/Overview.vue';
import Detail from '../components/Detail.vue';

export default [
  { path: '*', redirect: { name: 'home' } },
  { path: '/', component: Overview, name: 'home' },
  { path: '/movie/:id', component: Detail, name: 'movie' },
];
