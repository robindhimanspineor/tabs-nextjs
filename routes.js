const routes = require('next-routes');

module.exports = routes()
  .add({
    name: 'engine',
    pattern: '/:vehicle/:submodel/:engine',
    page: 'engine/index',
  })
  .add({
    name: 'hardware',
    pattern: '/brake/hardware/:slug/:slug2/:slug3',
    page: 'hardware/index',
  });