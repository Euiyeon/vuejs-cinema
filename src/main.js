// let msg = 'hello';
// let obj = { msg };
// console.log(obj);

import './style.scss';
import 'expose-loader?$!expose-loader?jQuery!jquery';
import Vue from 'vue';

// import genres from './util/genres';

import VueResource from 'vue-resource';
Vue.use(VueResource);

import moment from 'moment-timezone';
moment.tz.setDefault('UTC');
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } });

const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', { get() { return this.$root.bus } });

import { checkFilter, setDay } from './util/bus';
// import Overview from './components/Overview.vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import routes from './util/routes';
const router = new VueRouter({ routes });

import tooltip from './util/tooltip';
Vue.use(tooltip);

new Vue({
  el: '#app',
  data: {
    genre: [],
    time: [],
    movies: [],
    moment,
    day: moment(),
    bus,
  },
  created() {
    // console.log(this.$http)
    this.$http.get('/api').then(res => {
      // console.log(res.data);
      this.movies = res.data;
    });
    this.$bus.$on('check-filter', checkFilter.bind(this));
    this.$bus.$on('set-day', setDay.bind(this));
  },
  router,
});

// import { addClass, removeClass } from './util/helpers';
// let mouseOverHandler = function(evt) {
//   let span = evt.target.parentNode.getElementsByTagName('SPAN')[0];
//   console.log(span);
// };
let mouseEvtHandler = function(evt) {
  let t = $(evt.target).find('span.tooltip');
  // console.log(evt.type);
  switch(evt.type) {
    case 'mouseover': 
    case 'touchstart': 
      t.addClass('tooltip-show');
      break;
    case 'mouseleave':
    case 'touchend':
      t.removeClass('tooltip-show');
      break;
  }
};
