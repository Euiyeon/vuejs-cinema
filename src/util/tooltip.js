
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

export default {
  install(Vue) {
    Vue.directive('tooltip', {
      bind(el, bindings) {
        // console.log(el);
        // let span = document.createElement('SPAN');
        // let text = document.createTextNode('Seats available: 200');
        
        let span = $('<span/>', {
          class: 'tooltip',
          text: `Seats available: ${bindings.value.seats}`,
        }).appendTo(el);
        // console.log(span);
        
        $(el).on('mouseover touchstart mouseleave touchend', mouseEvtHandler);
        
        // addClass(span, 'tooltip');
        // span.appendChild(text);
        // el.appendChild(span);
        // $(el).append(span);
      },
      unbind(el) {
        $(el).off('mouseover touchstart mouseleave touchend');
      }
    });
  },
}


