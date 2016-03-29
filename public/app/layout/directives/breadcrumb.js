/**
 * Created by mandy on 16-3-29.
 */
(function () {
  function breadcrumb ($rootScope) {
    return {
      restrict: 'AE',
      template:
      '<div class="breadcrumb-wrapper">' +
      '<img src="/styles/image/map-icon.png">' +
      '<span>&nbsp;当前位置:&nbsp;&nbsp;</span>' +
      '<span id="breadcrumb" class="breadcrumb">' +
      '<li ><a>level-1</a></li>' +
      '<li class="active"><a class="text-primary">level-2</a></li>' +
      '</span>' +
      '</div>',
      link: function ($scope, $elem, $attr) {

        var changeBreadcrumb = function () {
          console.log($rootScope.$state.current);
          if ($rootScope.$state.current.name == 'app.dashboard') {
            $($elem).addClass('hide');
            return;
          }
          else {
            var current = $rootScope.$state.current;
            $($elem).removeClass('hide');
            switch ($rootScope.$state.$current.parent.self.name) {
              case 'app':
                $('#breadcrumb li:last-child').hide();
                $('#breadcrumb li:first-child a').attr('href', '#' + current.url).addClass('text-primary').text(current.data.title);
                break;
              case 'app.log':
              case 'app.strategy':
              case 'app.config':
                $('#breadcrumb li:first-child a').attr('href', '').removeClass('text-primary').text($rootScope.$state.$current.parent.data.title);
                $('#breadcrumb li:last-child a').attr('href', '#' + current.url).text(current.data.title);
                $('#breadcrumb li:last-child').show();
                break;
              default :
                $('#breadcrumb li:last-child').hide();
                $('#breadcrumb li:first-child a').attr('href', '#' + current.url).text(current.data.title);
                break;
            }
          }
        };
        changeBreadcrumb();

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
          changeBreadcrumb();
        });
      }
    }
  }
})();
