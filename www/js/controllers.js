angular.module('starter.controllers', ['svl.popout'])

.controller('MainCtrl', function($scope, $ionicPopover,svlPopoutDelegate) {

  $scope.toggled = false;

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
