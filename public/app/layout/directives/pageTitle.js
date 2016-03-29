/**
 * Created by mandy on 16-3-29.
 */
(function () {
  function pageTitle($rootScope, $timeout) {
    'ngInject';
    return {
      link: function(scope, element) {
        var listener = function(event, toState, toParams, fromState, fromParams) {
          // Default title - load on Dashboard 1
          var title = 'MEAN-BLOG';
          // Create your own title pattern
          if (toState.data && toState.data.title) title = 'MEAN-BLOG | ' + toState.data.title;
          $timeout(function() {
            element.text(title);
          });
        };
        $rootScope.$on('$stateChangeStart', listener);
      }
    }
  };

  angular.module('app.layout').directive('pageTitle', pageTitle)
})();
