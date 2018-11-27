$(document).ready( function(){
  $('.starfield').starfield();
});
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});
/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
// particlesJS.load('particles-js', 'particles.js/particles.json', function() {
//   console.log('callback - particles.js config loaded');
// });
