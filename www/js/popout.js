angular.module('svl.popout',[])
.directive('svlPopoutButtons', function(svlPopoutDelegate, $timeout){

  var buttons = [];

  return {
    restrict: 'E',
    transclude: true,
    scope: {
      centerOffset: '=',
      radOffset: '=',
      radStep: '='
    },
    controller: function($scope){
      this.addButton = function(button){
        buttons.push(button);
      }
    },
    link: function(scope, element, attrs){

      element.css('position','absolute');

      function translate(el,x,y,duration){
        transforms = [
          'transform','-webkit-transform','-moz-transform'
        ];
        durations = [
          'transition-duration','-webkit-transition-duration','-moz-transition-duration'
        ];

        angular.forEach(transforms, function(t){
          el.css(t, 'translate3d(' + x.toString() +'px,' + y.toString() + 'px, 0px)');
        });

        angular.forEach(durations, function(d){
          el.css(d, (duration ? duration.toString() : '0') + 's');
        });

      }

      svlPopoutDelegate.show = function($event){

        element.removeClass('hidden');

        var offsetObjects = document.getElementsByClassName('has-header');
        var totalOffsetHeight = 0;
        var totalOffsetWidth = element[0].scrollWidth/2;

        angular.forEach(offsetObjects, function(el){
          totalOffsetHeight += el.offsetTop + element[0].scrollHeight/2;
        });

        var coords = ionic.tap.pointerCoord($event);
        coords.y -= totalOffsetHeight;
        coords.x -= totalOffsetWidth;

        translate(element, coords.x,coords.y);

        //Make the buttonOffsetDistance and
        var buttonOffsetDistance = scope.centerOffset || 50;
        var radOffset = scope.radOffset || 0;

        angular.forEach(buttons, function(btn){

          translate(btn.element,0,0,0);

          var btnHeight = btn.element[0].scrollHeight/2;
          var btnWidth = btn.element[0].scrollWidth/2;

          $timeout(function(){

            var x = Math.round(Math.sin(radOffset)*(buttonOffsetDistance)-btnWidth);
            var y = Math.round(Math.cos(radOffset)*(-buttonOffsetDistance));

            translate(btn.element, x, y, 0.25);
            radOffset += scope.radStep || Math.PI/4;

          },0);

        });

      }

      svlPopoutDelegate.hide = function(){
        element.addClass('hidden');
        translate(element, -1000,-1000);
        angular.forEach(buttons, function(btn){
          translate(btn.element, -1000, -1000);
        });
      }

      svlPopoutDelegate.hide();
    },
    template: "<div class='circleButton' ng-transclude></div>"
  }
})
.directive('svlPopoutButton', function(){
  return {
    require: '^svlPopoutButtons',
    restrict: 'E',
    transclude: true,
    scope: {},
    link: function(scope, element, attrs, buttonCtrl){

      element.css('position','absolute');

      var btn = {scope: scope, element: element};
      buttonCtrl.addButton(btn);

    },
    template: "<div class='circleButton' ng-transclude></div>"
  }
})
.factory('svlPopoutDelegate', function(){
  var del = {};
  var fakeFunctions = ['show','hide'];
  angular.forEach(fakeFunctions, function(fn){
    del[fn] = function(){return true;}
  });
  return del;
});
