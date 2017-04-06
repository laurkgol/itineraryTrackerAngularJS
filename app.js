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
.factory("ActivityFactory", [
  "$firebaseObject",
  ActivityFactoryFunction
])
.controller("TripIndexController", [
  "$scope",
"TripFactory",
"ActivityFactory",
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

  function ActivityFactoryFunction($firebaseObject){
    var ref = firebase.database().ref().child("activity");
    return $firebaseObject(ref);
    }

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
  // .state("TripShow", {
  //   url: "/trips/:id",
  //   templateUrl: "js/ng-views/trips/show.html",
  //   controller: "TripShowController",
  //   controllerAs: "vm"
  // })

}

function TripIndexControllerFunction($scope, TripFactory, ActivityFactory,
  $firebaseArray, $firebaseObject){
    //defines trips
  $scope.trips = TripFactory;
  //adds trips
  $scope.addTrip = function(){
    //adds autocomplete value to $scope.location
    var userInput = $("#pac-input").val();
    $scope.location = userInput
    //determines lat and long from location input
    $scope.getLatLong = function(){
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({
        'address': $scope.location
      }, function(results, status) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            console.log(latitude);
            console.log(longitude);
          })
 }

      $scope.getLatLong()
    $scope.trips.$add({

      //adds input from form to db
      location: $scope.location,

      time_span: $scope.time_span,
      photo_url: $scope.photo_url,
      timestamp: firebase.database.ServerValue.TIMESTAMP
    });
    $scope.location ="",
    $scope.time_span = "",
    $scope.photo_url = ""

}
//adds google map to page from API
  var map;
    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 0, lng: 0},
        zoom: 1

      });
      var input = document.getElementById('pac-input');
      var autocomplete = new google.maps.places.Autocomplete(input, {
      types: ['(cities)']
  });
      google.maps.event.addListener(autocomplete, 'place_changed', function() {
      var place = autocomplete.getPlace();

      var userInput = $("#pac-input").val();
      $scope.location = userInput
      console.log(userInput)
      IsplaceChange = true;
      });
      var Tokyomarker = new google.maps.Marker({
          position: {lat: 35.6894875, lng: 139.69170639999993},
          map: map,
          // icon: "./footprint.png",
          title: 'Tokyo, Japan'
        });
      var Istanbulmarker = new google.maps.Marker({
            position: {lat: 33.740962, lng: -84.35731699999997},
            map: map,
            // icon: "./footprint.png",
            title: 'Istanbul, Turkey'
          });
          var DRmarker = new google.maps.Marker({
                position: {lat: 18.5820101, lng: 18.5820101},
                map: map,
                // icon: "./footprint.png",
                title: 'Punta Cana, Domincan Republic'
              });

  }
  initMap();

  // addMarker = function(){
  //   var place = autocomplete.getPlace();
  //   console.log(place)
  // }
}
// function ActivityIndexControllerFunction($scope, ActivityFactory){
//   ActivityFactory("Robot Restaurant").$bindTo($scope, "trip")
// }

function TripShowControllerFunction($scope, TripFactory, $stateParams){
  console.log($scope)
  $scope.trip = TripFactory.$stateParams
}
