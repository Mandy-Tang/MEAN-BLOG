'use strict';


function appConfig($provide, $httpProvider, $stateProvider, $urlRouterProvider) {
  'ngInject';
  // Intercept http calls.
  $provide.factory('ErrorHttpInterceptor', ['$q', function ($q) {
    function notifyError(rejection){
      console.log(rejection);
    }

    return {
      // On request failure
      requestError: function (rejection) {
        // show notification
        notifyError(rejection);

        // Return the promise rejection.
        return $q.reject(rejection);
      },

      // On response failure
      responseError: function (rejection) {
        // show notification
        notifyError(rejection);
        // Return the promise rejection.
        return $q.reject(rejection);
      }
    };
  }]);

  // Add the interceptor to the $httpProvider.
  $httpProvider.interceptors.push('ErrorHttpInterceptor');

  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';

  //$stateProvider
  //  .state('app', {
  //    abstract: true,
  //    data: {
  //      title: 'MEAN-BLOG'
  //    },
  //    views: {
  //      root: {
  //        templateUrl: '/app/layout/index.html'
  //      }
  //    }
  //  })
  //  .state('app.dashboard', {
  //    url: '/dashboard',
  //    data: {
  //      title: 'Index Page'
  //    },
  //    views: {
  //      "content@app": {
  //        templateUrl: '/app/dashboard/index.html',
  //        controller: 'dashboardCtrl'
  //      }
  //    }
  //  })
  //  .state('app.blog.javascript', {
  //    url: '/blog/javascript',
  //    data: {
  //      title: 'Javascript'
  //    },
  //    views: {
  //      "content@app": {
  //        templateUrl: '/app/blog/index.html',
  //        controller: 'javascriptCtrl'
  //      }
  //    }
  //  })
  //  .state('app.blog.angularjs', {
  //    url: '/blog/angularjs',
  //    data: {
  //      title: 'AngularJS'
  //    },
  //    views: {
  //      "content@app": {
  //        templateUrl: '/app/blog/index.html',
  //        controller: 'angularjsCtrl'
  //      }
  //    }
  //  })
  //  .state('app.blog.nodejs', {
  //    url: '/blog/nodejs',
  //    data: {
  //      title: 'NodeJS'
  //    },
  //    views: {
  //      "content@app": {
  //        templateUrl: '/app/blog/index.html',
  //        controller: 'nodejsCtrl'
  //      }
  //    }
  //  })
  //  .state('app.blog.css', {
  //    url: '/blog/css',
  //    data: {
  //      title: 'CSS'
  //    },
  //    views: {
  //      "content@app": {
  //        templateUrl: '/app/css/index.html',
  //        controller: 'cssCtrl'
  //      }
  //    }
  //  })
  //  .state('app.blog.python', {
  //    url: '/blog/python',
  //    data: {
  //      title: 'Python'
  //    },
  //    views: {
  //      "content@app": {
  //        templateUrl: '/app/blog/index.html',
  //        controller: 'pythontCtrl'
  //      }
  //    }
  //  })


  //$urlRouterProvider.otherwise('/dashboard');
}

function appRun($rootScope, $state, $stateParams, $http, $cookies) {
  console.log('test')
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
  $state = 'app';
}

var app = angular.module('app', [
    'ngCookies',
    'ui.router',
    'ui.bootstrap',

    'app.layout',
    'app.dashboard',
    'app.blog'
  ])
  .config(appConfig)
  .constant('APP_CONFIG', window.appConfig)
  .run(appRun);

var bootstrapApp = function () {
  $(function () {
    angular.bootstrap(document, ['app']);
  });
}();





