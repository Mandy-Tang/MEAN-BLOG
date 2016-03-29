'use strict';
/*
 * app config
 * including http interceptor and http default config
 */
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

/*
 * app run function
 */
function appRun($rootScope, $state, $stateParams, $http, $cookies) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
  $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
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
  .constant('API_CONFIG', window.apiConfig)
  .run(appRun);

/*
 * bootstrap the angularjs app
 */
function bootstrapApp () {
  angular.bootstrap(document, ['app']);
}

/*
 * fix the height of sibebar
 */
function fixHeightofSidebar () {
  function fix_height() {
    var heightWithoutNavbar = $("body > #wrapper").height() - 61;
    $(".sidebard-panel").css("min-height", heightWithoutNavbar + "px");

    var navbarHeigh = $('nav.navbar-default').height();
    var wrapperHeigh = $('#page-wrapper').height();

    if(navbarHeigh > wrapperHeigh){
      $('#page-wrapper').css("min-height", navbarHeigh + "px");
    }

    if(navbarHeigh < wrapperHeigh){
      $('#page-wrapper').css("min-height", $(window).height()  + "px");
    }

    if ($('body').hasClass('fixed-nav')) {
      $('#page-wrapper').css("min-height", $(window).height() - 60 + "px");
    }

  }


  $(window).bind("load resize scroll", function() {
    if(!$("body").hasClass('body-small')) {
      fix_height();
    }
  });

  // Move right sidebar top after scroll
  $(window).scroll(function(){
    if ($(window).scrollTop() > 0 && !$('body').hasClass('fixed-nav') ) {
      $('#right-sidebar').addClass('sidebar-top');
    } else {
      $('#right-sidebar').removeClass('sidebar-top');
    }
  });


  setTimeout(function(){
    fix_height();
  })
}

function  fixMenu () {
  $(window).bind("load resize", function() {
    if ($(this).width() < 769) {
      $('body').addClass('body-small')
    } else {
      $('body').removeClass('body-small')
    }
  })
}

$(function() {
  bootstrapApp();
  fixHeightofSidebar();
  fixMenu();
});
