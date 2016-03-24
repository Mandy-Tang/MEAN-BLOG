'use strict';
(function () {
  function blogConfig($stateProvider) {
    $stateProvider
      .state('app.dashboard', {
        url: '/dashboard',
        data: {
          title: 'Index Page'
        },
        views: {
          "content@app": {
            templateUrl: '/app/dashboard/index.html',
            controller: 'dashboardCtrl'
          }
        }
      })
  }
  angular.module('app.dashboard', ['ui.router'])
    .config(blogConfig);
})();
