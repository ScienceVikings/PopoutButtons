angular.module('starter.controllers', ['svl.popout'])

.controller('MainCtrl', function($scope, $ionicPopover,svlPopoutDelegate) {

  $scope.toggled = false;
  $scope.radOffset = -Math.PI/4;
  $scope.radStep = Math.PI/8;

  $scope.showPopout = function($event){
    if ($scope.toggled){
        svlPopoutDelegate.hide();
    } else {
      svlPopoutDelegate.show($event);
    }

    $scope.toggled = !$scope.toggled;
  }

  $scope.test1 = function(){
    alert('1');
  }

  $scope.test2 = function(){
    alert('2');
  }

  $scope.test3 = function(){
    alert('3');
  }

});;
