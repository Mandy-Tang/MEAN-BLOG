'use strict';
(function () {
  function blogConfig($stateProvider) {
    $stateProvider
      .state('app.blog', {
        abstract: true,
        data: {
          title: 'MEAN-BLOG'
        }
      })
      .state('app.blog.javascript', {
        url: '/blog/javascript',
        data: {
          title: 'Javascript'
        },
        views: {
          "content@app": {
            templateUrl: '/app/blog/index.html',
            controller: 'javascriptCtrl'
          }
        }
      })
      .state('app.blog.angularjs', {
        url: '/blog/angularjs',
        data: {
          title: 'AngularJS'
        },
        views: {
          "content@app": {
            templateUrl: '/app/blog/index.html',
            controller: 'angularjsCtrl'
          }
        }
      })
      .state('app.blog.nodejs', {
        url: '/blog/nodejs',
        data: {
          title: 'NodeJS'
        },
        views: {
          "content@app": {
            templateUrl: '/app/blog/index.html',
            controller: 'nodejsCtrl'
          }
        }
      })
      .state('app.blog.css', {
        url: '/blog/css',
        data: {
          title: 'CSS'
        },
        views: {
          "content@app": {
            templateUrl: '/app/css/index.html',
            controller: 'cssCtrl'
          }
        }
      })
      .state('app.blog.python', {
        url: '/blog/python',
        data: {
          title: 'Python'
        },
        views: {
          "content@app": {
            templateUrl: '/app/blog/index.html',
            controller: 'pythontCtrl'
          }
        }
      });
  }
  angular.module('app.blog', ['ui.router'])
    .config(blogConfig);
})();
