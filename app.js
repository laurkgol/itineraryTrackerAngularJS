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
// .factory("ActivityFactory", [
//   "$firebaseObject",
//   ActivityFactoryFunction
// ])
.controller("TripIndexController", [
  "$scope",
"TripFactory",
  TripIndexControllerFunction
])
// .controller("ActivityIndexController", [
//   "$scope",
//   "$firebaseArray",
//   "ActivityFactory",
//   ActivityIndexControllerFunction
// ])
.controller("TripShowController", [
  "$scope",
  "TripFactory",
  "ActivityFactory",
  "$stateParams",
  TripShowControllerFunction
])
function TripFactoryFunction($firebaseArray){
  var ref = firebase.database().ref();
  return $firebaseArray(ref);

  }

  // function ActivityFactoryFunction($firebaseObject){
  //   var ref = firebase.database().ref().child("activity");
  //   return $firebaseArray(ref);
  //   }

// function ActivityFactoryFunction($firebaseObject){
//   return function(title){
//     var ref = firebase.database().ref("activity").push();
//     var activityTitleRef = ref.child(title)
//     return $firebaseObject(activityTitleRef)
//   }
// }

function RouterFunction($stateProvider){
  $stateProvider
  .state("TripIndex", {
    url: "/trips",
    templateUrl: "js/ng-views/trips/index.html",
    controller: "TripIndexController",
    controllerAs: "vm"
  })
  .state("TripShow", {
    url: "/trips/:id",
    templateUrl: "js/ng-views/trips/show.html",
    controller: "TripShowController",
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

  // $scope.addActivity = function(){
  //     ref = new Firebase("https://console.firebase.google.com/project/itinerarytracker/database/data/0/activity")
  //
  //     console.log(ref)
  //     $scope.trips[0].$add({
  //     date: $scope.date,
  //     description: $scope.description,
  //     photo_url: $scope.photo_url,
  //     title: $scope.title
  //   });
  //   $scope.date ="",
  //   $scope.description = "",
  //   $scope.photo_url = "",
  //   $scope.title = ""
  // }
}

// function ActivityIndexControllerFunction($scope, ActivityFactory){
//   ActivityFactory("Robot Restaurant").$bindTo($scope, "trip")
// }

function TripShowControllerFunction($scope, TripFactory, $stateParams){
  console.log($scope)
  $scope.trip = TripFactory.$stateParams
}
