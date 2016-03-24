"use strict";
(function () {
  function layoutConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        abstract: true,
        data: {
          title: 'MEAN-BLOG'
        },
        views: {
          root: {
            templateUrl: '/app/layout/index.html'
          }
        }
      })
    $urlRouterProvider.otherwise('/dashboard');
  }

  angular.module('app.layout', ['ui.router'])
    .config(layoutConfig);
})();
