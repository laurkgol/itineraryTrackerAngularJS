angular
.module('itineraryTracker', [
  'firebase',
  'ui.router'
])
.config([
  "$stateProvider",
  RouterFunction
])
.factory("TripFactory", [
  "$firebaseArray",
  TripFactoryFunction
])
.controller("TripIndexController", [
  "$scope",
"TripFactory",
  TripIndexControllerFunction
])

function TripFactoryFunction($firebaseArray){
  var ref = firebase.database().ref();
  return $firebaseArray(ref);
  }


function RouterFunction($stateProvider){
  $stateProvider
  .state("TripIndex", {
    url: "/trips",
    templateUrl: "js/ng-views/trips/index.html",
    controller: "TripIndexController",
    controllerAs: "vm"
  })
}

function TripIndexControllerFunction($scope, TripFactory, $firebaseArray){
  $scope.trips = TripFactory;
  $scope.addTrip = function(){
    $scope.trips.$add({
      location: $scope.location,
      time_span: $scope.time_span,
      photo_url: $scope.photo_url,
      timestamp: firebase.database.ServerValue.TIMESTAMP
    });
    $scope.location ="",
    $scope.time_span = "",
    $scope.photo_url = ""
  }
}
