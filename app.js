angular
.module('itineraryTracker', [
  'firebase',
  'ui.router'

  // 'ngResource'
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
  // "$stateParams",
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

function TripIndexControllerFunction($scope, TripFactory){
$scope.trips = TripFactory;
$scope.trips.$add({
  content: $scope.trip
})
}

  // syncObject.$bindTo($scope, "trips");

// var Trip = $resource('/api/trips')
// app.controller('IndexCtrl', [
//   '$scope',
//   '$resource',
//   function($scope, $resource){
//     $scope.trips = [
//       {location: "Japan", timeSpan: "November 2015", photo_url: "https://scontent-ord1-1.xx.fbcdn.net/v/t1.0-9/12310536_10104182767836578_3131895657167659836_n.jpg?oh=e37d66583f21f895d38a769a3ff51c38&oe=596A6E48"},
//       {location: "Turkey", timeSpan: "June 2010", photo_url:"https://scontent-ord1-1.xx.fbcdn.net/v/t1.0-9/1915988_928045597078_3862487_n.jpg?oh=42b4a2617160ad6e161c870b0da0c15a&oe=5950DB99"}
//     ]
//     $scope.createTrip = function(){
//       var Trip = new Trip();
//       trip.name = $scope.tripLocation;
//       trip.$save();
//     }
//   }]);
